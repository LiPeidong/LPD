import Vue from 'vue'
import Router from 'vue-router'
import BASE_URL from '../constants'
import Axios from 'axios'

Vue.use(Router)

var routes = [
  //工人端
  {
    path: '/menu',
    component: () => import('@/components/worke/Menu'),
    meta: {title:'menu',requireAuth:true},
    children: [
      {
        path: '',
        name: 'Grabsingle1',
        component:() => import('@/components/worke/Grabsingle'),
        meta: {title:'抢单池',requireAuth:true},
      },
      {
        path: '/menu/Grabsingle',
        name: 'Grabsingle2',
        component:() => import('@/components/worke/Grabsingle'),
        meta: {title:'抢单池',requireAuth:true},
      },
      {
        path: '/menu/Person',
        name: 'Person',
        component:() => import('@/components/worke/Person'),
        meta: {title:'个人中心',requireAuth:true},
      }
    ]
  },
  {
    path: '/Workdetails',
    name: 'Workdetails',
    component:() => import('@/components/worke/Workdetails'),
    meta: {title:'工单详情',requireAuth:true},
  },
  {
    path: '/Hasservice',
    name: 'Hasservice',
    component:() => import('@/components/worke/Hasservice'),
    meta: {title:'已服务工单',requireAuth:true},
  },
  {
    path: '/Rate',
    name: 'Rate',
    component:() => import('@/components/worke/Rate'),
    meta: {title:'评价',requireAuth:true},
  },
  {
    path: '/Register',
    name: 'Register',
    component:() => import('@/components/worke/Register'),
    meta: {title:'注册列表',requireAuth:true},
  },
  {
    path: '/',
    name: 'RegisterBefore',
    component:() => import('@/components/worke/RegisterBefore'),
    meta: {title:'注册',requireAuth:true},
  },
  {
    path: '/AnewRegister',
    name: 'AnewRegister',
    component:() => import('@/components/worke/AnewRegister'),
    meta: {title:'重新注册',requireAuth:true},
  },
  {
    path: '/RegisterServices',
    name: 'RegisterServices',
    component:() => import('@/components/worke/RegisterServices'),
    meta: {title:'添加服务',requireAuth:true},
  },
  {
    path: '/RegisterConfirm',
    name: 'RegisterConfirm',
    component:() => import('@/components/worke/RegisterConfirm'),
    meta: {title:'我的注册信息',requireAuth:true},
  },
  {
    path: '/Submit',
    name: 'Submit',
    component:() => import('@/components/worke/Submit'),
    meta: {title:'提交审核',requireAuth:true},
  },
  {
    path: '/Auditfailed',
    name: 'Auditfailed',
    component:() => import('@/components/worke/Auditfailed'),
    meta: {title:'审核未通过',requireAuth:true},
  },
  {
    path: '/Auditin',
    name: 'Auditin',
    component:() => import('@/components/worke/Auditin'),
    meta: {title:'审核中',requireAuth:true},
  },
  {
    path: '/AuditinTwo',
    name: 'AuditinTwo',
    component:() => import('@/components/worke/AuditinTwo'),
    meta: {title:'扫码进入审核中',requireAuth:true},
  },
  {
    path: '/Hxcode',
    name: 'Hxcode',
    component:() => import('@/components/worke/Hxcode'),
    meta: {title:'核销二维码',requireAuth:true},
  },
  {
    path: '/Hxver',
    name: 'Hxver',
    component:() => import('@/components/worke/Hxver'),
    meta: {title:'核销信息确认',requireAuth:true},
  },
  {
    path: '/Hxfill',
    name: 'Hxfill',
    component:() => import('@/components/worke/Hxfill'),
    meta: {title:'配件信息填写',requireAuth:true},
  },
  {
    path: '/Serveproject',
    name: 'Serveproject',
    component:() => import('@/components/worke/Serveproject'),
    meta: {title:'服务项目',requireAuth:true},
  },
  {
    path: '/Servecheck',
    name: 'Servecheck',
    component:() => import('@/components/worke/Servecheck'),
    meta: {title:'服务项目审核',requireAuth:true},
  },
  {
    path: '/Grabwin',
    name: 'Grabwin',
    component:() => import('@/components/worke/Grabwin'),
    meta: {title:'抢单成功',requireAuth:true},
  },
  {
    path: '/Grabloser',
    name: 'Grabloser',
    component:() => import('@/components/worke/Grabloser'),
    meta: {title:'抢单失败',requireAuth:true},
  },
  {
    path: '/Grablosertwo',
    name: 'Grablosertwo',
    component:() => import('@/components/worke/Grablosertwo'),
    meta: {title:'抢单失败',requireAuth:true},
  },
  {
    path: '/State',
    name: 'State',
    component:() => import('@/components/worke/State'),
    meta: {title:'提交申诉',requireAuth:true},
  },
  {
    path: '/Statein',
    name: 'Statein',
    component:() => import('@/components/worke/Statein'),
    meta: {title:'申诉',requireAuth:true},
  },
  {
    path: '/Addserve',
    name: 'Addserve',
    component:() => import('@/components/worke/Addserve'),
    meta: {title:'添加服务',requireAuth:true},
  },
  {
    path: '/Thisserve',
    name: 'Thisserve',
    component:() => import('@/components/worke/Thisserve'),
    meta: {title:'正在服务工单',requireAuth:true},
  },
  {
    path: '/Hasservicemoney',
    name: 'Hasservicemoney',
    component:() => import('@/components/worke/Hasservicemoney'),
    meta: {title:'已服务工单总金额',requireAuth:true},
  },
  {
    path: '/Nowservices',
    name: 'Nowservices',
    component:() => import('@/components/worke/Nowservices'),
    meta: {title:'现有的服务项目',requireAuth:true},
  },
  {
    path: '/Anomaly',
    name: 'Anomaly',
    component:() => import('@/components/worke/Anomaly'),
    meta: {title:'异常工单',requireAuth:true},
  },
  {
    path: '/AttentionVipce',
    name: 'AttentionVipce',
    component:() => import('@/components/worke/AttentionVipce'),
    meta: {title:'请先关注公众号',requireAuth:true},
  },
  //服务商端
  {
    path: '/Personservice',
    name: 'Personservice',
    component:() => import('@/components/service/Personservice'),
    meta: {title:'首页',requireAuth:true},
  },
  {
    path: '/Close',
    name: 'Close',
    component:() => import('@/components/service/Close'),
    meta: {title:'可结算金额',requireAuth:true},
  },
  {
    path: '/Withdraw',
    name: 'Withdraw',
    component:() => import('@/components/service/Withdraw'),
    meta: {title:'确认提现',requireAuth:true},
  },
  {
    path: '/Withsuccess',
    name: 'Withsuccess',
    component:() => import('@/components/service/Withsuccess'),
    meta: {title:'提现申请成功',requireAuth:true},
  },
  {
    path: '/Withdetail',
    name: 'Withdetail',
    component:() => import('@/components/service/Withdetail'),
    meta: {title:'提现明细',requireAuth:true},
  },
  {
    path: '/Mywork',
    name: 'Mywork',
    component:() => import('@/components/service/Mywork'),
    meta: {title:'我的工人',requireAuth:true},
  },
  {
    path: '/Workservice',
    name: 'Workservice',
    component:() => import('@/components/service/Workservice'),
    meta: {title:'已服务工单',requireAuth:true},
  },
  {
    path: '/servedOrder',
    name: 'servedOrder',
    component:() => import('@/components/service/servedOrder'),
    meta: {title:'工人详情',requireAuth:true},
  },
  {
    path: '/ServiceAnomaly',
    name: 'ServiceAnomaly',
    component:() => import('@/components/service/ServiceAnomaly'),
    meta: {title:'异常工单',requireAuth:true},
  },

  //大房东
  {
    path: '/BigMenu',
    component: () => import('@/components/bigland/BigMenu'),
    meta: {title:'BigMenu',requireAuth:true},
    children: [
      {
        path: '',
        component:() => import('@/components/bigland/Home'),
        meta: {title:'首页',requireAuth:true},
      },
      {
        path: '/BigMenu/Home',
        name: 'Home',
        component:() => import('@/components/bigland/Home'),
        meta: {title:'首页',requireAuth:true},
      },
      {
        path: '/BigMenu/BigPerson',
        name: 'BigPerson',
        component:() => import('@/components/bigland/BigPerson'),
        meta: {title:'个人中心',requireAuth:true},
      }
    ]
  },
  {
    path: '/CharterA',
    name: 'CharterA',
    component:() => import('@/components/bigland/CharterA'),
    meta: {title:'包租无忧A',requireAuth:true},
  },
  {
    path: '/CharterB',
    name: 'CharterB',
    component:() => import('@/components/bigland/CharterB'),
    meta: {title:'包租无忧B',requireAuth:true},
  },
  {
    path: '/CharterC',
    name: 'CharterC',
    component:() => import('@/components/bigland/CharterC'),
    meta: {title:'包租无忧C',requireAuth:true},
  },
  {
    path: '/Tryout',
    name: 'Tryout',
    component:() => import('@/components/bigland/Tryout'),
    meta: {title:'试用产品',requireAuth:true},
  },
  {
    path: '/Group',
    name: 'Group',
    component:() => import('@/components/bigland/Group'),
    meta: {title:'包租无忧组合',requireAuth:true},
  },
  {
    path: '/Servicedetail',
    name: 'Servicedetail',
    component:() => import('@/components/bigland/Servicedetail'),
    meta: {title:'服务明细',requireAuth:true},
  },
  {
    path: '/Inservice',
    name: 'Inservice',
    component:() => import('@/components/bigland/Inservice'),
    meta: {title:'服务中房屋',requireAuth:true},
  },
  {
    path: '/Quote',
    name: 'Quote',
    component:() => import('@/components/bigland/Quote'),
    meta: {title:'获取报价',requireAuth:true},
  },
  {
    path: '/Money',
    name: 'Money',
    component:() => import('@/components/bigland/Money'),
    meta: {title:'可结算金额',requireAuth:true},
  },
  {
    path: '/History',
    name: 'History',
    component:() => import('@/components/bigland/History'),
    meta: {title:'历史服务',requireAuth:true},
  },
  {
    path: '/BigWithdraw',
    name: 'BigWithdraw',
    component:() => import('@/components/bigland/BigWithdraw'),
    meta: {title:'大房东确认提现',requireAuth:true},
  },
 {
  path: '/GroupQuote',
  name: 'GroupQuote',
  component:() => import('@/components/bigland/GroupQuote'),
  meta: {title:'组合获取报价',requireAuth:true},
},
{
  path: '/Buy',
  name: 'Buy',
  component:() => import('@/components/bigland/Buy'),
  meta: {title:'已购买服务',requireAuth:true},
},
{
  path: '/client/PersonalCenter',
  name: 'PersonalCenter',
  component:() => import('@/components/client/PersonalCenter/PersonalCenter'),
  meta: {title:'个人中心',requireAuth:true},
},
{
  path: '/client/ServiceDetail',
  name: 'ServiceDetail',
  component:() => import('@/components/client/ServiceDetail/ServiceDetail'),
  meta: {title:'服务信息确认',requireAuth:true},
},
  // {
  //   path: '*',
  //   component:() => import('@/components/bigland/BigPerson'),
  //   meta: {title:'公用',requireAuth:true},
  // },
]
const router = new Router({
  // mode : 'history',
  routes
});

