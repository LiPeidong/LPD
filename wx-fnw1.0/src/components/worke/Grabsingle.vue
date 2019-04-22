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
            <p>服务地区：{{item.address}}</p>
            <!-- <p>服务距离：3公里</p> -->
            <p>工单来源：{{item.from_type}}</p>
            <p>故障描述：{{item.remark}}</p>
          </div>
          <div class="grabsingle_btn">
            <van-button type="default" @click="crabto(item.id)"  :disabled="isDisable">抢单</van-button>
          </div>
        </li>
      </ul>
    </div>
    <div style="text-align: center; padding-top: 12px; height:100%;background: #fff;" v-show="Grashow">
    <div style="max-width:45%;height:175px;overflow:hidden;margin: 0 auto;">
      <img src="../../assets/images/关于服务及订单.png" alt="" style="width:100%;">
    </div>
    <p style=" font-size: 12px;">没有可接工单</p>
  </div>
  </div>
</template>

<script>
  import BASE_URL from "../../constants";
  export default {
    name: "Grabsingle",
    data() {
      return {
        Grashow: false,
        cards: [],
        cardId: "",
        globalToast: null,
        worker_id: null,
        location_time:null,
        lng:"",
        lat:"",
        isDisable:false,
      };
    },
    destroyed() {
      this.$dialog.close();
      this.$emit('goPerson', 0)
    },
    created() {
      this.globalToast = this.$toast.loading({
        duration: 0, // 持续展示 toast
        mask: true, //背景层
        forbidClick: true, // 禁用背景点击
        message: "加载中..."
      });
      this.$http.get(BASE_URL + "/api/get_access_token").then(res => {
        this.globalToast.clear();
        res.data.expires_at = new Date().getTime() + (res.data.expires_in - 20) * 1000;
        localStorage.setItem("tokens", JSON.stringify(res.data));
        var workId = this.$route.query.worker_id;
        if (workId) {
          localStorage.setItem("workId", workId);
          this.worker_id = workId
        } else {
          this.worker_id = localStorage.getItem("workId")
        }
        this.globalToast = this.$toast.loading({
          duration: 0, // 持续展示 toast
          mask: true, //背景层
          forbidClick: true, // 禁用背景点击
          message: "加载中..."
        });
        this.$http
          .post(BASE_URL + "/api/get_order_cards_can_dispatch", {
            worker_id: this.worker_id
          }).then(res => {
          this.globalToast.clear();
          if (res.data.code == -10000) {
            this.$dialog
              .alert({
                message: res.data.message
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
            } else {
              this.Grashow = false;
              this.cards = res.data.cards;
            }
          }
        })
          .catch(error => {
            this.globalToast.clear();
            this.$dialog
              .alert({
                message: "系统繁忙，请稍后再试!"
              })
          });
      }).catch(error => {
        this.globalToast.clear();
        this.$dialog
          .alert({
            message: "系统繁忙，请稍后再试!"
          })
      });
      this.globalToast = this.$toast.loading({
        duration: 0, // 持续展示 toast
        mask: true, //背景层
        forbidClick: true, // 禁用背景点击
        message: "加载中..."
      });
      //获取sdk 及定位
      this.$http.get(BASE_URL+'/wechat/get_admin_location_config').then(res => {
        this.globalToast.clear();
        wx.config(res.data);
      }).catch(err => {
        alert('获取sdk的问题')
        this.globalToast.clear();
        this.$dialog
          .alert({
            message: "系统繁忙，请稍后再试!"
          })
      })


    },
    methods: {
      //按钮抢单
      crabto(cardId) {
        this.isDisable = true;
        //开定位提示
        wx.ready(()=> {
          wx.getLocation({
            success: (res)=> {
              this.lat = res.latitude;
              this.lng = res.longitude;
              this.globalToast = this.$toast.loading({
                duration: 0, // 持续展示 toast
                mask: true, //背景层
                forbidClick: true, // 禁用背景点击
                message: "加载中..."
              });
              this.$http
                .post(BASE_URL + "/api/order_card_taking_by_worker", {
                  worker_id: localStorage.getItem("workId"),
                  card_id: cardId,
                  lng : this.lng,
                  lat : this.lat
                })
                .then(res => {
                  console.log('抢单', res.data)
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
                  this.isDisable = true;
                  this.$dialog
                    .alert({
                      message: "系统错误，请稍后再试！"
                    })
                });
            },
            cancel: (res)=> {
              this.$dialog.alert({
                title: '温馨提示',
                message: '接单须先授权获取地理位置！'
              }).then(function () {
                this.crabto(cardId)
              });
            }
          });
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
