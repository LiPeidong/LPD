<template>
  <div class="grabsingle_bg">
    <!-- 抢单池 -->
    <div class="grabsingle">
      <ul>
        <li v-for="(item,index) in cards" :key="index">
          <div class="grabsingle_top">
            <h1>
              <span>{{item.service_name}}</span>
            </h1>
            <p>服务地址：{{item.address}}</p>
            <!-- <p>服务距离：3公里</p> -->
            <p>工单来源：{{item.from_type}}</p>
          </div>
          <div class="grabsingle_btn">
            <van-button type="default" @click="crabto(item.id)">抢单</van-button>
          </div>
        </li>
      </ul>
    </div>
    <div style="text-align: center; padding-top: 59px ;" v-show="Grashow">
      <img src="../../assets/images/kkry.jpg" alt="" style="width:90px;height: 78px;">
      <p style="margin-top: 22px; color: #686868; font-size: 18px;">暂无可服务工单！</p>
    </div>
  </div>
</template>

<script>
import BASE_URL from "../../constants";
import Axios from "axios";
export default {
  name: "Grabsingle",
  data() {
    return {
      Grashow:false,
      cards: [],
      cardId: "",
      globalToast:null
    };
  },
  destroyed(){
    this.$dialog.close()
    this.$emit('goPerson', 0)
  },
  mounted() {
    this.globalToast = this.$toast.loading({
      duration: 0, // 持续展示 toast
      mask: true, //背景层
      forbidClick: true, // 禁用背景点击
      message: "加载中..."
    });
    this.$http.get(BASE_URL + "/api/get_access_token").then(res => {
      console.log('获取token',res.data)
      res.data.expires_at =
        new Date().getTime() + (res.data.expires_in - 20) * 1000;
      localStorage.setItem("tokens", JSON.stringify(res.data));
    });
    let workId = this.$route.query.worker_id;
    if (workId) {
      localStorage.setItem("workId", workId);
    }
    this.$http
      .post(BASE_URL + "/api/get_order_cards_can_dispatch", {
        worker_id: localStorage.getItem("workId")
      })
      .then(res => {
        console.log(res.data)
        if (res.data.code == -10000) {

          this.$dialog
            .alert({
              message: "已处于接单状态中！"
            })
            .then(() => {
              this.$router.push({
                path: "/Thisserve",
                query: {
                  card_id: res.data.card_id
                }
              });
            });
        }
        if (res.data.code == 10000) {
          if (res.data.cards.length == 0) {
           this.Grashow = true;
          }else {
            this.Grashow = false;
            this.cards = res.data.cards;
          }
        }
        this.globalToast.clear();
      })
      .catch(error => {
        console.log(error.response);
      });

  },
  methods: {
    //按钮抢单
    crabto(cardId) {
      this.globalToast = this.$toast.loading({
        duration: 0, // 持续展示 toast
        mask: true, //背景层
        forbidClick: true, // 禁用背景点击
        message: "加载中..."
      });
      this.$http
        .post(BASE_URL + "/api/order_card_taking_by_worker", {
          worker_id: localStorage.getItem("workId"),
          card_id: cardId
        })
        .then(res => {
          console.log('抢单',res.data)
          if (res.data.code == -10000) {
            this.$dialog
              .alert({
                message: "您有订单为核销完成！请先核销！"
              })
              .then(() => {
                return false;
              });
          }
          if (res.data.code == -20000) {
            this.$dialog
              .alert({
                message: "订单已被抢走！下次手快点~"
              })
              .then(() => {
                this.$http
                  .post(BASE_URL + "/api/get_order_cards_can_dispatch", {
                    worker_id: localStorage.getItem("workId")
                  })
                  .then(res => {
                    if (res.data.code == 10000) {
                      this.cards = res.data.cards;
                    }
                  });
              });
          }
          if (res.data.code == -30000) {
            this.$dialog
              .alert({
                message: "工单已被取消"
              })
              .then(() => {
                this.$router.push({
                  path: "/menu/person"
                });
              });
          }
          if (res.data.code == 10000) {
            this.$router.push({
              name: "Grabwin",
              query: {
                card_id: res.data.card_id
              }
            });
          }
          this.globalToast.clear();
        })
        .catch(err => {
          this.globalToast.clear();
          this.$dialog
            .alert({
              message: "系统错误，请稍后再试！"
            })
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.grabsingle_bg {
  height: 100%;
  overflow-y: auto;
}
.grabsingle {
  padding-top: 4px;
}
.grabsingle_bg {
  background: #f5f5f5;
}
.grabsingle_top {
  text-align: left;
  padding-left: 10px;
  padding-bottom: 5px;
}
.grabsingle > ul > li:nth-child(1) {
  margin-top: 0px;
}
.grabsingle > ul > li {
  margin-top: 4px;
  background: #fff;
  padding-top: 7px;
}
.grabsingle > ul > li .grabsingle_top h1 {
  font-size: 16px;
  color: #499ef0;
  border-left: 3px solid #499ef0;
  font-family: PingFangSC-Regular;
  margin-bottom: 14px;
}
.grabsingle > ul > li .grabsingle_top p {
  font-size: 14px;
  color: #333333;
  font-family: PingFangSC-Regular;
  margin-bottom: 10px;
}
.grabsingle > ul > li .grabsingle_top h1 span {
  padding-left: 13px;
}
.grabsingle > ul > li:last-child {
  margin-bottom: 55px;
}
.grabsingle_btn {
  border-top: 1px solid #c7c7c7;
}
.grabsingle_btn .van-button--default {
  width: 200px;
  height: 40px;
  background-color: #499ef0;
  border-radius: 10px;
  color: #fff;
  font-family: PingFangSC-Regular;
  font-size: 18px;
  margin: 15px;
}
.van-tabbar-item--active {
  color: #499ef0;
}
</style>
