<template>
  <div class="Person">
    <!-- 首页 -->
    <div class="Home_img">
      <img src="../../assets/images/shouyebanner.jpg" alt>
    </div>
    <div class="Person_li">
      <ul>
        <li>
          <router-link to="/Nowservices">
            <img src="../../assets/images/menu.jpg" alt>
            <p>包租无忧 A</p>
          </router-link>
        </li>
        <li>
          <router-link to="/Anomaly">
            <img src="../../assets/images/menu2.jpg" alt>
            <p>包租无忧 B</p>
          </router-link>
        </li>
        <li>
          <router-link to="/Nowservices">
            <img src="../../assets/images/menu4.jpg" alt>
            <p>包租无忧 C</p>
          </router-link>
        </li>
        <li>
          <router-link to="/Nowservices">
            <img src="../../assets/images/menu3.jpg" alt>
            <p>组合套餐</p>
          </router-link>
        </li>
      </ul>
    </div>
    <router-view></router-view>
    <div class="Home_project">
      <ul>
        <li>
          <h2>试用产品<span>免费试用</span></h2>
          <ul>
            <li><img src="../../assets/images/shiyongchanp.jpg" alt=""></li>
          </ul>
        </li>
         <li>
          <h2>热卖产品<span>优选精品</span></h2>
          <ul>
            <li><img src="../../assets/images/remaichanpin1.jpg" alt=""></li>
            <li><img src="../../assets/images/remaichanpin1.jpg" alt=""></li>
            <li><img src="../../assets/images/remaichanpin1.jpg" alt=""></li>
          </ul>
        </li>
      </ul>
    </div>
    <van-popup>400-8084-989</van-popup>
  </div>
</template>
<script>
import BASE_URL from "../../constants";

export default {
  name: "Home",
  data() {
    return {};
  }
};
</script>
<style scoped>
.Person {
  background: #f5f5f5;
  height: 100%;
  overflow-y: auto;
}
.Person .Home_img > img {
  width: 100%;
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
  margin: 0 auto;
  background: #fff;
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
