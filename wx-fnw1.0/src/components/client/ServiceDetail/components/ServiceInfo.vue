<template>
  <div class="all">
    <div class="title">
      <div class="titleName">
        <p>服务信息</p>
      </div>
    </div>
    <div class="detail">
      <ul class="clientInfo unit">
        <li>用户姓名：{{name}}</li>
        <li>用户电话：{{phone}}</li>
        <li>用户地址：{{address}}</li>
      </ul>
      <ul class="timeInfo unit">
        <li>服务发起时间：{{startTime}}</li>
        <li>服务承接时间：{{continueTime}}</li>
        <li>服务完成时间：{{fulfillTime}}</li>
      </ul>
      <ul class="WorkerInfo unit">
        <li>服务人员姓名：{{serviceName}}</li>
        <li>服务人员工号：{{job}}</li>
        <li>服务人员电话：{{servicePhone}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
  import BASE_URL from "../../../../constants";
  export default {
    name: "ServiceInfo",
    props:['name','phone','address','startTime','continueTime','fulfillTime','serviceName','job','servicePhone']
    // created() {
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
    //     if(res.data.code == -10000){
    //       this.$dialog
    //         .alert({
    //           message: res.data.message
    //         }).then( () => {
    //         this.$router.push({
    //           path:'/client/PersonalCenter',
    //           user_id : res.data .user_id
    //         })
    //       })
    //     }
    //     console.log(res.data)
    //     this.name = res.data.card.orders.name;
    //     this.phone = res.data.card.orders.phone;
    //     this.address = res.data.card.orders.full_address;
    //     this.startTime = res.data.card.call_time; //服务开始时间
    //     this.continueTime = res.data.card.worker_service_start_at; //服务承接时间
    //     this.fulfillTime = res.data.card.worker_service_end_at; //服务发起时间
    //     this.serviceName = res.data.card.worker ? res.data.card.worker.name : '工人已离职';
    //     this.servicePhone = res.data.card.worker ? res.data.card.worker.phone : '';
    //     this.job = res.data.card.worker ? res.data.card.worker.id : '';
    //   }).catch(err => {
    //     this.globalToast.clear();
    //     this.$dialog
    //       .alert({
    //         message: "系统繁忙，请稍后再试!"
    //       })
    //   })
    // }
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

  .detail {
    padding-left: 15px;
    padding-right: 15px;
    background-color: #fff;
    height: 248px;
    display: flex;
    flex-direction: column;
    justify-content: space-around
  }

  .unit {
    padding-bottom: 10px;
    display: flex;
    height: 60px;
    flex-direction: column;
    justify-content: space-around;
  }

  .unit li {
    color: #333333;
    font-size: 12px
  }

  .unit {
    border-bottom: 1px solid #c7c7c7
  }

  .unit:last-child {
    border-bottom: 0;
  }
</style>
