// import {
// 	RECORD_USERINFO,
// 	LOGIN,
// } from './mutation-types.js'

import {removeStore} from '../config/mUtils'
import {agentInfo} from './initData'

export default {
	// 登出
	LOGOUT() {
		removeStore('tpSessionId');
	},
	// 隐藏头部和底部
	SETTOOL(state, info) {
		if(info === 'show') {
			state.headerShow = true
			state.footerShow = true
		}else if(info === 'hide') {
			state.headerShow = false
			state.footerShow = false
		}
	},
	//获取用户信息存入vuex
	RECORD_USERINFO(state, info) {
		if (info.phone) {
			state.agentInfo = {...info};
		} else {
			state.agentInfo = agentInfo;
		}
	},
}
