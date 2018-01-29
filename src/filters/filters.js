import {toFixedTwo, formatCurrency} from '../config/mUtils'

const _filters = {}


/** 加密手机号码
 *  @param {string} phone 手机字符串
 */
_filters.encryptPhone = function(phone) {
    phone = phone + '';
    return phone.substr(0, 3) + '****' + phone.substr(7, 11);
}


/** 获得净值涨跌 class
 *  @param {number} val 净值数字
 */
_filters.getValClass = function(val) {
	val = Number(val)
    if(val > 0) {
    	return 'c_red'
    }else if(val < 0) {
    	return 'c_green'
    }else {
    	return 'c_yellow'
    }
}


/** 保留两位小数
 *  @param {number} num 数字
 */
_filters.toFixedTwo = toFixedTwo


/**
 *   货币格式化
 *   用逗号分隔
 */
_filters.formatCurrency = formatCurrency


export default (Vue) => {
    Object.keys(_filters).forEach(key => {
        Vue.filter(key, _filters[key])
    })
}
