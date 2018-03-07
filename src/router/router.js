import App from '../App'

// const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
const open = r => require.ensure([], () => r(require('../page/open/open')), 'open')
const customer = r => require.ensure([], () => r(require('../page/customer/customer')), 'customer')
const uc = r => require.ensure([], () => r(require('../page/uc/uc')), 'uc')
const account = r => require.ensure([], () => r(require('../page/account/account')), 'account')
const stopRecord = r => require.ensure([], () => r(require('../page/stopRecord/stopRecord')), 'stopRecord')
const tipLog = r => require.ensure([], () => r(require('../page/tipLog/tipLog')), 'tipLog')
const contact = r => require.ensure([], () => r(require('../page/contact/contact')), 'contact')
const help = r => require.ensure([], () => r(require('../page/help/help')), 'help')
const stopCar = r => require.ensure([], () => r(require('../page/stopCar/stopCar')), 'stopCar')
const getLocation = r => require.ensure([], () => r(require('../page/getLocation/getLocation')), 'getLocation')
const becomeMember = r => require.ensure([], () => r(require('../page/becomeMember/becomeMember')), 'becomeMember')
const login = r => require.ensure([], () => r(require('../page/login/login')), 'login')
const bindMobile = r => require.ensure([], () => r(require('../page/bindMobile/bindMobile')), 'bindMobile')
const bindCarNum = r => require.ensure([], () => r(require('../page/bindCarNum/bindCarNum')), 'bindCarNum')



const openErp = r => require.ensure([], () => r(require('../page/openErp/openErp')), 'openErp')
const openFund = r => require.ensure([], () => r(require('../page/openFund/openFund')), 'openFund')
const customerErp = r => require.ensure([], () => r(require('../page/customerErp/customerErp')), 'customerErp')
const customerFund = r => require.ensure([], () => r(require('../page/customerFund/customerFund')), 'customerFund')
const customerFundDetail = r => require.ensure([], () => r(require('../page/customerFundDetail/customerFundDetail')), 'customerFundDetail')
const customerErpDetail = r => require.ensure([], () => r(require('../page/customerErpDetail/customerErpDetail')), 'customerErpDetail')
const customerFundAccount = r => require.ensure([], () => r(require('../page/customerFundAccount/customerFundAccount')), 'customerFundAccount')
const customerFundPosition = r => require.ensure([], () => r(require('../page/customerFundPosition/customerFundPosition')), 'customerFundPosition')
const customerFundRecord = r => require.ensure([], () => r(require('../page/customerFundRecord/customerFundRecord')), 'customerFundRecord')
const customerFundDeposit = r => require.ensure([], () => r(require('../page/customerFundDeposit/customerFundDeposit')), 'customerFundDeposit')
const customerFundExchange = r => require.ensure([], () => r(require('../page/customerFundExchange/customerFundExchange')), 'customerFundExchange')
const customerFundWithdraw = r => require.ensure([], () => r(require('../page/customerFundWithdraw/customerFundWithdraw')), 'customerFundWithdraw')
const customerFundEditBank = r => require.ensure([], () => r(require('../page/customerFundEditBank/customerFundEditBank')), 'customerFundEditBank')
const customerFundDepositLog = r => require.ensure([], () => r(require('../page/customerFundDepositLog/customerFundDepositLog')), 'customerFundDepositLog')
const customerFundWithdrawLog = r => require.ensure([], () => r(require('../page/customerFundWithdrawLog/customerFundWithdrawLog')), 'customerFundWithdrawLog')
const customerFundExchangeLog = r => require.ensure([], () => r(require('../page/customerFundExchangeLog/customerFundExchangeLog')), 'customerFundExchangeLog')
const customerFundBank = r => require.ensure([], () => r(require('../page/customerFundBank/customerFundBank')), 'customerFundBank')
const purchase = r => require.ensure([], () => r(require('../page/purchase/purchase')), 'purchase')
const setTradePassword = r => require.ensure([], () => r(require('../page/setTradePassword/setTradePassword')), 'setTradePassword')
const modifyTradePassword = r => require.ensure([], () => r(require('../page/modifyTradePassword/modifyTradePassword')), 'modifyTradePassword')
const performance = r => require.ensure([], () => r(require('../page/performance/performance')), 'performance')
const setRate = r => require.ensure([], () => r(require('../page/setRate/setRate')), 'setRate')
const updateRate = r => require.ensure([], () => r(require('../page/updateRate/updateRate')), 'updateRate')
const updateRateRecord = r => require.ensure([], () => r(require('../page/updateRateRecord/updateRateRecord')), 'updateRateRecord')

