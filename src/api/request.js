import _, { cloneDeep, isEmpty } from 'lodash'
import qs from 'qs'
import axios from 'axios'
// 添加请求拦截器，在发送请求之前做些什么(**具体查看axios文档**)--------------------------------------------
axios.interceptors.request.use(function (config) {
  // 显示loading
  return config
}, function (error) {
  // 请求错误时弹框提示，或做些其他事
  return Promise.reject(error)
})
// 添加响应拦截器(**具体查看axios文档**)----------------------------------------------------------------
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么，允许在数据返回客户端前，修改响应的数据
  // 如果只需要返回体中数据，则如下，如果需要全部，则 return response 即可
  return response.data
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default function request (options, ContentType,accessToken) {
  let { data, url, method = 'get' } = options
  const cloneData = cloneDeep(data)
  options.data = qs.stringify(cloneData)
  // options.body =  JSON.stringify(cloneData)
  options.url = url
  options.timeout = 10000
  options.headers = {
    Accept: '*/*',
    'Content-Type': ContentType ? ContentType : 'application/x-www-form-urlencoded',
    Authorization: `Bearer ${accessToken?accessToken:global.token}`
  }
  if (ContentType === 'application/json') {
    console.log(options)
    return axios[method](
      options.url,
      { ...data },
      {
        headers: options.headers,
        timeout: 10000
      }
    ).then(response => {
      return response
    })
      .then(data => {
        return Promise.resolve(data)
      })
      .catch(error => {
        console.log(error)
        return Promise.reject({
          success: false,
          message: error
        })
      })
  } else {
    options.params = qs.stringify(cloneData)
  }
  switch (options.method) {
    case 'get':
      return fetch(options.url, { ...options })
        .then(response => response.json())
        .then(data => {
          return Promise.resolve(data)
        })
        .catch(error => {
          return Promise.reject({
            success: false,
            message: error
          })
        })
      break
    case 'post':
    case 'put':
      console.log(options)
      return axios({ ...options })
        .then(response => {
          console.log(response)
          return response
        })
        .then(data => {
          return Promise.resolve(data)
        })
        .catch(error => {
          console.log(error)
          return Promise.reject({
            success: false,
            message: error
          })
        })
      break
  }
}
