<template>
  <div class="info" v-show="isShow">
    <div class="content" v-for="item in service_list2" :key="item.id" @click="jumpUserService(item.id)">
      <div class="top">
        <div class="title">
          <p class="serviceName">{{item.service_type}}</p>
          <p class="serviceStatus">使用中</p>
        </div>
      </div>
      <div class="bottom">
        <div class="addressInfo">
          <img class="addressIcon line" src="../img/address.png"/>
          <p class="line addressCenter">{{item.address}}</p>
        </div>
        <div class="dateInfo">
          <img class="dateIcon line" src="../img/date.png"/>
          <p class="line dateCenter">{{item.service_time}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import BASE_URL from "../../../../constants";

  export default {
    name: "serviceInfo",
    data() {
      return {
        service_time: '',
        isShow: false,
        service_list2:[]
      }
    },
    props: {service_list:Array},
    watch:{
      service_list(value){
        this.service_list2 = value;
        if (this.service_list2.length) {
             this.isShow = true
        }
      }
    },
    created() {
       // if (this.service_list.length) {
       //      this.isShow = true
       // }
    //   this.globalToast = this.$toast.loading({
    //     duration: 0, // 持续展示 toast
    //     mask: true, //背景层
    //     forbidClick: true, // 禁用背景点击
    //     message: "加载中..."
    //   });
    //   this.$http
    //     .post(BASE_URL + "/api/get_user_info", {
    //       user_id: this.$route.query.user_id
    //     }).then((res) => {
    //       this.globalToast.clear();
    //       this.service_list = res.data.using_cards;
    //       if (this.service_list.length) {
    //         this.isShow = true
    //       }
    //       console.log(res)
    //     }).catch(err => {
    //     this.globalToast.clear();
    //     this.$dialog
    //       .alert({
    //         message: "系统繁忙，请稍后再试!"
    //       })
    //     })
    //
    },
    methods: {
      jumpUserService(id) {
        this.$router.push({
          path: '/userService',
          query: {
            card_id: id
          }
        })
      }
    }
  }
</script>
<style scoped>
  .info {
    border-radius: 10px;
    text-align: left;
    width: 87%;
    height: 119px;
    margin: 15px auto;
    background-color: #fff;
  }

  .content {
    padding: 15px;
    background: #FFF;
  }

  .title p {
    display: inline-block;
  }

  .serviceName {
    border-left: 3px solid #499ef0;
    padding-left: 10px;
    font-size: 15px
  }

  .serviceStatus {
    font-size: 13px;
    color: #499ef0;
    float: right
  }

  .addressIcon {
    width: 14px;
    height: 17px;
    line-height: 17px
  }

  .dateIcon {
    width: 15px;
    height: 16px;
    line-height: 16px
  }

  .line {
    display: inline-block;
  }

  .addressInfo {
    margin-top: 22px;
    display: flex;
  }

  .dateInfo {
    margin-top: 19px
  }

  .addressCenter {
    height: 17px;
    line-height: 17px;
    font-size: 13px;
    color: #686868;
    margin-left: 10px;
    vertical-align: middle;  }

  .dateCenter {
    height: 16px;
    line-height: 16px;
    font-size: 13px;
    color: #686868;
    margin-left:5px;
    vertical-align: middle;  }
</style>
