<template>
  <div class="Person">
    <!-- 个人中心 -->
    <div class="Person_header">
      <div class="Person_headerimg">
        <div class="Person_headerimgo">
          <img src="../../assets/images/tx.jpg" alt>
        </div>
        <div class="Person_headerimgtext">
          <p>{{name}}</p>
          <p>工号：{{id}}</p>
          <p style="display: flex;align-items: center;">星级：
            <van-icon name="star" color="#ffa800" size="14px"/>&nbsp;{{rate}}
          </p>
        </div>
      </div>
    </div>
    <div class="Person_class" :class="{'Person_active':display,'Person_margin':display2} ">
      <router-link tag="div" to="/Hasservice">
        <div class="Person_classleft">
          <h2>
            {{service_count}}
            <span>单</span>
          </h2>
          <p>已服务工单</p>
        </div>
      </router-link>
      <router-link tag="div" to="/Hasservicemoney">
        <div class="Person_classleft">
          <h2>
            {{service_total_price}}
            <span>元</span>
          </h2>
          <p>已服务总金额</p>
        </div>
      </router-link>
    </div>
    <div @click="redirect">
      <div class="Person_list" v-show="serviceShow">
        <div class="Person_listone">
          <div class="Person_l">
            <p>{{service_type}}</p>
            <p>正在服务</p>
          </div>
          <p>{{sercie_addresss}}</p>
        </div>
      </div>
    </div>

    <div class="Person_li" style>
      <ul>
        <li>
          <router-link to="/Nowservices">
            <img src="../../assets/images/个人中心_07.jpg" alt>
            <p>服务项目</p>
          </router-link>
        </li>
        <li>
          <div @click="unusual">
            <img src="../../assets/images/个人中心_09.jpg" alt>
            <p>异常工单</p>
          </div>
        </li>
        <li>
          <a :href='"tel:"+kefu'>
            <img src="../../assets/images/个人中心_11.jpg" alt>
            <p>联系客服</p>
          </a>
        </li>
      </ul>
    </div>
    <div class="Home_project">
      <ul>
        <li>
          <h2>热卖产品<span>优选精品</span></h2>
          <ul>
            <li><img src="../../assets/images/电瓶车险.jpg" alt=""></li>
          </ul>
        </li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
  import BASE_URL from "../../constants";

  export default {
    name: "Person",
    data() {
      return {
        card_id: null,
        globalToast: null,
        active: 0,
        serviceShow: false,
        service_type: "", //服务类型
        sercie_addresss: "", //服务地址
        service_count: 0, //服务工单
        service_total_price: 0, //总金额
        name: "师傅",
        id: "FNW00001", //工号
        kefu: "",
        display: false,
        display2: true,
        shouldNotRedirect: false,
        worker_id: '',
        rate: ''
      };
    },
    created() {
      this.globalToast = this.$toast.loading({
        duration: 0, // 持续展示 toast
        mask: true, //背景层
        forbidClick: true, // 禁用背景点击
        message: "加载中..."
      });
      this.$http.get(BASE_URL + "/api/get_access_token")
        .then(res => {
          res.data.expires_at = new Date().getTime() + (res.data.expires_in - 20) * 1000;
          localStorage.setItem("tokens", JSON.stringify(res.data));
          this.globalToast.clear();
          let timedCount = setTimeout(() => {
            this.$http
              .post(BASE_URL + "/api/get_worker_info", {
                worker_id: this.worker_id
              })
              .then(res => {
                console.log(res)
                this.service_count = res.data.service_count;
                this.service_total_price = res.data.service_total_price.toFixed(2);
                this.name = res.data.name;
                this.id = res.data.id;
                this.kefu = res.data.kefu;
                this.rate = res.data.rate.toFixed(1);
                if (res.data.working_card.length != 0) {
                  this.card_id = res.data.working_card.card_id;
                  this.service_type = res.data.working_card.service_type;
                  this.sercie_addresss = res.data.working_card.sercie_addresss;
                  this.shouldNotRedirect = res.data.working_card.should_not_redirect;
                  this.serviceShow = true;
                  this.display = true;
                  this.display2 = false;
                } else {
                  this.serviceShow = false;
                  this.display = false;
                  this.display2 = true;
                }
              })
              .catch(err => {
                this.$dialog
                  .alert({
                    message: "系统繁忙，请稍后再试!"
                  })
              });
          },100)
        }).catch(err => {
        this.globalToast.clear();
        this.$dialog
          .alert({
            message: "系统繁忙，请稍后再试!"
          })
      });
      var workId = this.$route.query.worker_id;
      if (workId) {
        localStorage.setItem("workId", workId);
        this.worker_id = this.$route.query.worker_id;
      } else {
        this.worker_id = localStorage.getItem("workId");
      }
    },
    mounted() {

    },
    destroyed() {
      this.$emit('goGrabsingle', 1)
    },
    methods: {
      redirect() {
        if (this.shouldNotRedirect) {
          this.$dialog.alert({
            message: '请联系客户确认工单完成信息！'
          })
        } else {
          this.$router.push({
            path: '/Thisserve',
            query: {
              card_id: this.card_id
            }
          })
        }
      },
      unusual() {
        this.$router.push({
          path: '/Anomaly'
        })
      }
    }
  };
</script>
<style scoped>
  .Person_margin {
    margin-bottom: 14px;
  }

  .Person_active {
    padding-bottom: 30px !important;
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

  .Person .Home_project > ul > li img {
    width: 100%;
    height: 95px;
  }

  .Home_project {
    margin-bottom: 50px;
  }

  .Home_project > ul > li > ul > li {
    padding-bottom: 10px;
  }

  .tab {
    height: 100%;
    width: 100%;
    background-color: #fff;
    position: fixed;
    bottom: 0px;
  }

  .Person {
    background: #f5f5f5;
    height: 100%;
    overflow-y: auto;
  }

  .Person_header {
    background: #499ef0;
  }

  .Person_header .Person_headerimg .Person_headerimgo > img {
    width: 65px;
    margin: 10px 18px 25px 26px;
  }

  .Person_headerimg {
    display: flex;
  }

  .Person_headerimg .Person_headerimgtext {
    margin: 10px 0 0 0;
    color: #fff;
    text-align: left;
    font-size: 15px;

  }

  .Person_headerimg .Person_headerimgtext p:nth-child(1) {
    font-size: 18px;
  }

  .Person_headerimg .Person_headerimgtext p {
    line-height: 24px;
  }

  .Person_class {
    display: flex;
    justify-content: space-around;
    background: #fff;
    margin-top: 11px;
    height: 80px;
  }

  .Person_class .Person_classleft h2 {
    color: #ff8431;
    font-size: 24px;
    margin: 17px 0 12px 0;
  }

  .Person_class .Person_classleft h2 span {
    color: #ff8431;
    font-size: 12px;
  }

  .Person_class .Person_classleft p {
    color: #2c3e50;
    font-size: 14px;
  }

  .Person_listone {
    padding-left: 32px;
    font-size: 15px;
    color: #499ef0;
  }

  .Person_listone > p {
    margin-bottom: 10px;
    text-align: left;
    font-size: 13px;
  }

  .Person_l {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
  }

  .Person_list {
    border: solid 1px #499ef0;
    border-radius: 28px;
    height: 54px;
    margin: 0 15px;
    position: relative;
    top: -26px;
    z-index: 999;
    background: #fff;
  }

  .Person_l p:nth-child(2) {
    padding-right: 30px;
    color: #ff8431;
    font-size: 13px;
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
    background: #fff;
    position: relative;
    top: -6px;
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
</style>
