import Vue from 'vue'
import Router from 'vue-router'
import BASE_URL from '../constants'
import Axios from 'axios'

Vue.use(Router)

var routes = [
  //工人端
  {
    path: '/menu',
    component:resolve => require(['@/components/worke/Menu'],resolve),
    meta: {title:'menu',requireAuth:true},
    children: [
      {
        path: '',
        name: 'Grabsingle1',
        component:resolve => require(['@/components/worke/Menu'],resolve),
        meta: {title:'抢单池',requireAuth:true},
      },
      {
        path: '/menu/Grabsingle',
        name: 'Grabsingle',
        component:resolve => require(['@/components/worke/Grabsingle'],resolve),
        meta: {title:'抢单池',requireAuth:true},
      },
      {
        path: '/menu/Person',
        name: 'Person',
        component:resolve => require(['@/components/worke/Person'],resolve),
        meta: {title:'个人中心',requireAuth:true},
      }
    ]
  },
  {
    path: '/Workdetails',
    name: 'Workdetails',
    component:resolve => require(['@/components/worke/Workdetails'],resolve),
    meta: {title:'工单详情',requireAuth:true},
  },
  {
    path: '/Hasservice',
    name: 'Hasservice',
    component:resolve => require(['@/components/worke/Hasservice'],resolve),
    meta: {title:'已服务工单',requireAuth:true,keepAlive:true,isBack:false},
  },
  {
    path: '/Rate',
    name: 'Rate',
    component:resolve => require(['@/components/worke/Rate'],resolve),
    meta: {title:'评价',requireAuth:true},
  },
  {
    path: '/Register',
    name: 'Register',
    component:resolve => require(['@/components/worke/Register'],resolve),
    meta: {title:'注册列表',requireAuth:true},
  },
  {
    path: '/',
    name: 'RegisterBefore',
    component:resolve => require(['@/components/worke/RegisterBefore'],resolve),
    meta: {title:'注册',requireAuth:true},
  },
  {
    path: '/AnewRegister',
    name: 'AnewRegister',
    component:resolve => require(['@/components/worke/AnewRegister'],resolve),
    meta: {title:'重新注册',requireAuth:true},
  },
  {
    path: '/RegisterServices',
    name: 'RegisterServices',
    component:resolve => require(['@/components/worke/RegisterServices'],resolve),
    meta: {title:'添加服务',requireAuth:true},
  },
  {
    path: '/RegisterConfirm',
    name: 'RegisterConfirm',
    component:resolve => require(['@/components/worke/RegisterConfirm'],resolve),
    meta: {title:'我的注册信息',requireAuth:true},
  },
  {
    path: '/Submit',
    name: 'Submit',
    component:resolve => require(['@/components/worke/Submit'],resolve),
    meta: {title:'提交审核',requireAuth:true},
  },
  {
    path: '/Auditfailed',
    name: 'Auditfailed',
    component:resolve => require(['@/components/worke/Auditfailed'],resolve),
    meta: {title:'审核未通过',requireAuth:true},
  },
  {
    path: '/Auditin',
    name: 'Auditin',
    component:resolve => require(['@/components/worke/Auditin'],resolve),
    meta: {title:'审核中',requireAuth:true},
  },
  {
    path: '/AuditinTwo',
    name: 'AuditinTwo',
    component:resolve => require(['@/components/worke/AuditinTwo'],resolve),
    meta: {title:'扫码进入审核中',requireAuth:true},
  },
  {
    path: '/Hxcode',
    name: 'Hxcode',
    component:resolve => require(['@/components/worke/Hxcode'],resolve),
    meta: {title:'核销二维码',requireAuth:true},
  },
  {
    path: '/Hxver',
    name: 'Hxver',
    component:resolve => require(['@/components/worke/Hxver'],resolve),
    meta: {title:'核销信息确认',requireAuth:true},
  },
  {
    path: '/HxBig',
    name: 'HxBig',
    component:resolve => require(['@/components/worke/HxBig'],resolve),
    meta: {title:'核销信息确认',requireAuth:true},
  },
  {
    path: '/Hxfill',
    name: 'Hxfill',
    component:resolve => require(['@/components/worke/Hxfill'],resolve),
    meta: {title:'配件信息填写',requireAuth:true},
  },
  {
    path: '/Serveproject',
    name: 'Serveproject',
    component:resolve => require(['@/components/worke/Serveproject'],resolve),
    meta: {title:'服务项目',requireAuth:true},
  },
  {
    path: '/Servecheck',
    name: 'Servecheck',
    component:resolve => require(['@/components/worke/Servecheck'],resolve),
    meta: {title:'服务项目审核',requireAuth:true},
  },
  {
    path: '/Grabwin',
    name: 'Grabwin',
    component:resolve => require(['@/components/worke/Grabwin'],resolve),
    meta: {title:'抢单成功',requireAuth:true},
  },
  {
    path: '/Grabloser',
    name: 'Grabloser',
    component:resolve => require(['@/components/worke/Grabloser'],resolve),
    meta: {title:'抢单失败',requireAuth:true},
  },
  {
    path: '/Grablosertwo',
    name: 'Grablosertwo',
    component:resolve => require(['@/components/worke/Grablosertwo'],resolve),
    meta: {title:'抢单失败',requireAuth:true},
  },
  {
    path: '/State',
    name: 'State',
    component:resolve => require(['@/components/worke/State'],resolve),
    meta: {title:'提交申诉',requireAuth:true},
  },
  {
    path: '/Statein',
    name: 'Statein',
    component:resolve => require(['@/components/worke/Statein'],resolve),
    meta: {title:'申诉',requireAuth:true},
  },
  {
    path: '/Addserve',
    name: 'Addserve',
    component:resolve => require(['@/components/worke/Addserve'],resolve),
    meta: {title:'添加服务',requireAuth:true},
  },
  {
    path: '/Thisserve',
    name: 'Thisserve',
    component:resolve => require(['@/components/worke/Thisserve'],resolve),
    meta: {title:'正在服务工单',requireAuth:true},
  },
  {
    path: '/Hasservicemoney',
    name: 'Hasservicemoney',
    component:resolve => require(['@/components/worke/Hasservicemoney'],resolve),
    meta: {title:'已服务工单总金额',requireAuth:true,keepAlive:true,isBack:false},
  },
  {
    path: '/Nowservices',
    name: 'Nowservices',
    component:resolve => require(['@/components/worke/Nowservices'],resolve),
    meta: {title:'现有的服务项目',requireAuth:true},
  },
  {
    path: '/Anomaly',
    name: 'Anomaly',
    component:resolve => require(['@/components/worke/Anomaly'],resolve),
    meta: {title:'异常工单',requireAuth:true},
  },
  {
    path: '/AttentionVipce',
    name: 'AttentionVipce',
    component:resolve => require(['@/components/worke/AttentionVipce'],resolve),
    meta: {title:'请先关注公众号',requireAuth:true},
  },
  //服务商端
  {
    path: '/Personservice',
    name: 'Personservice',
    component:resolve => require(['@/components/service/Personservice'],resolve),
    meta: {title:'首页',requireAuth:true},
  },
  {
    path: '/Close',
    name: 'Close',
    component:resolve => require(['@/components/service/Close'],resolve),
    meta: {title:'可结算金额',requireAuth:true},
  },
  {
    path: '/Withdraw',
    name: 'Withdraw',
    component:resolve => require(['@/components/service/Withdraw'],resolve),
    meta: {title:'确认提现',requireAuth:true},
  },
  {
    path: '/Withsuccess',
    name: 'Withsuccess',
    component:resolve => require(['@/components/service/Withsuccess'],resolve),
    meta: {title:'提现申请成功',requireAuth:true},
  },
  {
    path: '/Withdetail',
    name: 'Withdetail',
    component:resolve => require(['@/components/service/Withdetail'],resolve),
    meta: {title:'提现明细',requireAuth:true},
  },
  {
    path: '/Mywork',
    name: 'Mywork',
    component:resolve => require(['@/components/service/Mywork'],resolve),
    meta: {title:'我的工人',requireAuth:true},
  },
  {
    path: '/Workservice',
    name: 'Workservice',
    component:resolve => require(['@/components/service/Workservice'],resolve),
    meta: {title:'已服务工单',requireAuth:true},
  },
  {
    path: '/servedOrder',
    name: 'servedOrder',
    component:resolve => require(['@/components/service/servedOrder'],resolve),
    meta: {title:'工人详情',requireAuth:true},
  },
  {
    path: '/ServiceAnomaly',
    name: 'ServiceAnomaly',
    component:resolve => require(['@/components/service/ServiceAnomaly'],resolve),
    meta: {title:'异常工单',requireAuth:true},
  },
  {
    path: '/AddWorker',
    name: 'AddWorker',
    component:resolve => require(['@/components/service/AddWorker'],resolve),
    meta: {title:'添加工人',requireAuth:true},
  },
  //大房东
  {
    path: '/BigMenu',
    component:resolve => require(['@/components/bigland/BigMenu'],resolve),
    meta: {title:'BigMenu',requireAuth:true},
    children: [
      {
        path: '',
        component:resolve => require(['@/components/bigland/Home'],resolve),
        meta: {title:'首页',requireAuth:true},
      },
      {
        path: '/BigMenu/Home',
        name: 'Home',
        component:resolve => require(['@/components/bigland/Home'],resolve),
        meta: {title:'首页',requireAuth:true},
      },
      {
        path: '/BigMenu/BigPerson',
        name: 'BigPerson',
        component:resolve => require(['@/components/bigland/BigPerson'],resolve),
        meta: {title:'个人中心',requireAuth:true},
      }
    ]
  },
  {
    path: '/CharterA',
    name: 'CharterA',
    component:resolve => require(['@/components/bigland/CharterA'],resolve),
    meta: {title:'包租无忧A',requireAuth:true},
  },
  {
    path: '/CharterB',
    name: 'CharterB',
    component:resolve => require(['@/components/bigland/CharterB'],resolve),
    meta: {title:'包租无忧B',requireAuth:true},
  },
  {
    path: '/CharterC',
    name: 'CharterC',
    component:resolve => require(['@/components/bigland/CharterC'],resolve),
    meta: {title:'包租无忧C',requireAuth:true},
  },
  {
    path: '/Luxury',
    name: 'Luxury',
    component:resolve => require(['@/components/bigland/Luxury'],resolve),
    meta: {title:'豪华套餐',requireAuth:true},
  },
  {
    path: '/Tryout',
    name: 'Tryout',
    component:resolve => require(['@/components/bigland/Tryout'],resolve),
    meta: {title:'试用产品',requireAuth:true},
  },
  {
    path: '/Group',
    name: 'Group',
    component:resolve => require(['@/components/bigland/Group'],resolve),
    meta: {title:'包租无忧组合',requireAuth:true},
  },
  {
    path: '/Servicedetail',
    name: 'Servicedetail',
    component:resolve => require(['@/components/bigland/Servicedetail'],resolve),
    meta: {title:'服务明细',requireAuth:true},
  },
  {
    path: '/Inservice',
    name: 'Inservice',
    component:resolve => require(['@/components/bigland/Inservice'],resolve),
    meta: {title:'服务中房屋',requireAuth:true},
  },
  {
    path: '/Quote',
    name: 'Quote',
    component:resolve => require(['@/components/bigland/Quote'],resolve),
    meta: {title:'获取报价',requireAuth:true},
  },
  {
    path: '/Money',
    name: 'Money',
    component:resolve => require(['@/components/bigland/Money'],resolve),
    meta: {title:'可结算金额',requireAuth:true},
  },
  {
    path: '/History',
    name: 'History',
    component:resolve => require(['@/components/bigland/History'],resolve),
    meta: {title:'历史服务',requireAuth:true},
  },
  {
    path: '/BigWithdraw',
    name: 'BigWithdraw',
    component:resolve => require(['@/components/bigland/BigWithdraw'],resolve),
    meta: {title:'大房东确认提现',requireAuth:true},
  },
  {
    path: '/GroupQuote',
    name: 'GroupQuote',
    component:resolve => require(['@/components/bigland/GroupQuote'],resolve),
    meta: {title:'组合获取报价',requireAuth:true},
  },
 {
  path: '/Buy',
  name: 'Buy',
   component:resolve => require(['@/components/bigland/Buy'],resolve),
  meta: {title:'已购买服务',requireAuth:true},
},
  {
    path: '/Btnsucceed',
    name: 'Btnsucceed',
    component:resolve => require(['@/components/bigland/Btnsucceed'],resolve),
    meta: {title:'信息提交',requireAuth:true},
  },
  //大房东租客
  {
    path: '/CallService',
    name: 'CallService',
    component:resolve => require(['@/components/client/CallService'],resolve),
    meta: {title:'呼叫服务',requireAuth:true},
  },
  {
    path: '/CallIndex',
    name: 'CallIndex',
    component:resolve => require(['@/components/client/CallIndex'],resolve),
    meta: {title:'呼叫地址',requireAuth:true},
  },
  {
    path: '/userService',
    name: 'userService',
    component:resolve => require(['@/components/client/userService'],resolve),
    meta: {title:'服务详情',requireAuth:true},
  },
  {
    path: '/HistoricalService',
    name: 'HistoricalService',
    component:resolve => require(['@/components/client/HistoricalService'],resolve),
    meta: {title:'历史服务',requireAuth:true},
  },
  {
    path: '/client/PersonalCenter',
    name: 'PersonalCenter',
    component:resolve => require(['@/components/client/PersonalCenter/PersonalCenter'],resolve),
    meta: {title:'个人中心',requireAuth:true},
  },
  {
    path: '/client/ServiceDetail',
    name: 'ServiceDetail',
    component:resolve => require(['@/components/client/ServiceDetail/ServiceDetail'],resolve),
    meta: {title:'服务信息确认',requireAuth:true},
  },
  {
    path: '/client/Callsucceed',
    name: 'Callsucceed',
    component:resolve => require(['@/components/client/Callsucceed'],resolve),
    meta: {title:'呼叫成功',requireAuth:true},
  },
  {
    path: '/client/FreeService',
    name: 'FreeService',
    component:resolve => require(['@/components/client/FreeService/index'],resolve),
    meta: {title:'免费服务',requireAuth:true}
  },
  {
    path: '/client/PriceReference',
    name: 'PriceReference',
    component:resolve => require(['@/components/client/PriceReference/index'],resolve),
    meta: {title:'价格参考',requireAuth:true}
  },
  {
    path: '/client/Parts',
    name: 'Parts',
    component:resolve => require(['@/components/client/Parts/index'],resolve),
    meta: {title:'配件信息',requireAuth:true}
  }
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
