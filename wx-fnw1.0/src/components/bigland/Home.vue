<template>
  <div class="Person">
    <!-- 首页 -->
    <div class="Home_img">
      <img src="../../assets/images/首页banner.jpg" alt>
    </div>
    <div class="Person_li">
      <ul>
        <li @click="detailsBtn(1)">
          <img src="../../assets/images/包租无忧A.png" alt="">
          <p>包租无忧 A</p>
        </li>
        <li @click="detailsBtn(2)">
          <img src="../../assets/images/包租无忧B.png" alt="">
          <p>包租无忧 B</p>
        </li>
        <li @click="detailsBtn(3)">
          <img src="../../assets/images/包租基础版.png" alt="">
          <p>包租基础版</p>
        </li>
        <li @click="detailsBtn(5)">
          <img src="../../assets/images/包租豪华版.png" alt="">
          <p>包租豪华版</p>
        </li>
      </ul>
      <ul>
        <li @click="detailsBtn(4)">
          <img src="../../assets/images/包租魔方.png" alt="">
          <p>包租魔方</p>
        </li>
      </ul>
    </div>
    <div class="Home_project">
      <ul>
        <li>
          <h2>试用产品<span>免费试用</span></h2>
          <ul>
            <li><img src="../../assets/images/试用产品.jpg" alt=""></li>
          </ul>
        </li>
        <li>
          <h2>热卖产品<span>优选精品</span></h2>
          <ul>
            <li><img src="../../assets/images/热卖产品1.png" alt=""></li>
            <li><img src="../../assets/images/热卖产品2.png" alt=""></li>
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
      return {
        products: [],
        img_path: 'http://testimg.funlifeday.com/',
      };
    },
    created() {
      this.childValue = this.$route.query.big_land_id;
      localStorage.setItem('big_land_id',this.$route.query.big_land_id);
      this.globalToast = this.$toast.loading({
        duration: 0, // 持续展示 toast
        mask: true, //背景层
        forbidClick: true, // 禁用背景点击
        message: "加载中..."
      });
      this.$http.get(BASE_URL + "/api/get_access_token").then(res => {
        res.data.expires_at = new Date().getTime() + (res.data.expires_in - 20) * 1000;
        localStorage.setItem("tokens", JSON.stringify(res.data));
        this.globalToast.clear();
        // 获取信息
      }).catch(err => {
        this.globalToast.clear();
        this.$dialog
          .alert({
            message: "系统繁忙，请稍后再试!"
          })
      });

    },
    destroyed(){
      this.$dialog.close()
      this.$emit('goPerson', 0)
    },
    methods: {
      detailsBtn(id) {

        if (id == 1) {
          this.$router.push({
            path: '/CharterA',
          })
        } else if (id == 4) {
          this.$router.push({
            path: '/Group',
          })
        }else if (id == 3) {
          this.$router.push({
            path: '/CharterC',
          })
        }else if (id == 2){
          this.$router.push({
            path: '/CharterB',
          })
        }else if (id == 5){
          this.$router.push({
            path: '/Luxury',
          })
        }
      },
    }
  }
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
  .Person .Home_img > img {
    width: 100%;
  }

  .Person_li > ul {
    display: flex;
  }

  .Person_li >ul>li{
    width: 18.7%;
    margin: 0 3%;
  }
  .Person_li > ul > li img {
    width: 50px;
    height: 50px;
    margin: 10px 0;
    border-radius: 50%;
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

  .Home_project > ul > li > h2 {
    text-align: left;
    font-size: 15px;
    font-weight: bold;
    padding-bottom: 9px;
  }

  .Home_project > ul > li > h2 > span {
    font-size: 12px;
    margin-left: 15px;
    color: #c7c7c7;
    font-weight: normal;
  }

  .Home_project > ul > li {
    background: #fff;
    padding: 10px 12px 0 12px;
    margin-top: 5px;
  }

  .Home_project > ul > li img {
    width: 100%;
  }

  .Home_project {
    margin-bottom: 50px;
  }

  .Home_project > ul > li > ul > li {
    padding-bottom: 10px;
  }
</style>
