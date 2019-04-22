<template>
  <div class="all">
    <div class="title">
      <div class="titleName">
        <p>服务结果</p>
      </div>
    </div>
    <div class="resume">
      <div class="resumeBox">
        <p class="a">{{partsType}}</p>
        <p class="a" v-show="partsShow">配件：<span v-for="item in partsName">{{item.name}}</span></p>
      </div>
    </div>
    <div class="detail">
      <ul class="Cost unit">
        <li class="">
          <p style="white-space: nowrap;">维修费用：</p>
          <p class="number">{{maintainMoney}} 元</p>
        </li>
        <li>
          <p>平台补贴金额：</p>
          <p class="number">-{{subsidyMoney}} 元</p>
        </li>
        <li>
          <p>最终支付金额：</p>
          <p class="number">{{payMoney}} 元</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import BASE_URL from "../../../../constants/index.js";

  export default {
    name: "ServiceResult",
    data() {
      return {
        partsShow: true,
      }
    },
    props: ['partsType', 'partsName', 'maintainMoney', 'subsidyMoney', 'payMoney', 'parts'],
    created() {
      if (this.parts == '') {
        this.partsShow = false;
      } else {
        this.partsShow = true;
      }
      //   this.globalToast = this.$toast.loading({
      //     duration: 0, // 持续展示 toast
      //     mask: true, //背景层
      //     forbidClick: true, // 禁用背景点击
      //     message: "加载中..."
      //   });
      //   this.$http
      //     .post(BASE_URL + "/api/get_not_confirm_finish_card_detail", {
      //       card_id: this.$route.query.card_id,
      //       open_id : localStorage.getItem('call_open_id')
      //     }).then((res) => {
      //     this.globalToast.clear();
      //     console.log(res.data)
      //     this.partsType = res.data.card.status;
      //     this.partsName = res.data.card.parts;
      //     this.maintainMoney = res.data.card.price;
      //     this.subsidyMoney = res.data.card.price;
      //     this.payMoney = this.maintainMoney -  this.subsidyMoney;
      //     if (res.data.card.parts.length<=0){
      //       this.partsShow = false;
      //     } else {
      //       this.partsShow = true;
      //     }
      //     if(res.data.code == -10000){
      //       this.$dialog
      //         .alert({
      //           message: res.data.message
      //         }).then( () => {
      //           this.$router.push({
      //             path:'/client/PersonalCenter',
      //             user_id : res.data .user_id
      //           })
      //       })
      //     }
      //   }).catch(err => {
      //     this.globalToast.clear();
      //     this.$dialog
      //       .alert({
      //         message: "系统繁忙，请稍后再试!"
      //       })
      //   })
    }
  }
</script>
<style scoped>
  .all {
    text-align: left
  }

  .titleName {
    margin: 15px 0 15px 15px;
    padding-left: 15px;
    border-left: 3px solid #5f9dea
  }

  .titleName p {
    font-size: 15px
  }

  .resumeBox {
    background-color: #fff;
    margin-bottom: 5px;
  }

  .a {
    padding: 10px 10px 10px 15px;
    font-size: 12px
  }

  .a:last-child {
    padding-top: 0;
    color: #333333
  }

  .a:first-child {
    padding-top: 10px;
    color: #499ef0
  }

  .detail {
    padding-left: 15px;
    padding-right: 15px;
    background-color: #fff;
    height: 125px;
    display: flex;
    flex-direction: column;
    justify-content: space-around
  }

  .unit {
    display: flex;
    height: 125px;
    flex-direction: column;
    justify-content: space-around;
  }

  .unit li {
    color: #333333;
    font-size: 12px;
    border-bottom: 1px solid #c7c7c7;
    padding-top: 5px;
    padding-bottom: 12px
  }

  .unit li:first-child {
    padding-top: 10px;
  }

  .unit li:last-child {
    padding-bottom: 10px;
    border-bottom: 0;
  }

  .Cost li p {
    display: inline;
  }

  .number {
    color: #499ef0;
    float: right
  }
</style>
