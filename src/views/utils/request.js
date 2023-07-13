/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-06-30 21:47:07
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-07-12 19:25:05
 * @FilePath: \manage\src\views\utils\request.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from 'axios'
import { baseurl } from './tools'
import nProgress from "nprogress";
import 'nprogress/nprogress.css';
import { gettoken } from '../../views/utils/tools'

const adress = axios.create({
  baseURL: baseurl,
  timeout: 3000,
});
// 添加请求拦截器
adress.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  nProgress.start()
  config.headers.token = gettoken;
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
adress.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  nProgress.done()
  return response;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error);
});


export const get = (url, params) => {
  return adress.get(url, {
    params,
  })
}

export const delet = (url) => {
  return adress.delete(url)
}

export const post = (url, data) => {
  return adress.post(url, data)
}

export const put = (url,data) => { 
  return adress.put(url,data)
}
export default adress