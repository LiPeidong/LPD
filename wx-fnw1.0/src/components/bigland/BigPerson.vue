<template>
  <div class="Person">
    <!-- 房屋个人中心 -->
    <div class="Person_header">
      <div class="Person_headerimg">
        <div class="Person_headerimgo">
          <img src="../../assets/images/tx.jpg" alt>
        </div>
        <div class="Person_headerimgtext">
          <p>{{bigName}}</p>
        </div>
      </div>
    </div>
    <div class="Person_class">
      <router-link to="/Inservice">
        <div class="Person_classleft">
          <h2>
            {{single}}
            <span>单</span>
          </h2>
          <p>服务中房屋</p>
        </div>
      </router-link>
      <router-link to="/Money">
        <div class="Person_classleft">
          <h2>
            0
            <span>元</span>
          </h2>
          <p>可结算金额</p>
        </div>
      </router-link>
    </div>
    <div class="Person_li" >
      <ul>
        <li>
          <router-link to="/History">
            <img src="../../assets/images/person1.jpg" alt>
            <p>历史服务</p>
          </router-link>
        </li>
        <li>
          <router-link to="/Buy">
            <img src="../../assets/images/person2.jpg" alt>
            <p>已购买服务</p>
          </router-link>
        </li>
        <li >
          <img src="../../assets/images/个人中心_11.jpg" alt>
          <p>联系客服</p>
        </li>
      </ul>
    </div>
    <router-view></router-view>
    <van-popup>400-8084-989</van-popup>
    <div class="Home_project">
      <ul>
        <li>
          <h2>热卖产品<span>优选精品</span></h2>
          <ul>
            <li><img src="../../assets/images/热卖产品1.png" alt=""></li>
            <li><img src="../../assets/images/热卖产品2.png" alt=""></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import BASE_URL from "../../constants";

export default {
  name: "BigPerson",
  data() {
    return {
      single:0,
      bigName:'大房东'
    };
  },
  created(){
    this.globalToast = this.$toast.loading({
      duration: 0, // 持续展示 toast
      mask: true, //背景层
      forbidClick: true, // 禁用背景点击
      message: "加载中..."
    });
    this.$http.post(BASE_URL+'/api/get_in_service_cards',{
      big_land_id : localStorage.getItem('big_land_id')
    }).then(res => {
      this.globalToast.clear();
      this.single = res.data.cards.length;
      this.bigName = res.data.big_land_name;
      console.log(res)
    }).catch(err =>{
      this.globalToast.clear();
      this.$dialog
        .alert({
          message: "系统繁忙，请稍后再试!"
        })
    })
  },
  destroyed(){
    this.$emit('goGrabsingle', 1)
  },
};
</script>
<style scoped>
  .Person {
    background: #f5f5f5;
    height: 100%;
    position: relative;
    z-index: 1;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    overflow-scrolling: touch;
  }
.Person_header {
  background: #499ef0;
}
.Person_header .Person_headerimg .Person_headerimgo > img {
  width: 65px;
  margin: 10px 18px 10px 26px;
}
.Person_headerimg {
  display: flex;
}

.Person_headerimg .Person_headerimgtext {
  font-size: 18px;
  line-height: 85px;
  color: #fff
}

.Person_class {
  display: flex;
  justify-content: space-around;
  background: #fff;
  margin-top: 5px;
  height: 110px;
}
.Person_class .Person_classleft h2 {
  color: #ff8431;
  font-size: 24px;
  margin: 18px 0 13px 0;
}
.Person_class .Person_classleft h2 span {
  color: #ff8431;
  font-size: 12px;
}
.Person_class .Person_classleft p {
  color: #2c3e50;
  font-size: 14px;
}
.Person_list {
  border: solid 1px #499ef0;
  border-radius: 57px;
  margin: 0 15px;
  position: relative;
  top: -26px;
  z-index: 999;
  background: #fff;
}

.Person_li > ul {
  display: flex;
  justify-content: space-around;
}
.Person_li > ul > li img {
  width: 43px;
  margin: 10px 0;
}
.Person_li {
  width: 80%;
  margin: 0 auto;
  background: #fff;
  border: 1px solid #499ef0;
  border-radius: 10px;
  position: relative;
  top: -28px;
}
.Person_li > ul > li p {
  font-size: 13px;
  margin-bottom: 10px;
  color: #333;
}
.van-tabbar-item--active {
  color: #499ef0;
}
.van-popup {
  font-size: 25px;
  padding: 10px;
}
.Home_project>ul>li>h2{text-align: left;font-size: 15px;font-weight: bold;padding-bottom: 9px;}
.Home_project>ul>li>h2>span{font-size: 12px;margin-left: 15px;color: #c7c7c7;font-weight: normal;}
.Home_project>ul>li{
  background: #fff;
  padding: 10px 12px 0 12px;
  margin-top: 5px;
}
.Home_project>ul>li img {
  width: 100%;
}
.Home_project{margin-bottom:50px;}
.Home_project>ul>li>ul>li{padding-bottom:10px;}
</style>