export default [{
    path: '/',
    component: App, // 顶层路由，对应index.html
    children: [
        {
            path: '/',
            component: open,
            meta: {
                title: '开户',
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
                keepAlive: true,
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
                hideBack: true,
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
            path: 'becomeMember',
            component: becomeMember,
            meta: {
                title: '成为会员',
                auth: 'becomeMember',
                hideBack: true,
                keepAlive: true,
            },
        },
        {
            path: '/open',
            component: open,
            meta: {
                title: '开户',
                auth: 'login',
                hideBack: true,
                keepAlive: true,
            },
        },
        {
            path: '/customer',
            component: customer,
            meta: {
                title: '客户管理',
                auth: 'login',
                hideBack: true,
                keepAlive: true,
            },
        },
        {
            path: '/uc',
            component: uc,
            meta: {
                title: '我的',
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
            path: '/openErp',
            component: openErp,
            meta: {
                title: 'ERP开户',
                auth: 'login',
            },
        },
        {
            path: '/openFund',
            component: openFund,
            meta: {
                title: '基金开户',
                auth: 'login',
                hideTab: true,
            },
        },
        {
            path: '/customerErp',
            component: customerErp,
            meta: {
                title: 'erp用户',
                auth: 'login',
                keepAlive: true,
            },
        },
        {
            path: '/customerFund',
            component: customerFund,
            meta: {
                title: '基金用户',
                auth: 'login',
                keepAlive: true,
            },
        },
        {
            path: '/customerFundDetail',
            component: customerFundDetail,
            meta: {
                title: '基金用户',
                auth: 'customerFundDetail',
                keepAlive: true,
            },
        },
        {
            path: '/customerErpDetail',
            component: customerErpDetail,
            meta: {
                title: '基金用户',
                auth: 'customerErpDetail',
                keepAlive: true,
            },
        },
        {
            path: '/customerFundAccount',
            component: customerFundAccount,
            meta: {
                title: '基金账户详情',
                auth: 'customerFundAccount',
                keepAlive: true,
            },
        },
        {
            path: '/customerFundPosition',
            component: customerFundPosition,
            meta: {
                title: '基金持仓',
                auth: 'customerFundPosition',
                keepAlive: true,
            },
        },
        {
            path: '/customerFundRecord',
            component: customerFundRecord,
            meta: {
                title: '基金交易记录',
                auth: 'customerFundRecord',
                keepAlive: true,
            },
        },
        {
            path: '/customerFundDeposit',
            component: customerFundDeposit,
            meta: {
                title: '账户入金',
                auth: 'customerFundDeposit',
                keepAlive: false,
            },
        },
        {
            path: '/customerFundExchange',
            component: customerFundExchange,
            meta: {
                title: '币种兑换',
                auth: 'customerFundExchange',
                keepAlive: false,
            },
        },
        {
            path: '/customerFundWithdraw',
            component: customerFundWithdraw,
            meta: {
                title: '账户提现',
                auth: 'customerFundWithdraw',
                keepAlive: false,
            },
        },
        {
            path: '/customerFundEditBank',
            component: customerFundEditBank,
            meta: {
                title: '编辑银行卡',
                auth: 'customerFundEditBank',
                keepAlive: false,
            },
        },
        {
            path: '/customerFundDepositLog',
            component: customerFundDepositLog,
            meta: {
                title: '入金记录',
                auth: 'customerFundDepositLog',
                keepAlive: true,
            },
        },
        {
            path: '/customerFundWithdrawLog',
            component: customerFundWithdrawLog,
            meta: {
                title: '提现记录',
                auth: 'customerFundWithdrawLog',
                keepAlive: true,
            },
        },
        {
            path: '/customerFundExchangeLog',
            component: customerFundExchangeLog,
            meta: {
                title: '兑换记录',
                auth: 'customerFundExchangeLog',
                keepAlive: true,
            },
        },
        {
            path: '/customerFundBank',
            component: customerFundBank,
            meta: {
                title: '银行卡',
                auth: 'customerFundBank',
                keepAlive: true,
            },
        },
        {
            path: '/purchase',
            component: purchase,
            meta: {
                title: '认购',
                auth: 'purchase',
                keepAlive: false,
            },
        },
        {
            path: '/setTradePassword',
            component: setTradePassword,
            meta: {
                title: '设置交易密码',
                auth: 'setTradePassword',
                keepAlive: true,
            },
        },
        {
            path: '/modifyTradePassword',
            component: modifyTradePassword,
            meta: {
                title: '修改交易密码',
                auth: 'modifyTradePassword',
                keepAlive: false,
            },
        },
        {
            path: '/performance',
            component: performance,
            meta: {
                title: '我的业绩',
                auth: 'performance',
                keepAlive: true,
            },
        },
        {
            path: '/setRate',
            component: setRate,
            meta: {
                title: '我的认购费',
                auth: 'setRate',
                keepAlive: true,
            },
        },
        {
            path: '/updateRate',
            component: updateRate,
            meta: {
                title: '更改认购费',
                auth: 'updateRate',
                keepAlive: true,
            },
        },
        {
            path: '/updateRateRecord',
            component: updateRateRecord,
            meta: {
                title: '申请记录',
                auth: 'updateRateRecord',
                keepAlive: true,
            },
        },
    ]
}]


// import Vue from 'vue'
// import Router from 'vue-router'

// const Hello = r => require.ensure([], () => r(require('../components/Hello')), 'Hello')
// const index = r => require.ensure([], () => r(require('../page/index/index')), 'index')
// import Hello from '@/components/Hello'




// Vue.use(Router)

// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'index',
//       component: index
//     }
//   ]
// })
