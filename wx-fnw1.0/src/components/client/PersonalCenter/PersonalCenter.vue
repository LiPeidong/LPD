<template>
  <div class="main">
    <div class="Top">
      <img class="topimg" src='./img/topBackground.png'/>
      <div class="userInfo">
        <div class="userIconPart">
          <!--<img class="userIcon" src="./img/user.jpg"/>-->
          <img class="userIcon" :src="img_path" alt=""/>
        </div>
        <p class="userName">{{userName}}</p>
      </div>
      <div class="service">
        <div class="sercive-left" @click="history">
          <img class="serviceIcon" src="./img/history.png"/>
          <p class="serviceDes">历史服务</p>
        </div>
        <div class="sercive-right">
          <a :href="'tel:'+kefu">
            <img class="serviceIcon" src="./img/contract.png"/>
            <p class="serviceDes">联系客服</p>
          </a>
        </div>
      </div>
    </div>
    <service-info :service_list="service_list"></service-info>
  </div>
</template>
<script>
  import ServiceInfo from './components/serviceInfo.vue';
  import BASE_URL from "../../../constants";
  export default {
    name: "PersonalCenter",
    data(){
      return {
        userName:'',
        img_path:'',
        url:'http://testimg.funlifeday.com/',
        kefu:'',
        service_list:[]
      }
    },
    components: {
      ServiceInfo
    },
    created() {
      this.globalToast = this.$toast.loading({
        duration: 0, // 持续展示 toast
        mask: true, //背景层
        forbidClick: true, // 禁用背景点击
        message: "加载中..."
      });
      this.$http
        .post(BASE_URL + "/api/get_user_info", {
          user_id: this.$route.query.user_id
        }).then((res) => {
        this.globalToast.clear();
        this.userName = res.data.user.wechat_user.nickname;
        this.img_path = res.data.user.wechat_user.avatar;
        this.kefu = res.data.kefu;
        this.service_list = res.data.using_cards;
      }).catch(err => {
        this.globalToast.clear();
        this.$dialog
          .alert({
            message: "系统繁忙，请稍后再试!"
          })
      })
    },
    methods:{
      history(){
        this.$router.push({
          path:'/HistoricalService',
          query:{
            user_id: this.$route.query.user_id
          }
        })
      }
    }
  }
</script>
<style scoped>
  .Top {
    position: relative;
    background-color: #fff
  }

  .serviceDes {
    margin-bottom: 23px;
    color: #333 !important;
  }

  .topimg {
    height: 105px;
    width: 100%;
  }

  .userIcon {
    height: 90px;
    width: 90px;
    border-radius: 50%;
    margin-top: -60px;
    border: 2px solid #fff;
    box-shadow: 0 0 20px -2px #489ef0;
  }

  .userName {
    margin-top: 18px;
    font-size: 18px
  }

  .serviceIcon {
    height: 43px;
    width: 43px;
    margin-bottom: 10px
  }

  .service {
    margin-top: 45px;
    display: flex;
    justify-content: space-around;
    border-radius: 10px;
  }
</style>
