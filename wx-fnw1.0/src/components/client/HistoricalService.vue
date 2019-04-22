<template>
<div class="HistoricalService">
  <div class="every" v-show="Historicalshow" v-for="item in finish_cards" @click="jumpUserService(item.id)">
    <p style="margin-top: 8px;margin-left: 11px;line-height: 31px;">
      <span style="font-size: 14px;">
        {{item.service_type}}
      </span>
      <span style="font-size: 14px;color: #686868;float: right">
        已完成&nbsp;&nbsp;
      </span>
    </p>
    <div class="info">
      <p style="margin-left: 16px;line-height: 26px;font-size: 14px">
        姓名：{{item.name}}
      </p>
      <p style="margin-left: 16px;line-height: 26px;font-size: 14px">
        电话：{{item.phone}}
      </p>
      <p style="margin-left: 16px;line-height: 26px;font-size: 14px;display: flex;">

        <span style="white-space: nowrap;"> 地址：</span>
        <span>{{item.address}}</span>
      </p>

    </div>
  </div>
  <div style="text-align: center; padding-top: 59px ;" v-show="Grashow">
    <img src="../../assets/images/kkry.jpg" alt="" style="width:45px;height: 34px;">
    <p style="margin-top: 22px; color: #686868; font-size: 12px;">很遗憾 ~ 您还未使用过服务</p>
  </div>
</div>
</template>

<script>
  import BASE_URL from "../../constants";
  export default {
    name: "HistoricalService",
    data(){
      return {
        Grashow:false,
        Historicalshow:false,
        finish_cards:[]
      }
    },
    created() {
      this.globalToast = this.$toast.loading({
        duration: 0, // 持续展示 toast
        mask: true, //背景层
        forbidClick: true, // 禁用背景点击
        message: "加载中..."
      });
      this.$http
        .post(BASE_URL + "/api/get_finish_cards", {
          user_id: this.$route.query.user_id
        }).then((res) => {
        console.log(res)
        this.globalToast.clear();
        this.finish_cards = res.data.finish_cards;
        if (res.data.finish_cards.length == 0){
          this.Grashow = true;
        } else {
          this.Historicalshow = true;

        }
      }).catch(err => {
        this.globalToast.clear();
        this.$dialog
          .alert({
            message: "系统繁忙，请稍后再试!"
          })
      })
    },
    methods:{
      jumpUserService(id){
        this.$router.push({
          path:'/userService',
          query:{
            card_id:id
          }
        })
      }
    }
  }
</script>

<style scoped>
  .HistoricalService{
    background: #f5f5f5;height: 100%;text-align: left;font-size: 15px;}
  .every{
    width: 100%;
    margin-top: 9px;
    padding-bottom: 9px;
    background-color: #fff;
}
  .info{
    width: 94%;
    margin-left: auto;
    margin-right: auto;
    background-color: #f5f5f5;
  }

</style>
