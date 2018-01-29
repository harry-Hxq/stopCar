import { getStyle } from './mUtils'
import { imgBaseUrl, localapi, proapi } from './env'

export const loadMore = {
	directives: {
		'load-more': {
			bind: (el, binding) => {
				let windowHeight = window.screen.height;
				let height;
				let setTop;
				let paddingBottom;
				let marginBottom;
				let requestFram;
				let oldScrollTop;
				let scrollEl;
				let heightEl;
				let scrollType = el.attributes.type && el.attributes.type.value;
				let scrollReduce = 2;
				if (scrollType == 2) {
					scrollEl = el;
					heightEl = el.children[0];
				} else {
					scrollEl = document.body;
					heightEl = el;
				}

				el.addEventListener('touchstart', () => {
					height = heightEl.clientHeight;
					if (scrollType == 2) {
						height = height
					}
					setTop = el.offsetTop;
					paddingBottom = getStyle(el, 'paddingBottom');
					marginBottom = getStyle(el, 'marginBottom');
				}, false)

				el.addEventListener('touchmove', () => {
					loadMore();
				}, false)

				el.addEventListener('touchend', () => {
					oldScrollTop = scrollEl.scrollTop;
					moveEnd();
				}, false)

				const moveEnd = () => {
					requestFram = requestAnimationFrame(() => {
						if (scrollEl.scrollTop != oldScrollTop) {
							oldScrollTop = scrollEl.scrollTop;
							moveEnd()
						} else {
							cancelAnimationFrame(requestFram);
							height = heightEl.clientHeight;
							loadMore();
						}
					})
				}

				const loadMore = () => {
					if (scrollEl.scrollTop + windowHeight >= height + setTop + paddingBottom + marginBottom - scrollReduce) {
						binding.value();
					}
				}
			}
		}
	}
};


// 发起请求时显示的 Loading
export const Loading = {
	inited: false,
	isShow: false,
	num: 0,  // 避免重复调用出现多个
	init() {
		this.container = document.createElement('div')
		var html = []
		html.push('<section class="md_toast" id="loading_toast">')
		html.push('<div class="md_toast_dialog">')
		html.push('<i class="ico loading"></i>')
		html.push('<p class="txt">loading...</p>')
		html.push('</div>')
		html.push('</section>')
		var str = html.join('')

		this.container.innerHTML = str
		document.body.appendChild(this.container)
		this.inited = true
	},
	show() {
		if(!this.inited) {
			this.init()
		}
		// console.log(this.num)
		this.num++
		this.container.style.display = 'block'
		this.isShow =  true
	},
	hide(forceHide) {
		if(this.num == 0) return
		this.num--
		if(this.num <= 0||forceHide) {
			this.num = 0
			this.container.style.display = 'none'
		}
		this.isShow =  false
	}
}