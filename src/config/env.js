/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 * 
 */

// 环境配置，要重新npm run dev
// 0:局域网API, 1:prep预发API, 2:prod生产API, 3:本地API
const ENV = process.env.NODE_ENV

let baseUrl = '';
let interfaceUrl = '';
let mainHost = '';
let routerMode = 'history';


 // 签名配置
const signatureConfig = {
	privateKey: 'OUTDBEjt8ZCICbPbwL8B4DTQKJvv8nH78TdohtAKzF8YhRIlqtjBaPBiySca3kCq',
	appid: 'cuSpEr9Nn4jFkdRFJ4s09YqaEipyw3RU',
	token: 'tKt1Pbchv0M8TiAI',
}

const envs = {
    'dev': {
        name: 'dev',
        desc: '开发环境',
        baseUrl: '',
        interfaceUrl: 'http://api.liechengcf.net',
    },
    'pre': {
        name: 'prep',
        desc: '预发环境',
        baseUrl: 'https://merp.liechengcf.com',
        interfaceUrl: 'http://preapi.liechengcf.com',
    },
    'prod': {
        name: 'prod',
        desc: '生产环境',
        baseUrl: 'https://www.xltcwy.cn',
        interfaceUrl: 'http://api.xltcwy.cn',
    },
    'local': {
        name: 'local',
        desc: '本地开发',
        baseUrl: '',
        interfaceUrl: 'http://www.yii2admin.cn',
    },
}

baseUrl = envs[ENV].baseUrl
interfaceUrl = envs[ENV].interfaceUrl
console.log('当前API：', baseUrl, interfaceUrl)

module.exports = {
    baseUrl,
    interfaceUrl,
    routerMode,
    signatureConfig,
}
