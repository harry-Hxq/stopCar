const _directives = {}


/** 
 *  自动获取焦点，使用: v-focus
 */
_directives.focus = {
    inserted(el) {
        el.focus()
    }
}

/** 
 *  一键清空输入框，使用: v-clear="field"
 *  有bug: 无法更新v-model，待定
 */
// _directives.clear = {
//     inserted(el) {
//     	var span = document.createElement('span')
//     	span.className = 'clear'
//     	span.addEventListener('click', function() {
//     		el.value = ''
//     	}, false)
//     	el.parentNode.appendChild(span)
//     }
// }


export default (Vue) => {
    Object.keys(_directives).forEach(key => {
        Vue.directive(key, _directives[key])
    })
}
