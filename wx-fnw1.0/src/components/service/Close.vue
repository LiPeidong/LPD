<template>
  <div class="Person">
    <!-- 可结算金额 -->
    <div class="Person_class">
        <div class="Person_classleft">
            <p>已服务总金额</p>
            <h2>{{totalSelfServicePrice}}<span> 元</span></h2>
        </div>
        <div class="Person_classleft" :style="{'visibility':showWithdraw}">
            <p @click="bringDetail">提现明细</p>
            <div class="closetx" @click="bringCash">提现</div>
        </div>
    </div>
    <div class="incomeType">
      <ul style="display:flex; justify-content:space-around;">
        <li v-for="(item,index) in work_list" :key="index" @click="incomeType(index,$event)">
          <span ref="content" :class="{incomeActive:incomeActive==index}">{{item}}</span>
        </li>
      </ul>
    </div>
     <div class="Hasservice_tab">
         <ul>
          <li  v-for="(item,index) in tab" :class="{active:active==index}" @click="closetab(index)" :key="index">{{item.data}}</li>
        </ul>
        <div class="Hasservice_fl">
             <div class="Hasservice_dat">
              <p>服务次数</p>
              <span>{{showServiceNum}}</span>
            </div>
            <div class="Hasservice_dat">
              <p>服务金额</p>
              <span>{{showPrice}}</span>
            </div>
        </div>
    </div>
    <div class="closelist"  v-for="(item,index) of showList" :key="index">
      <div class="closeflex">
        <div class="closeimg">
          <img src="../../assets/images/mt.jpg" alt="">
        </div>
        <div class="closetext">
          <div style="display:flex;justify-content:space-between;">
            <h3>{{item.service_type}}</h3>
            <p>{{item.end_at}}</p>
          </div>

          <p>{{item.address}}</p>
          <span>{{item.workername}}</span>
        </div>
      </div>
      <p class="closep">结算收入：<span>&yen; {{item.price}}</span></p>
    </div>
  </div>
</template>

<script>
  import BASE_URL from "../../constants";
  import axios from "axios"
