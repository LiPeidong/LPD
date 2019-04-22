import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: resolve => require(['^/home/Home'],resolve)
    },
    {
      path: '/AboutUs',
      name: 'AboutUs',
      component: resolve => require(['^/aboutUs/AboutUs'],resolve)    
    },
    {
      path: '/News',
      name: 'News',
      component: resolve => require(['^/news/News'],resolve)    
    },
    {
      path: '/Service',
      name: 'Service',
      component: resolve => require(['^/service/Service'],resolve)    
    },
    {
      path:'/NewsDetail',
      name:'NewsDetail',
      component: resolve => require(['^/NewsDetail/NewsDetail'],resolve)   
    }
  ]
})
