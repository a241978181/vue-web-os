import Vue from 'vue'
import PopupManager from 'element-ui/lib/utils/popup/popup-manager'
import store from '@/store'

function bringDialogToFront(el) {
    const wrapper = el.classList && el.classList.contains('el-dialog__wrapper')
        ? el
        : el.closest('.el-dialog__wrapper')

    if (!wrapper) {
        return
    }

    wrapper.style.zIndex = PopupManager.nextZIndex()
}

Vue.directive('dialogDrag', {
    bind(el, binding) {
        const dialogHeaderEl = el.querySelector('.el-dialog__header')
        const dragDom = el.querySelector('.el-dialog')

        if (!dialogHeaderEl || !dragDom) {
            return
        }

        dialogHeaderEl.style.cursor = 'move'
        el.__dialogDraggable__ = binding.value

        const activateDialog = () => bringDialogToFront(el)
        el.__dialogActivate__ = activateDialog
        dragDom.addEventListener('mousedown', activateDialog)
        Vue.nextTick(() => bringDialogToFront(el))

        const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null)

        dialogHeaderEl.onmousedown = (e) => {
            if (el.__dialogDraggable__ === false) {
                return
            }

            bringDialogToFront(el)

            const disX = e.clientX - dialogHeaderEl.offsetLeft
            const disY = e.clientY - dialogHeaderEl.offsetTop

            let styL
            let styT

            if (sty.left.includes('%')) {
                styL = +document.body.clientWidth * (+sty.left.replace(/\%/g, '') / 100)
                styT = +document.body.clientHeight * (+sty.top.replace(/\%/g, '') / 100)
            } else {
                styL = sty.left === 'auto' ? 0 : +sty.left.replace(/\px/g, '')
                styT = sty.top === 'auto' ? 0 : +sty.top.replace(/\px/g, '')
            }

            if (sty.left === 'auto') {
                const rect = dragDom.getBoundingClientRect()
                styL = rect.left
                styT = rect.top
                if (!dragDom.hasAttribute('data-orig-margin-top')) {
                    dragDom.setAttribute('data-orig-margin-top', sty.marginTop)
                }
                dragDom.style.marginLeft = '0px'
                dragDom.style.marginTop = '0px'
                dragDom.style.marginBottom = '0px'
                dragDom.style.left = `${styL}px`
                dragDom.style.top = `${styT}px`
            }

            const baseRect = dragDom.getBoundingClientRect()
            const baseCSSLeft = parseFloat(dragDom.style.left) || 0
            const baseCSSTop = parseFloat(dragDom.style.top) || 0
            const baseOffsetX = baseRect.left - baseCSSLeft
            const baseOffsetY = baseRect.top - baseCSSTop

            document.onmousemove = function (moveEvent) {
                let l = moveEvent.clientX - disX
                let t = moveEvent.clientY - disY

                let finalLeft = l + styL
                let finalTop = t + styT

                if (store.state.settings.restrictWindowBounds) {
                    const viewWidth = document.documentElement.clientWidth
                    const viewHeight = document.documentElement.clientHeight
                    const taskbarEl = document.querySelector('.task')
                    const taskbarHeight = taskbarEl ? taskbarEl.offsetHeight : 0
                    const dialogWidth = dragDom.offsetWidth
                    const dialogHeight = dragDom.offsetHeight

                    const minLeft = -baseOffsetX
                    const minTop = -baseOffsetY
                    const maxLeft = viewWidth - dialogWidth - baseOffsetX
                    const maxTop = viewHeight - dialogHeight - taskbarHeight - baseOffsetY

                    if (finalLeft < minLeft) {
                        finalLeft = minLeft
                    }
                    if (finalTop < minTop) {
                        finalTop = minTop
                    }
                    if (finalLeft > maxLeft) {
                        finalLeft = maxLeft
                    }
                    if (finalTop > maxTop) {
                        finalTop = maxTop
                    }
                }

                dragDom.style.left = `${finalLeft}px`
                dragDom.style.top = `${finalTop}px`
            }

            document.onmouseup = function () {
                document.onmousemove = null
                document.onmouseup = null
            }
        }
    },
    update(el, binding) {
        el.__dialogDraggable__ = binding.value

        const dialogHeaderEl = el.querySelector('.el-dialog__header')
        const dragDom = el.querySelector('.el-dialog')

        if (!dialogHeaderEl || !dragDom) {
            return
        }

        if (binding.value !== false) {
            dialogHeaderEl.style.cursor = 'move'
            Vue.nextTick(() => bringDialogToFront(el))
            return
        }

        dialogHeaderEl.style.cursor = 'default'
        dragDom.style.left = ''
        dragDom.style.top = ''
        dragDom.style.marginLeft = ''
        dragDom.style.marginBottom = ''
        if (dragDom.hasAttribute('data-orig-margin-top')) {
            dragDom.style.marginTop = dragDom.getAttribute('data-orig-margin-top')
        }
    },
    unbind(el) {
        const dragDom = el.querySelector('.el-dialog')
        if (dragDom && el.__dialogActivate__) {
            dragDom.removeEventListener('mousedown', el.__dialogActivate__)
        }
        delete el.__dialogActivate__
    }
})
