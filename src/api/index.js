import axios from 'axios'
import store from '../store'

// http request 拦截器
axios.interceptors.request.use(
  config => {
      if (store.state.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
          config.headers.Authorization = `token ${store.state.token}`;
      }
      return config;
  },
  err => {
      return Promise.reject(err);
  });

  // http response 拦截器
axios.interceptors.response.use(
  response => {
      return response;
  },
  error => {
      if (error.response) {
          switch (error.response.status) {
              case 401:
                  // 返回 401 清除token信息并跳转到登录页面
                  store.commit(types.LOGOUT);
                  router.replace({
                      path: 'login',
                      query: {redirect: router.currentRoute.fullPath}
                  })
          }
      }
      return Promise.reject(error.response.data)   // 返回接口返回的错误信息
  });


  
let http = axios.create({
    baseURL: 'http://news-at.zhihu.com',
    withCredentials: false,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    transformRequest: [function (data) {
      let newData = '';
      for (let k in data) {
        if (data.hasOwnProperty(k) === true) {
          newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&';
        }
      }
      return newData;
    }]
  });

  function apiAxios(method, url, params, response) {
    http({
      method: method,
      url: url,
      data: method === 'POST' || method === 'PUT' ? params : null,
      params: method === 'GET' || method === 'DELETE' ? params : null,
    }).then(function (res) {
      response(res);
    }).catch(function (err) {
      response(err);
    })
  }

  export default {
    get: function (url, params, response) {
      return apiAxios('GET', url, params, response)
    },
    post: function (url, params, response) {
      return apiAxios('POST', url, params, response)
    },
    put: function (url, params, response) {
      return apiAxios('PUT', url, params, response)
    },
    delete: function (url, params, response) {
      return apiAxios('DELETE', url, params, response)
    }
  }