import App from '../App'


const uc = r => require.ensure([], () => r(require('../page/uc/uc')), 'uc')
const account = r => require.ensure([], () => r(require('../page/account/account')), 'account')
const stopRecord = r => require.ensure([], () => r(require('../page/stopRecord/stopRecord')), 'stopRecord')
const tipLog = r => require.ensure([], () => r(require('../page/tipLog/tipLog')), 'tipLog')
const contact = r => require.ensure([], () => r(require('../page/contact/contact')), 'contact')
const help = r => require.ensure([], () => r(require('../page/help/help')), 'help')
const stopCar = r => require.ensure([], () => r(require('../page/stopCar/stopCar')), 'stopCar')
const getLocation = r => require.ensure([], () => r(require('../page/getLocation/getLocation')), 'getLocation')
const becomeMember = r => require.ensure([], () => r(require('../page/becomeMember/becomeMember')), 'becomeMember')
const pay = r => require.ensure([], () => r(require('../page/becomeMember/children/pay')), 'pay')
const payOne = r => require.ensure([], () => r(require('../page/becomeMember/children/payOne')), 'payOne')
const login = r => require.ensure([], () => r(require('../page/login/login')), 'login')
const bindMobile = r => require.ensure([], () => r(require('../page/bindMobile/bindMobile')), 'bindMobile')
const bindCarNum = r => require.ensure([], () => r(require('../page/bindCarNum/bindCarNum')), 'bindCarNum')
const memberText1 = r => require.ensure([], () => r(require('../page/memberText1/memberText1')), 'memberText1')
const memberText2 = r => require.ensure([], () => r(require('../page/memberText2/memberText2')), 'memberText2')
const ucenter = r => require.ensure([], () => r(require('../page/ucenter/ucenter')), 'ucenter')
const motoMap = r => require.ensure([], () => r(require('../page/motoMap/motoMap')), 'motoMap')
const routeList = r => require.ensure([], () => r(require('../page/routeList/routeList')), 'routeList')
const routeDot = r => require.ensure([], () => r(require('../page/routeDot/routeDot')), 'routeDot')
const explain = r => require.ensure([], () => r(require('../page/explain/explain')), 'explain')
const opinion = r => require.ensure([], () => r(require('../page/opinion/opinion')), 'opinion')

export default [{
    path: '/',
    component: App, // 顶层路由，对应index.html
    children: [
        {
            path: '/',
            component: stopCar,
            meta: {
                title: '停车',
                auth: 'login',
                hideBack: true,
                keepAlive: true,
            },
        },
        {
            path: 'account',
            component: account,
            meta: {
                title: '账户信息',
                auth: 'account',
                hideBack: false,
                keepAlive: true,
            },
        },
        {
            path: 'getLocation',
            component: getLocation,
            meta: {
                title: '选择停车地址',
                auth: 'getLocation',
                hideBack: false,
                keepAlive: true,
            },
        },
        {
            path: 'stopCar',
            component: stopCar,
            meta: {
                title: '停车',
                auth: 'stopCar',
                hideBack: true,
                keepAlive: false,
            },
        },
        {
            path: 'bindCarNum',
            component: bindCarNum,
            meta: {
                title: '绑定车牌',
                auth: 'bindCarNum',
                hideBack: false,
                keepAlive: true,
            },
        },
        {
            path: 'bindMobile',
            component: bindMobile,
            meta: {
                title: '绑定手机',
                auth: 'bindMobile',
                hideBack: false,
                keepAlive: true,
            },
        },
        {
            path: 'contact',
            component: contact,
            meta: {
                title: '联系我们',
                auth: 'contact',
                hideBack: true,
                keepAlive: true,
            },
        },
        {
            path: 'help',
            component: help,
            meta: {
                title: '帮助中心',
                auth: 'help',
                hideBack: true,
                keepAlive: true,
            },
        },
        {
            path: 'stopRecord',
            component: stopRecord,
            meta: {
                title: '停车记录',
                auth: 'stopRecord',
                hideBack: false,
                keepAlive: true,
            },
        },
        {
            path: 'tipLog',
            component: tipLog,
            meta: {
                title: '提醒记录',
                auth: 'tipLog',
                hideBack: false,
                keepAlive: true,
            },
        },
        {
            path: '/becomeMember',
            component: becomeMember,
            meta: {
                title: '会员',
                auth: 'becomeMember',
                hideBack: false,
                keepAlive: false,
            },
        },
        {
            path: '/becomeMember/pay', // 支付x
            component: pay,
            meta: {
                title: '购买会员',
                hideBack: false,
                keepAlive: true,
                hideTab: true,
            },
        },
        {
            path: '/becomeMember/payOne', // 支付x
            component: payOne,
            meta: {
                title: '支付1元',
                hideBack: false,
                keepAlive: true,
                hideTab: true,

            },
        },
        {
            path: '/uc',
            component: uc,
            meta: {
                title: '会员中心',
                // auth: 'login',
                hideBack: true,
                keepAlive: false,
            },
        },
        {
            path: '/login',
            component: login,
            meta: {
                title: '登录',
                hideBack: true,
                hideTab: true,
            },
        },
        {
            path: '/memberText1',
            component: memberText1,
            meta: {
                title: '收费标准',
                hideBack: false,
                hideTab: true,
            },
        },
        {
            path: '/memberText2',
            component: memberText2,
            meta: {
                title: '会员专享',
                hideBack: false,
                hideTab: true,
            },
        },
        {
            path: '/ucenter',
            component: ucenter,
            meta: {
                title: '个人信息',
                hideBack: false,
                hideTab: true,
            },
        },
        {
            path: '/motoMap',
            component: motoMap,
            meta: {
                title: '摩托管制',
                hideBack: true,
                hideTab: true,
            },
        },
        {
            path: '/routeList',
            component: routeList,
            meta: {
                title: '管制点',
                hideBack: true,
                hideTab: false,
            },
        },
        {
            path: '/routeDot',
            component: routeDot,
            meta: {
                title: '管制点',
                hideBack: false,
                hideTab: true,
            },
        },
        {
            path: '/explain',
            component: explain,
            meta: {
                title: '使用说明',
                hideBack: true,
                hideTab: false,
            },
        },
        {
            path: '/opinion',
            component: opinion,
            meta: {
                title: '意见反馈',
                hideBack: false,
                hideTab: true,
            },
        }
    ]
}]