export default {
  name: 'Close',
   data() {
    return {
      totalSelfServicePrice:0,
      active:0,
      incomeActive:0,
      show:false,
      showWithdraw:'hidden',
      tab:[
        {data:'今日'},
        {data:'近7日'},
        {data:'近30日'},
        {data:'全部'},
      ],
      work_list:["已服务总金额","已服务自营单金额","已服务平台单金额"],
      service_provider_id:null,
      serviceProviderFinishCards:null,
      showServiceNum:0,
      showPrice:0,
      resData:null,
      showList:null  //展示的列表
    }
  },
  methods:{
    // request(days){
    //   console.log(this.service_provider_id)
    //   if (days != 100){
    //   axios.post(BASE_URL + "/api/get_service_provider_money_detail", {
    //     service_provider_id: this.service_provider_id,
    //     day:days
    //   })
    //     .then(function (response) {
    //       console.log(response);
    //
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    //   }else {
    //     axios.post(BASE_URL + "/api/get_service_provider_money_detail", {
    //       service_provider_id: this.service_provider_id
    //     })
    //       .then(function (response) {
    //         console.log(response);
    //       })
    //       .catch(function (error) {
    //         console.log(error);
    //       });
    //   }
    // },
    closetab(index){  //点击天数的ajax请求
      this.globalToast = this.$toast.loading({
        duration: 0, // 持续展示 toast
        mask: true, //背景层
        forbidClick: true, // 禁用背景点击
        message: "加载中..."
      });
      var days = 0;
      this.active = index;
      switch(this.active){
            case 0:
              days = 1
              break
            case 1:
              days = 7
              break
            case 2:
              days = 30
              break
            case 3:
              days = 100
              break
          }
      // this.$options.methods.request(days);
      if(days!=100){
      this.$http
        .post(BASE_URL + "/api/get_service_provider_money_detail", {
          service_provider_id: this.service_provider_id,
          day:days
        })
        .then(res => {
          console.log(res)
          this.resData = res.data
          switch(this.incomeActive){
            case 0:
            this.showList = this.resData.serviceProviderFinishCards;
            this.showServiceNum = this.resData.serviceProviderFinishCardsCount;
            this.showPrice = this.resData.totalServicePrice;
            break
            case 1:
            this.showList = this.resData.serviceProviderFinishCardsSelf;
            this.showServiceNum = this.resData.serviceProviderFinishCardsSelfCount;
            this.showPrice = this.resData.totalSelfServicePrice;
            break
            case 2:
            this.showList = this.resData.serviceProviderFinishCardsClient;
            this.showServiceNum = this.resData.serviceProviderFinishCardsClientCount;
            this.showPrice = this.resData.totalClientServicePrice;
          }
          this.totalSelfServicePrice = res.data.totalSelfServicePrice;
          this.serviceProviderFinishCards = res.data.serviceProviderFinishCards;
          this.globalToast.clear();
        })
        .catch(err => {
          console.log(err);
          return false;
        });
      }
      else{
        this.$http
        .post(BASE_URL + "/api/get_service_provider_money_detail", {
          service_provider_id: this.service_provider_id
        })
        .then(res => {
          console.log(res)
          this.resData = res.data
          switch(this.incomeActive){
            case 0:
            this.showList = this.resData.serviceProviderFinishCards;
              this.showServiceNum = this.resData.serviceProviderFinishCardsCount;
              this.showPrice = this.resData.totalServicePrice;
            break
            case 1:
            this.showList = this.resData.serviceProviderFinishCardsSelf;
              this.showServiceNum = this.resData.serviceProviderFinishCardsSelfCount;
              this.showPrice = this.resData.totalSelfServicePrice;
            break
            case 2:
            this.showList = this.resData.serviceProviderFinishCardsClient;
              this.showServiceNum = this.resData.serviceProviderFinishCardsClientCount;
              this.showPrice = this.resData.totalClientServicePrice;
          }
          this.totalSelfServicePrice = res.data.totalSelfServicePrice;
          this.serviceProviderFinishCards = res.data.serviceProviderFinishCards;
          this.globalToast.clear();
        })
        .catch(err => {
          console.log(err);
          return false;
        });
      }
    },
    incomeType(index){ //在收入类型变更时，自己进行处理
      this.incomeActive = index
      if(index==2) this.showWithdraw='visible'
      else this.showWithdraw = 'hidden'
      switch(this.incomeActive){
        case 0:
        this.showList = this.resData.serviceProviderFinishCards;
          this.showServiceNum = this.resData.serviceProviderFinishCardsCount;
          this.showPrice = this.resData.totalServicePrice;
        break
        case 1:
        this.showList = this.resData.serviceProviderFinishCardsSelf;
          this.showServiceNum = this.resData.serviceProviderFinishCardsSelfCount;
          this.showPrice = this.resData.totalSelfServicePrice;
        break;
        case 2:
        this.showList = this.resData.serviceProviderFinishCardsClient;
          this.showServiceNum = this.resData.serviceProviderFinishCardsClientCount;
          this.showPrice = this.resData.totalClientServicePrice;
      }
    },
    bringDetail(){
      this.$router.push({
        name:'Withdetail'
      })
    },
    bringCash(){
      this.$router.push({
        name:'Withdraw'
      })
    }
  },
  created() {
    this.globalToast = this.$toast.loading({
      duration: 0, // 持续展示 toast
      mask: true, //背景层
      forbidClick: true, // 禁用背景点击
      message: "加载中..."
    });
    this.service_provider_id=this.$route.query.service_provider_id
    this.$http
      .post(BASE_URL + "/api/get_service_provider_money_detail", {
        service_provider_id: this.service_provider_id,
        day:1
      })
      .then(res => {
        console.log(res);
        this.resData = res.data
        this.showList = res.data.serviceProviderFinishCards;
        this.totalClientServicePrice = res.data.totalClientServicePrice;
        this.serviceProviderFinishCards = res.data.serviceProviderFinishCards;
        this.showServiceNum=this.showList.length;
        this.totalServicePrice = res.data.totalServicePrice;
        this.globalToast.clear();
      })
      .catch(err => {
        console.log(err);
      });
  }
}
</script>
<style scoped>
  .showWithdraw{visibility:hidden}
  .incomeActive{ color: #499ef0;border-bottom:1px solid #499ef0;padding-bottom:7px;}
  .incomeType{padding:4px 0;height:22px;line-height:22px;background-color:#fff;border-top:1px solid #c7c7c7;font-size:13px}
  .incomeType ul li:nth-child(2){padding:0 11px;border-left:1px solid #c7c7c7;border-right:1px solid #c7c7c7}
  .Person{background:#f5f5f5;height: 100%;}
  .Person_class{display: flex;justify-content:space-between;background: #fff;padding: 0 14px;padding-bottom:19px;heitght:94px}
  .Person_class .Person_classleft h2{color: #ff8431;font-size: 24px;}
  .Person_class .Person_classleft h2 span{font-size: 12px;}
  .Person_class .Person_classleft p{font-size: 14px;margin: 18px 0 13px 0;}
  .van-tabbar-item--active{color: #499ef0;}
  .van-popup{font-size: 25px;padding: 10px}
  .Hasservice_tab>ul{display: flex; height: 25px;border:1px solid #499ef0;border-radius: 25px;}
  .Hasservice_tab{padding: 10px 10px 0 10px;background: #fff;margin-top: 10px;}
  .Hasservice_tab>ul>li{flex-grow:1;line-height: 25px;color: #499ef0;font-size: 13px;font-family: PingFangSC-Regular;}
  .Hasservice_tab>ul>li:nth-child(1){border-radius: 25px 0 0 25px;}
  .Hasservice_tab>ul>li:nth-child(4){border-radius: 0 25px 25px 0;}
  .Hasservice_tab>ul>li:nth-child(2){border-left:1px solid #499ef0;border-right:1px solid #499ef0;}
  .Hasservice_tab>ul>li:nth-child(3){border-right:1px solid #499ef0;}
  .Hasservice_fl{display: flex;justify-content:space-around;font-size: 12px;color: #333;padding: 20px 0;}
  .Hasservice_fl .Hasservice_dat p{padding-bottom: 10px;}
  .Hasservice_fl .Hasservice_dat span{font-size: 14px;color: #499ef0;}
  .active{background: #499ef0;color: #fff !important;}
  .closetx{background:#499ef0;color: #fff;width: 100px;height: 30px;	border-radius: 15px;line-height: 30px;}
  .closelist{background:#fff;margin: 10px 10px 0 10px;border-radius: 10px;}
  .closeflex{display: flex;border-bottom: 1px solid #c7c7c7;padding: 10px;}
  .closeimg{width: 48px;height: 48px;border: solid 1px #c7c7c7;padding:10px;}
  .closeimg img{width: 48px;height: 48px;}
  .closetext{text-align: left;margin-left: 12px;line-height: 22px;font-size: 12px;width:100%;}
  .closetext h3{font-size: 14px;font-weight: bold;}
  .closetext span{border-radius: 15px;background: #61c161;font-size: 10px;color: #fff;text-align: center;display:inline-block;-webkit-transform:scale(1); padding: 0 15px;}
  .closep{text-align: right ;padding:13px 10px 13px 0;font-size: 12px;}
  .closep span{font-size: 18px;color:#499ef0; }
</style>
