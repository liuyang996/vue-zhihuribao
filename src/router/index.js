import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/pages/home'

import store from '../store'

Vue.use(Router)

// 页面刷新时，重新赋值收藏
if (localStorage.getItem('starData')) {
    store.commit('SETSTARDATA', JSON.parse(localStorage.getItem('starData')))
  }

/*
  1.keep-alive 
*/

export default new Router({
    mode: 'history',
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
          return savedPosition
        } else {
          return { x: 0, y: 0 }
        }
      },

  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/home'),
      meta: {
        keepAlive: true, //
        isBack:false
      }
    },
    // {
    //     path: '/home/',
    //     name: 'home',
    //     component: () => import('@/pages/home'),
    //     meta: {
    //         keepAlive: true, //
    //         isBack:false
    //       }
    // },
    {
        path: '/newsDetail/:id/:star',
        name: 'newsDetail',
        component: () => import('@/pages/newsDetail'),
        meta: {
            keepAlive: true, //
            isBack:false
        }
    },
    {
        path: '/comment/:id',
        name: 'comment',
        component: () => import('@/pages/comment'),
        meta: {
            keepAlive: false, //此组件不需要被缓存
        }
    },
    {
        path: '/collection/',
        name: 'collection',
        component: () => import('@/pages/collection'),
        meta: {
            keepAlive: false, //
          }
    }
  ]
})
