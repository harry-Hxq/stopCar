import fetch from '../config/fetch'
import {getStore} from '../config/mUtils'

/**
 * 登录
 */
export const accountLogin = (param) => fetch('/tp/login', {
	...param
}, 'POST');

/**
 * 获取用户信息
 */
export const getUsers = (param) => fetch('/api/v1/user/user-profile', {
    ...param
}, 'GET','fetch',false);



/**
 * 确认停车
 */
export const confirmStop = (param) => fetch('/api/v1/user/stop-car', {
    ...param
}, 'POST');


/**
 * 停车记录
 */
export const stopLog = (param) => fetch('/api/v1/user/stop-log', {
    ...param
}, 'GET');


/**
 * 提醒记录
 */
export const tipLog = (param) => fetch('/api/v1/user/tip', {
    ...param
}, 'GET');


/**
 * 绑定用户信息
 */
export const bindUserInfo = (param) => fetch('/api/v1/user/bind-user-info', {
    ...param
}, 'POST');


/**
 * 绑定用户信息
 */
export const getLocation = (param) => fetch('/api/v1/user/bind-user-info', {
    ...param
}, 'POST');




/**
 * 支付接口
 */
export const pay = (param) => fetch('/api/v1/user/pay', {
    ...param
}, 'get');



/**
 * 创建本地订单
 */
export const PayLocalOrder = (param) => fetch('/api/v1/user/pay-local-order', {
    ...param
}, 'get');


/**
 * 获取支付配置
 */
export const PayConfig = (param) => fetch('/api/v1/user/pay-config', {
    ...param
}, 'get');

/**
 * 获取支付配置
 */
export const endStopCar = (param) => fetch('/api/v1/user/end-stop-car', {
    ...param
}, 'post');



