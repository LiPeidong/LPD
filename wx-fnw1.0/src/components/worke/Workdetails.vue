<template>
  <div class="Workdetails_bg">
    <!-- 工单详情 -->
    <div class="Workdetails_header">
      <P>{{service}}</P>
      <div class="grade" id="remark2">
        <van-rate v-model="rate" :size="25" :count="5" color="#ffa800" readonly v-if="rate" void-color="#ffa800"/>
        <van-rate v-model="rate" :size="25" :count="0" color="#ffa800" readonly v-else void-color="#ffa800"/>
        <div class="remark"  v-for="item in rate_info" v-if="rate_info.length != 0">
          <span v-for="j in item">{{j.name}}</span>
        </div>
      </div>
    </div>
    <div class="Workdetails_details">
      <p>卡卷编码：{{card_id}}</p>
      <p>用户名称：{{username}}</p>
      <p>用户电话：{{phone.substring(0,3)+"XXXX"+phone.substring(7,11)}}</p>
      <p>用户地址：{{address.substring(0,9)+"XXXXXXX"}}</p>
      <p>工单状态：{{status}}</p>
    </div>
    <div class="Workdetails_details">
      <p>接单时间：{{worker_service_start_at}}</p>
      <p>完成时间：{{worker_service_end_at}}</p>
    </div>
    <div class="Workdetails_details service">
      <div class="sercenter">
        <span>维修费用：</span>
        <span class="sercolor">&yen;{{price}}</span>
      </div>
      <!--<div class="sercenter" v-show="rewardData">-->
        <!--<span>五星奖励：</span>-->
        <!--<span class="sercolor">+&yen;{{reward}}</span>-->
      <!--</div>-->
    </div>
    <div class="Workdetails_details sum">
      <p>总收入：
        <span class="sercolor">&yen;{{total}}</span>
      </p>
    </div>
  </div>
</template>

<script>
import BASE_URL from "../../constants";

export default {
  name: "Workdetails",
  data() {
    return {
      rate: null,
      // rewardData:false,
      price: 134.0,
      // reward: 10.0,
      total: '',
      card_id: '',
      username:'',
      phone:'',
      address:'',
      status:'',
      worker_service_start_at:'',
      worker_service_end_at:'',
      rate_info:[],
      service:''
    };
  },
  created() {
    this.globalToast = this.$toast.loading({
      duration: 0, // 持续展示 toast
      mask: true, //背景层
      forbidClick: true, // 禁用背景点击
      message: "加载中..."
    });
    this.card_id = this.$route.query.card_id;
    this.$http
      .post(BASE_URL + "/api/get_finish_card_detail", {
       card_id: this.card_id,
        open_id : localStorage.getItem('call_open_id')
      })
      .then(res => {
       this.address=res.data.card.address;
       this.username=res.data.card.username;
       this.price=res.data.card.price.toFixed(2);
       // this.reward=res.data.card.reward;
       this.total=res.data.card.total.toFixed(2);
        this.phone=res.data.card.phone;
        this.status=res.data.card.status;
       this.worker_service_start_at=res.data.card.worker_service_start_at;
       this.worker_service_end_at=res.data.card.worker_service_end_at;
       this.rate = res.data.card.rate;
       this.rate_info = res.data.card.rate_info;
       this.service = res.data.card.service_type;
       if (this.rate_info.length<=0){
         document.getElementById('remark2').className='line_height82px';
       }
       // if (this.reward){
       //   this.rewardData = true;
       // }else {
       //   this.rewardData = false;
       // }
        this.globalToast.clear();
      })
      .catch(err => {
        this.globalToast.clear();
        console.log(err)
        this.$dialog
          .alert({
            message: "系统繁忙，请稍后再试!"
          })
      });
  }
};
</script>
<style>
  .line_height82px{line-height: 72px;}
.Workdetails_bg {
  height: 100%;
  color: #333333;
  background: #f5f5f5;
}
.Workdetails_header {
  background: #fff;
}
.Workdetails_bg .Workdetails_header p {
  font-weight: bold;
  text-align: left;
  padding: 15px 0;
  padding-left: 10px;
  font-size: 18px;
  font-family: PingFangSC-Regular;
  border-bottom: 1px solid #c7c7c7;
}
.Workdetails_bg .remark{padding-bottom: 17px;}
.Workdetails_bg .remark span {
  border-radius: 12px;
  border: solid 1px #333333;
  padding: 6px 16px;
  font-size: 12px;
  display: inline-block;
  font-family: PingFangSC-Regular;
}
.Workdetails_bg .remark span:nth-child(2) {
  margin: 0 20px;
}

.Workdetails_bg .grade {
  box-sizing: border-box;
}
.Workdetails_bg .grade .van-rate {
  margin: 10px 0;
}
.Workdetails_bg .Workdetails_details {
  text-align: left;
  padding-left: 10px;
  font-size: 15px;
  background: #fff;
  margin-top: 5px;
}
.Workdetails_bg .Workdetails_details p {
  line-height: 28px;
}
.sercolor {
  color: #df0000;
  text-align: right;
}
.Workdetails_bg .sercenter {
  display: flex;
  justify-content: space-between;
  padding-right: 10px;
  font-size: 15px;
}
.Workdetails_bg .sercenter span {
  line-height: 28px;
}
.Workdetails_bg .sum {
  font-size: 12px;
  text-align: right;
  padding-right: 10px;
}
.Workdetails_bg .sum span {
  font-size: 18px;
}
</style>
