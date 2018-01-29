import {getUc} from '../service/getData'

var getting = false
export default {

	// 获取用户信息
	async getUserInfo({
		commit,
		state
	}) {
		if(getting) return
		getting = true
		return getUc()
		.then((data) => {
			getting = false
			if(data.ret) {
				commit('RECORD_USERINFO', data.res.data)
			}
		})
	},

}