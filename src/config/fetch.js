import {baseUrl, interfaceUrl} from './env'
import {getSignature, getStore, removeNull} from './mUtils'

export default async(url = '', data = {}, type = 'GET', method = 'fetch', showLoading = true) => {
	data = removeNull(data)
	var token = getStore('token')
	
	// if(data.auth && !tpSessionId) {
	// 	delete data.auth
	// 	App.$router.push('/login')
	// 	return
	// }
	if(token) {
		data.token = token
	}

  // 签名
	// var defaultParam = getSignature(url, type, data);
	// data = Object.assign({}, data, defaultParam)
  url = baseUrl + url;

  // if(type != 'FILE') {
  //  var defaultParam = getSignature(interfaceUrl + url,type.toLowerCase(),data);
  //  url = baseUrl + url;
  // }

	type = type.toUpperCase();

	// 检查数据，未登录等
	var checkData = function(data) {
		if(data.code === -2){ //登录过期，重新授权
            window.location.href = interfaceUrl+'/api/v1/user/wx-login?targetUrl='+window.location.href
		}
	}
	// App.$refs.toast.showLoading()
	if(showLoading) {
		App.$vux.loading.show()
	}

	if (type == 'GET') {
		let dataStr = ''; //数据拼接字符串
		Object.keys(data).forEach(key => {
			dataStr += key + '=' + data[key] + '&';
		})
        checkData(data)
		if (dataStr !== '') {
			dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
			url = url + '?' + dataStr;
		}
	}

	// 上传文件
	if(type == 'FILE') {
		// let sign = getSignature(interfaceUrl + url,type.toLowerCase(), {sessionId: getStore('sessionId')||''})
		// data = Object.assign({}, data, sign)
		let formData = new FormData()
		let keys = Object.keys(data)
		for (let i = 0, len = keys.length; i < len; i++) {
			formData.append(keys[i], data[keys[i]])
		}
		return fetch(url, {
          method: 'POST',
          body: formData
        })
        .then((data) => {
          App.$vux.loading.hide()
            return data.json()
        })
	}

	if (window.fetch && method == 'fetch') {
		let requestConfig = {
			// credentials: 'include',
			credentials: 'omit',
			method: type,
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
				// 'Content-Type': 'multipart/form-data'
				// 'Content-Type': 'application/x-www-form-urlencoded'
			},
			mode: "cors",
			cache: "force-cache"
		}

		if (type == 'POST') {
			Object.defineProperty(requestConfig, 'body', {
				value: JSON.stringify(data)
			})
		}
		
		try {
			const response = await fetch(url, requestConfig);
			const responseJson = await response.json();
			checkData(responseJson)
			App.$vux.loading.hide()
			return responseJson
		} catch (error) {
			throw new Error(error)
		}
	} else {
		return new Promise((resolve, reject) => {
			let requestObj;
			if (window.XMLHttpRequest) {
				requestObj = new XMLHttpRequest();
			} else {
				requestObj = new ActiveXObject;
			}

			let sendData = '';
			if (type == 'POST') {
				sendData = JSON.stringify(data);
			}

			requestObj.open(type, url, true);
			requestObj.setRequestHeader("Content-type", "application/json");
			requestObj.send(sendData);

			requestObj.onreadystatechange = () => {
				if (requestObj.readyState == 4) {
					if (requestObj.status == 200) {
						App.$vux.loading.hide()
						let obj = requestObj.response
						if (typeof obj !== 'object') {
							obj = JSON.parse(obj);
						}
						checkData(obj)
						resolve(obj)
					} else {
						reject(requestObj)
					}
				}
			}
		})
	}
}