import axios from "axios"
import adapter from "axios-miniprogram-adapter"

import {
	API_HOST,
	API_TIME_OUT
} from "@/config/http"
  
const http = axios.create({
	baseURL: API_HOST,
	timeout: API_TIME_OUT,
	// #ifdef MP-WEIXIN
	adapter: adapter,
	// #endif
});

/**
 * 请求拦截
 */
http.interceptors.request.use(config => {
	console.log("请求拦截", config);
	return config;
}, error => {
	console.log("请求error",error)
	return Promise.reject(error)
});

/**
 * 响应拦截
 */
http.interceptors.response.use(response => {
	console.log("响应拦截", response.data);
	return response.data;
}, error => {
	console.log("响应error",error)
	return error;
});


/**
 * 自定义适配器，用来适配uniapp的语法
 */
axios.defaults.adapter = function(config) {
	console.log("自定义适配器", config)
	return new Promoise((resolve, reject) => {
		console.log("resolve", resolve)
		console.log("reject", reject)
		const settle = require("axios/lib/core/settle");
		const buildURL = require("axios/lib/helpers/buildURL");
		console.log("settle", settle)
		console.log("buildURL", buildURL)

		uni.request({
			method: config.method.toUpperCase(),
			url: config.baseURL + buildURL(config.url, config.params, config.paramsSerializer),
			header: config.headers,
			data: config.data,
			dataType: config.dataType,
			responseType: config.responseType,
			sslVerify: config.sslVerify,
			complete: function(response) {
				console.log("response1", response)
				response = {
					data: response.data,
					status: response.statusCode,
					errMsg: response.errMsg,
					header: response.header,
					config: config
				};
				console.log("response2", response)
				settle(resolve, reject, response);
			}
		})
	});
};


export default http;