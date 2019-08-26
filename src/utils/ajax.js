/*
ajax请求函数模块
返回值: promise对象(异步返回的数据是: response.data)
 */
import axios from 'axios'

const axiosInstance = axios.create({
  withCredentials: true,
  timeout: 15000
})

axiosInstance.interceptors.request.use(
  config => {
    // console.log("ceshi",store.getters.token);
    // if (store.getters.token) {
      config.headers.token = 'LTAIXUisjyXjmdy7'
    // }
    // console.log("config",config);
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  response => {
    const res = response.data
    if (res.status !== 200) {
      return Promise.reject({
        code: res.code,
        error: res.message || res.msg || 'api request error,errCode : ' + response.data.code + ' url : ' + response.config.url
      })
    } else {
      return response
    }
  },
  error => {
    return Promise.reject({
      code: error.response ? error.response.status : '-1',
      error: error
    })
  }
)

export default function ajax (url, data = {}, type = 'GET', cancelHandle) {

  return new Promise(function (resolve, reject) {
    // 执行异步ajax请求
    let promise
    if (type === 'GET') {
      // 准备url query参数数据
      let dataStr = '' //数据拼接字符串
      Object.keys(data).forEach(key => {
        if (data[key]) {
          dataStr += key + '=' + encodeURIComponent(data[key]) + '&'
        }
      })
      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }
      // 发送get请求
      promise = axiosInstance.get(url, {
        cancelToken: new axios.CancelToken(function executor (c) {
          // An executor function receives a cancel function as a parameter
          // cancelHandle = c;
          // if(cancelHandle){
          //   cancelHandle.push(c)
          // }
          if (cancelHandle) {
            if (Object.prototype.toString.call(cancelHandle) === '[object Array]') {
              cancelHandle.push(c)
            } else {
              cancelHandle.cancel = c
            }
          }
        })
      })
    } else {
      // 发送post请求
      promise = axiosInstance.post(url, data,{
        cancelToken: new axios.CancelToken(function executor (c) {
          // An executor function receives a cancel function as a parameter
          // cancelHandle = c;
          // if(cancelHandle){
          //   cancelHandle.push(c)
          // }
          if (cancelHandle) {
            if (Object.prototype.toString.call(cancelHandle) === '[object Array]') {
              cancelHandle.push(c)
            } else {
              cancelHandle.cancel = c
            }
          }
        })
      })
    }
    promise.then(function (response) {
      // 成功了调用resolve()
      resolve(response.data)
    }).catch(function (error) {
      //失败了调用reject()
      reject(error)
    })
  })
}
