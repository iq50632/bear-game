import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: process.env.IS_ELECTRON ? 'hash' : 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: require('@/components/index').default
    },
    {
      path: '/game',
      name: 'Game',
      component: require('../components/Game').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
