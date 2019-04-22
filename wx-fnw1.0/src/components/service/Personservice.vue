<template>
  <div class="Person">
    <!-- 首页 -->
      <div class="Person_header">
          <div class="Person_headerimg">
            <div class="Person_headerimgo">
              <img :src="url+img_path" alt="">
            </div>
            <div class="Person_headerimgtext">
              <p>{{contactor}}</p>
            </div>
          </div>
      </div>
      <div class="Person_class">
          <div class="Person_classleft" @click="Has_service">
              <h2>{{servicemoney}}<span>单</span></h2>
              <p>已服务工单</p>
          </div>
          <div class="Person_classleft" @click="closeMoney">
              <h2>{{totalServicePrice}}<span>元</span></h2>
              <p>已服务总金额</p>
          </div>
      </div>
      <div class="Person_li">
         <ul>
           <li>
             <router-link :to="{path:'/Mywork',query:{service_provider_id:service_provider_id}}">
                 <img src="../../assets/images/mygr.jpg" alt="">
                 <p>我的工人</p>
             </router-link>
           </li>
           <li>
             <router-link :to="{path:'/AddWorker'}">
               <img src="../../assets/images/Addworker.png" alt="">
               <p>添加工人</p>
             </router-link>
           </li>
             <li>
                <div @click="mistake">
                  <img src="../../assets/images/个人中心_09.jpg" alt="">
                  <p>异常工单</p>
               </div>
           </li>
             <li>
               <a :href='"tel:"+phone'>
                 <img src="../../assets/images/个人中心_11.jpg" alt>
                 <p>联系客服</p>
               </a>
           </li>
         </ul>
      </div>
     <div class="Home_project">
      <ul>
        <li>
          <h2>热卖产品<span>优选精品</span></h2>
          <ul>
            <li><img src="../../assets/images/雇主保.jpg" alt=""></li>
            <li><img src="../../assets/images/金锁保banner.jpg" alt=""></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import BASE_URL from "../../constants";
export default {
  name: 'Personservice',
   data() {
    return {
      active:0,
      contactor:'服务商',
      servicemoney:'0',//已服务工单总数
      img_path:'',
      img_url:'../../assets/images/tx.jpg',
      url:'http://testimg.funlifeday.com/',
      totalServicePrice:'0',
      service_provider_id:'',
      phone:''
    }
  },
  created(){
    this.globalToast = this.$toast.loading({
      duration: 0, // 持续展示 toast
      mask: true, //背景层
      forbidClick: true, // 禁用背景点击
      message: "加载中..."
    });
    this.service_provider_id = this.$route.query.service_provider_id;
    this.$http.get(BASE_URL + "/api/get_access_token").then(res => {
        res.data.expires_at =
          new Date().getTime() + (res.data.expires_in - 20) * 1000;
        localStorage.setItem("tokens", JSON.stringify(res.data));
        this.globalToast.clear();
      this.globalToast = this.$toast.loading({
        duration: 0, // 持续展示 toast
        mask: true, //背景层
        forbidClick: true, // 禁用背景点击
        message: "加载中..."
      });
      this.$http
        .post(BASE_URL + "/api/get_service_provider_info", {
          service_provider_id: this.service_provider_id
        })
        .then(res => {
          console.log(res);
          this.phone = res.data.phone;
          this.contactor = res.data.contactor;
          this.servicemoney = res.data.serviceProviderFinishCardsCount;
          this.img_path = res.data.img_path;
          this.totalServicePrice = res.data.totalServicePrice.toFixed(2);
          localStorage.setItem('qr_img', res.data.add_qr);
          this.globalToast.clear();
        })
        .catch(err => {
          this.globalToast.clear();
          this.$dialog
            .alert({
              message: "系统繁忙，请稍后再试!"
            })
        });
      localStorage.setItem('service_provider_id',this.service_provider_id);
    }).catch(err => {
      this.globalToast.clear();
      this.$dialog
        .alert({
          message: "系统繁忙，请稍后再试!"
        })
    });
  },
  mounted(){

  },
  methods:{
    Has_service(){
     this.$router.push({
       name:'Workservice'
     })
    },
    closeMoney(){
      this.$router.push({
        name:'Close',
        query:{
          service_provider_id:this.service_provider_id
        }
      })
    },
    mistake(){
     this.$router.push({
       path : '/ServiceAnomaly'
     })
    }
  }
}
</script>
<style scoped>
  .Person{background:#f5f5f5;height: 100%;}
  .Person_header{background:#499ef0;}
  .Person_header .Person_headerimg .Person_headerimgo>img{width: 65px;margin: 10px 18px 10px 26px;height:65px;border-radius: 50%;}
  .Person_headerimg{display: flex;}
  .Person_headerimgtext P{font-size: 18px;color: #fff;line-height: 80px;}
   .Person_class{display: flex;justify-content:space-around;background: #fff;margin-top: 10px;}
    .Person_class .Person_classleft h2{color: #ff8431;font-size: 24px;margin: 17px 0 12px 0;}
    .Person_class .Person_classleft h2 span{color: #ff8431;font-size: 12px;}
    .Person_class .Person_classleft p{font-size: 14px;margin-bottom: 18px;}
    .Person_l{display: flex;justify-content:space-between;margin: 10px 0;}
    .Person_l p:nth-child(2){padding-right: 30px;color: #ff8431;font-size: 13px;}
  .Person_li{margin-top: 10px;}
    .Person_li>ul{display: flex;justify-content:space-around;}
    .Person_li>ul>li img{width: 43px;margin: 10px 0;}
    .Person_li{background:#fff;top: -17px;}
    .Person_li>ul>li p{font-size: 13px;margin-bottom: 10px;color: #333;}
    .van-tabbar-item--active{color: #499ef0;}
    .van-popup{font-size: 25px;padding: 10px}
  .Home_project>ul>li>h2{text-align: left;font-size: 15px;font-weight: bold;padding-bottom: 9px;}
  .Home_project>ul>li>h2>span{font-size: 12px;margin-left: 15px;color: #c7c7c7;font-weight: normal;}
  .Home_project>ul>li{
    background: #fff;
    padding: 10px 12px 0 12px;
    margin-top: 10px;
  }
  .Home_project>ul>li img {
    width: 100%;
  }
  .Home_project{margin-bottom:50px;}
  .Home_project>ul>li>ul>li{padding-bottom:10px;}
</style>
