import Vue from 'vue'

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
            if (el.__dialogDraggable__ === false) return;
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

            document.onmousemove = function (e) {
                // 通过事件委托，计算移动的距离 
                const l = e.clientX - disX;
                const t = e.clientY - disY;

                // 移动当前元素  
                dragDom.style.left = `${l + styL}px`;
                dragDom.style.top = `${t + styT}px`;

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
