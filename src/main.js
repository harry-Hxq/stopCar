import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/router'
import filters from './filters/filters';
import directives from './directives/directives';
import store from './store/'
import {routerMode} from './config/env'
// import './config/rem'
import FastClick from 'fastclick'
import {mapState, mapMutations} from 'vuex'
import {setStore, getStore, removeStore} from './config/mUtils'
// import {Loading} from './config/mixin'


// 全局组件

import headTop from './components/headTop'
// Vue.component('navTab',navTab);
Vue.component('headTop',headTop);

// 全局vux组件
import {Loading, Group, GroupTitle, Cell, Box, XInput, Selector, XButton } from 'vux'
Vue.component('Loading', Loading)
Vue.component('Group', Group)
Vue.component('GroupTitle', GroupTitle)
Vue.component('Cell', Cell)
Vue.component('Box', Box)
Vue.component('XInput', XInput)
Vue.component('Selector', Selector)
Vue.component('XButton', XButton)

import { ConfigPlugin, ToastPlugin, AlertPlugin, ConfirmPlugin, LoadingPlugin } from 'vux'
import VueScroller from 'vue-scroller'
// global VUX config
Vue.use(ConfigPlugin, {
  $layout: 'VIEW_BOX' // global config for VUX, since v2.5.12
})

import  VueResource  from 'vue-resource'


Vue.use(VueResource)
// plugins
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)
Vue.use(VueScroller)
Vue.use(require("components/js/tap.js"));


// import BaiduMap from 'vue-baidu-map'
// Vue.use(BaiduMap, {
//     // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
//     ak: '5df198198b1005b5800703e7c895f97d'
// })

// import VueAMap from 'vue-amap';
// Vue.use(VueAMap)
// VueAMap.initAMapApiLoader({
//     key: '5df198198b1005b5800703e7c895f97d',
//     plugin: ['VueAMap.Autocomplete',  'VueAMap.Scale',  'VueAMap.ToolBar', 'VueAMap.Geolocation'],
//     uiVersion: '1.0' // 版本号
// })


// filters and directives
filters(Vue)
directives(Vue)

// fastclick
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}

// 路由
Vue.use(VueRouter)
const router = new VueRouter({
	routes,
	mode: routerMode,
	strict: process.env.NODE_ENV !== 'production',
	scrollBehavior (to, from, savedPosition) {
	    if (savedPosition) {
		    return savedPosition
		} else {
			if (from.meta.keepAlive) {
				from.meta.savedPosition = document.body.scrollTop;
			}
		    return { x: 0, y: to.meta.savedPosition ||0}
		}
	}
})


// vuex注册loading模块
store.registerModule('loading', {
  state: {
    isLoading: false
  },
  mutations: {
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    }
  }
})

// 路由权限控制
router.beforeEach((to, from, next) => {
  store.commit('updateLoadingStatus', {isLoading: true})
  // 验证是否需要登录
  if (to.matched.some(record => record.meta.auth == 'login')) {
    // if (!getStore('tpSessionId')) {
    //   next({
    //     path: '/login',
    //     query: { redirect: to.fullPath }
    //   })
    // } else{
      next()
    // }
  } 
  else {
    next()
  }
})
router.afterEach((to, from, next) => {
  store.commit('updateLoadingStatus', {isLoading: false})
  var bd = document.body
  var len = to.fullPath.split('/').length-1
  if(len>1) {
    bd.className = 'noScroll'
  }else {
    bd.className = ''
  }
})


new Vue({
	router,
	store,
}).$mount('#app')