router.beforeEach((to , from , next) => {
  if(to.meta.title){
    document.title =to.meta.title;
    //每个页面都请求用户信息 验证token是否过期
    // console.log('router运行')
    // let hasToken = localStorage.getItem('tokens');

    // if(!hasToken){
    //   // console.log('没有Token')
    //   // 登录先获取token
    //   console.log(BASE_URL + '/api/get_access_token')
    //   Axios.get(BASE_URL + '/api/get_access_token').then((res)=>{
    //     res.data.expires_at = new Date().getTime() + (res.data.expires_in-20) * 1000;
    //     localStorage.setItem("tokens",JSON.stringify(res.data));
    //   })
    // }else{
    //   // console.log('有token')
    //   // let t = JSON.parse(localStorage.getItem('tokens')).expires_in * 1000;
    //   let now_t = new Date().getTime(); //当前时间
    //   let expires_at = JSON.parse(localStorage.getItem("tokens")).expires_at //过期时间
    //   // console.log(now_t)
    //   // console.log(expires_at)
    //   if(expires_at <= now_t){
    //     // console.log('过期')
    //     //tokens过期了
    //     Axios.get(BASE_URL + '/api/get_access_token').then((res)=>{
    //       res.data.expires_at = new Date().getTime() + (res.data.expires_in-20) * 1000;
    //       localStorage.setItem("tokens",JSON.stringify(res.data));
    //     })
    //   }else{
    //     // console.log('没有过期')
    //   }
    // }
  }
  next()
})

export default router;
