<template>
  <div class="main">
    <div class="Top">
      <img class="topimg" src='./img/topBackground.png'/>
      <div class="userInfo">
        <div class="userIconPart">
          <img class="userIcon" src="./img/user.jpg"/>
        </div>
        <p class="userName">我的天</p>
      </div>
      <div class="service">
      <div class="sercive-left">
        <img class="serviceIcon" src="./img/history.png"/>
        <p class="serviceDes">历史服务</p>
      </div>
      <div class="sercive-right">
        <img class="serviceIcon" src="./img/contract.png"/>
        <p class="serviceDes">联系客服</p>
      </div>
    </div>
    </div>
    <service-info></service-info>
  </div>
</template>
<script>
import ServiceInfo from './components/serviceInfo.vue'
export default {
  name:"PersonalCenter",
  components:{
    ServiceInfo
  },
  data () {
    return{}
  }
}
</script>
<style scoped>
  .Top{
    position: relative;
    background-color: #fff
  }
  .serviceDes{
    margin-bottom: 23px
  }
  .topimg{
    height:105px;
    width:100%;
  }
  .userIcon{
    height:90px;
    width:90px;
    border-radius: 50%;
    margin-top:-60px;
    border:2px solid #fff;
    box-shadow: 0 0 20px -2px #489ef0;
  }
  .userName{
    margin-top:18px;
    font-size: 18px
  }
  .serviceIcon{
    height:43px;
    width:43px;
    margin-bottom:10px
  }
  .service{
    margin-top:45px;
    display: flex;
    justify-content: space-around;
    border-radius: 10px;
  }
</style>
