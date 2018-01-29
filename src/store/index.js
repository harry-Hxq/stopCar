import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'
import {detail, agentInfo} from './initData'

Vue.use(Vuex)

const state = {
  isLoading: false,  // loading 显示状态
	agentInfo: agentInfo,  // 用户信息
  headerShow: true,  // 头部显示状态
  footerShow: true,  // 底部显示状态
}

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
})