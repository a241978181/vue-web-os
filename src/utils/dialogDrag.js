import Vue from 'vue'
import store from '@/store'

/*
 *  使用方法
 *  将以下代码复制到一个drag.js文件中，然后在入口文件main.js中引入：import './utils/drag.js';
 *  给elementUI的dialog上加上 v-dialogDrag 指令就可以实现弹窗的全屏和拉伸了。
 *  给dialog设置 :close-on-click-modal="false" , 然后在dialog的title标题加上 v-dialogDrag 指令
 */

// v-dialogDrag: 弹窗拖拽属性
Vue.directive('dialogDrag', {
    bind(el, binding, vnode, oldVnode) {
        const dialogHeaderEl = el.querySelector('.el-dialog__header');
        const dragDom = el.querySelector('.el-dialog');
        dialogHeaderEl.style.cursor = 'move';
        
        el.__dialogDraggable__ = binding.value;

        // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
        const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null);

        dialogHeaderEl.onmousedown = (e) => {
            if (el.__dialogDraggable__ === false) {
                return;
            }
            // 鼠标按下，计算当前元素距离可视区的距离
            const disX = e.clientX - dialogHeaderEl.offsetLeft;
            const disY = e.clientY - dialogHeaderEl.offsetTop;

            // 获取到的值带px 正则匹配替换
            let styL, styT;

            if (sty.left.includes('%')) {
                styL = +document.body.clientWidth * (+sty.left.replace(/\%/g, '') / 100);
                styT = +document.body.clientHeight * (+sty.top.replace(/\%/g, '') / 100);
            } else {
                styL = sty.left === 'auto' ? 0 : +sty.left.replace(/\px/g, '');
                styT = sty.top === 'auto' ? 0 : +sty.top.replace(/\px/g, '');
            }

            // 重新设置由于默认居中引起的偏移
            if (sty.left === 'auto') {
                // 补偿最初居中时的坐标偏移
                const rect = dragDom.getBoundingClientRect();
                styL = rect.left;
                styT = rect.top;
                if (!dragDom.hasAttribute('data-orig-margin-top')) {
                    dragDom.setAttribute('data-orig-margin-top', sty.marginTop);
                }
                dragDom.style.marginLeft = '0px';
                dragDom.style.marginTop = '0px';
                dragDom.style.marginBottom = '0px';
                dragDom.style.left = `${styL}px`;
                dragDom.style.top = `${styT}px`;
            }

            // 计算 CSS 坐标系与视口坐标系之间的偏移量
            // 因为 el-dialog 使用 position:relative + margin:auto 居中，
            // CSS left=0 并不等于视口左边缘，两者之间存在偏移
            const baseRect = dragDom.getBoundingClientRect();
            const baseCSSLeft = parseFloat(dragDom.style.left) || 0;
            const baseCSSTop = parseFloat(dragDom.style.top) || 0;
            const baseOffsetX = baseRect.left - baseCSSLeft;
            const baseOffsetY = baseRect.top - baseCSSTop;

            document.onmousemove = function (e) {
                // 通过事件委托，计算移动的距离 
                let l = e.clientX - disX;
                let t = e.clientY - disY;

                // 计算最终 CSS left/top 值
                let finalLeft = l + styL;
                let finalTop = t + styT;

                // 如果开启了边界限制，将窗口限制在可视区域内
                if (store.state.settings.restrictWindowBounds) {
                    const viewWidth = document.documentElement.clientWidth;
                    const viewHeight = document.documentElement.clientHeight;
                    // 底部需要预留任务栏高度
                    const taskbarEl = document.querySelector('.task');
                    const taskbarHeight = taskbarEl ? taskbarEl.offsetHeight : 0;
                    const dialogWidth = dragDom.offsetWidth;
                    const dialogHeight = dragDom.offsetHeight;

                    // 将 CSS 坐标转换为视口坐标后进行边界判断，再转回 CSS 坐标
                    // 视口坐标 = CSS坐标 + baseOffset
                    const minLeft = -baseOffsetX;                                        // 视口 left=0
                    const minTop = -baseOffsetY;                                         // 视口 top=0
                    const maxLeft = viewWidth - dialogWidth - baseOffsetX;               // 视口 right=viewWidth
                    const maxTop = viewHeight - dialogHeight - taskbarHeight - baseOffsetY; // 任务栏顶部为下界

                    if (finalLeft < minLeft) {
                        finalLeft = minLeft;
                    }
                    if (finalTop < minTop) {
                        finalTop = minTop;
                    }
                    if (finalLeft > maxLeft) {
                        finalLeft = maxLeft;
                    }
                    if (finalTop > maxTop) {
                        finalTop = maxTop;
                    }
                }

                // 移动当前元素  
                dragDom.style.left = `${finalLeft}px`;
                dragDom.style.top = `${finalTop}px`;

                // 将此时的位置传出去
                // binding.value({x:e.pageX,y:e.pageY})
            };

            document.onmouseup = function (e) {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        }
    },
    update(el, binding) {
        el.__dialogDraggable__ = binding.value;
        const dialogHeaderEl = el.querySelector('.el-dialog__header');
        if (binding.value === false) {
            dialogHeaderEl.style.cursor = 'default';
            const dragDom = el.querySelector('.el-dialog');
            dragDom.style.left = '';
            dragDom.style.top = '';
            dragDom.style.marginLeft = '';
            dragDom.style.marginBottom = '';
            if (dragDom.hasAttribute('data-orig-margin-top')) {
                dragDom.style.marginTop = dragDom.getAttribute('data-orig-margin-top');
            }
        } else {
            dialogHeaderEl.style.cursor = 'move';
        }
    }
});
