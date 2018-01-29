import md5 from 'js-md5';
import {signatureConfig, interfaceUrl} from 'src/config/env'

/**
 * 手机加星号
 */
export const encryptPhone = (phone) => {
    phone = phone + '';
    return phone.substr(0, 3) + '****' + phone.substr(7, 11);
}


/**
 * 手机加星号
 */
export const previewLocalImg = (event, callback) => {
    if(typeof FileReader == 'undefined') {
        alert('抱歉，你的浏览器不支持预览本地图片')
        return
    }
    var reader = new FileReader();
    var img1 = event.target.files[0];

    reader.readAsDataURL(img1);
    var that = this;
    reader.onloadend = function() {
        if(typeof callback === 'function') callback(reader.result);
    }
}



/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
	if (!name) return;
	if (typeof content !== 'string') {
		content = JSON.stringify(content);
	}
	window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getStore = name => {
	if (!name) return;
	return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
	if (!name) return;
	window.localStorage.removeItem(name);
}

/**
 * 获取style样式
 */
export const getStyle = (element, attr, NumberMode = 'int') => {
    let target;
    // scrollTop 获取方式不同，没有它不属于style，而且只有document.body才能用
    if (attr === 'scrollTop') { 
        target = element.scrollTop;
    }else if(element.currentStyle){
        target = element.currentStyle[attr]; 
    }else{ 
        target = document.defaultView.getComputedStyle(element,null)[attr]; 
    }
    //在获取 opactiy 时需要获取小数 parseFloat
    return  NumberMode == 'float'? parseFloat(target) : parseInt(target);
} 

/**
 *   对Date的扩展，将 Date 转化为指定格式的String
 *   月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 *   年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 *   例子：
 *   (new Date()).Format('yyyy-MM-dd hh:mm:ss.S') ==> 2006-07-02 08:09:04.423
 *   (new Date()).Format('yyyy-M-d h:m:s.S')      ==> 2006-7-2 8:9:4.18
 */
export const formatDate = (time) => {
    var day = new Date(Number(time)*1000)
    let Y,M,D

    Y = day.getFullYear();
    M = day.getMonth() + 1;
    D = day.getDate();
    M = M < 10? '0' + M : M
    D = D < 10? '0' + D : D
    // h = date.getHours() + ':';
    // m = date.getMinutes() + ':';
    // s = date.getSeconds(); 

    return Y+'-'+M+'-'+D;
};

/**
 *   对Date的扩展，将 Date 转化为指定格式的String
 *   月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 *   年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 *   例子：
 *   (new Date()).Format('yyyy-MM-dd hh:mm:ss.S') ==> 2006-07-02 08:09:04.423
 *   (new Date()).Format('yyyy-M-d h:m:s.S')      ==> 2006-7-2 8:9:4.18
 */
export const formatTime = (time) => {
    var day = new Date(Number(time)*1000)
    let Y,M,D,h,m;

    Y = day.getFullYear();
    M = day.getMonth() + 1;
    D = day.getDate();
    M = M < 10? '0' + M : M
    D = D < 10? '0' + D : D
    h = day.getHours();
    m = day.getMinutes();
    h = h < 10? '0' + h : h
    m = m < 10? '0' + m : m
    // s = date.getSeconds();

    return Y+'-'+M+'-'+D+' '+h+':'+m;
};


/**
 *   抽取对象数组的某一个字段为一个数组
 */
export const getObjectsFields = (arr,field) => {
    if(!(arr && arr.length)) {
        // 输入的不是对象数组，或数组为空
        return []
    }
    var result = []
    for (var i = 0; i < arr.length; i++) {
        result.push(arr[i][field])
    }
    return result
};


/**
 *   保留两位小数
 */
export const toFixedTwo = (num) => {
    return Number(num).toFixed(2)
    // return parseFloat(num, 10).toFixed(2)
};


/**
 *   加密银行卡号
 *   返回 6226 3234 **** 3253
 */
export const encryptCardNum = (num) => {
    // num = (num + '').replace(/\ +/g,"");
    num = num + ''
    var result = [
        num.substr(0, 4),
        num.substr(4, 4),
        '****',
        num.substr(12),
    ]
    return result.join(' ')
};


/**
 *   货币格式化
 *   (2, '.', ',')
 *   默认保留2位小数，用,分隔
 */
export const formatCurrency = (num, c, d, t) => {
    var n = num, 
    c = isNaN(c = Math.abs(c)) ? 2 : c, 
    d = d == undefined ? "." : d, 
    t = t == undefined ? "," : t, 
    s = n < 0 ? "-" : "", 
    i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))), 
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
}

/** 设置cookie
 * @param name
 * @param value 值
 * @param days 天数
 */
export const setCookie =  (name, value, days) => {
    let d = new Date;
    d.setTime(d.getTime() + 24*60*60*1000*days);
    window.document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
};

/** 获取cookie
 * @param name
 * @return string
 */
export const getCookie =  name => {
    let v = window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v[2];
};
/** 删除cookie
 * @param name
 */
export const deleteCookie =  name => {
    this.set(name, '', -1);
};

/** 
 * 移除null或undefined的属性
 * @param obj
 */
export const removeNull =  (param) => {
    var obj = {...param}
    var keys = Object.keys(obj)
    for (var i = 0; i < keys.length; i++) {
        var v = obj[keys[i]]
        if(v === null || v === undefined) {
            delete obj[keys[i]]
        }
    }

    // for(var v in obj) {
    //     if(v === null || v === undefined) {
    //         delete v
    //     }
    // }
    return obj
};


/**签名生成
 * @param url
 * @param method
 * @param params //所有请求的参数组成的数组
 * @return signature data
 */
export const getSignature =  (url,method,params) => {
    method = method.toLowerCase()
    method = method == 'file'? 'post': method

    let privateKey = signatureConfig.privateKey
    let appid = signatureConfig.appid
    let token = signatureConfig.token
    let b_nonce = Date.parse(new Date())/1000;

    let signString = interfaceUrl + url+'&'+method;

    params['appid'] = appid;
    params['token'] = token;
    params['b_nonce'] = b_nonce;
    let key_arr = Object.keys(params);

    key_arr.sort();
    // console.log(params, key_arr)
    for(let i =0 ; i < key_arr.length; i++){
        var obj = params[key_arr[i]]
        obj = obj == undefined? '' : obj
        if(obj.constructor != File) {
            signString += '&'+key_arr[i]+'='+obj;
        }
    }
    signString = signString.toLowerCase();
    // console.log(signString);
    let signature = md5(md5(signString+'&'+privateKey)+'&'+privateKey)
    return {
        'appid' : appid,
        'token' : token,
        'b_nonce' : b_nonce,
        'signature' : signature,
    }
};
