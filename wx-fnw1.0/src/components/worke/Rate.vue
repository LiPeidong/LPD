<template>
  <div>
    <div class="Rate">
      <!-- 评价 -->
      <div class="rate_img">
        <img src="../../assets/images/pj.jpg" alt="">
        <div class="rate_rig">
          <h2>{{serviceName}}</h2>
          <p>服务工号：{{serviceJob}}</p>
        </div>
      </div>
      <div class="rate_star">
        <p>请您为本次服务打分</p>
        <div class="block">
          <el-rate
            v-model="value2"
            @change="change"
            void-color="#ffa800"
          >
          </el-rate>
        </div>
        <ul class="ul-list" v-for="item in rateData">
          <li v-for="(rateItem,index) in item" @click="rateType(rateItem,index,$event,rateItem.id)"
              :class="{'active':active}">{{rateItem.name}}
          </li>
        </ul>
        <!--<div class="rate_p" @click="send">-->
          <!--<i class="iconfont icon-hongbao"></i>-->
          <!--<div>给师傅发个感谢红包</div>-->
          <!--<i class="iconfont icon-xiayibu"></i>-->
        <!--</div>-->
      </div>
      <!--<van-popup v-model="false" position="bottom">-->
        <!--<div class="rate_popup">-->
          <!--<div class="rate_top">-->
            <!--<i class="iconfont icon-cuowu" @click="show=false"></i>-->
            <!--<span>感 谢 红 包</span>-->
          <!--</div>-->
          <!--<div class="rate_list">-->
            <!--<ul id="selectList">-->
              <!--<li v-for="item in rateMoney" @click="btnMoney(item,$event)" :class="{'activeMoney':activeMoney}">{{item}} 元</li>-->
            <!--</ul>-->
          <!--</div>-->
          <!--<p>其他金额 <input type="text" :value="money" placeholder="任意金额"><span>元</span></p>-->
          <!--<van-button size="large" class="btn-primary" style="width: 71%;" @click="btnPrice">去支付</van-button>-->
        <!--</div>-->
      <!--</van-popup>-->
    </div>
    <van-button size="large" class="btn-primary" @click="rateBtn" :disabled="isDisable">提交</van-button>
  </div>

</template>

<script>
  import BASE_URL from "../../constants/index.js";

  export default {
    name: "Rate",
    data() {
      return {
        isDisable:false,
        serviceName: '',
        serviceJob: '',
        active: false,
        activeMoney:false,
        value2: null,
        value: null,
        // show: false,
        rateData: [],
        rateId: [],
        rateMoney: [2, 5, 10],
        price: null,
        money:null,
        ratePrice:null
      };
    },
    created() {
      this.globalToast = this.$toast.loading({
        duration: 0, // 持续展示 toast
        mask: true, //背景层
        forbidClick: true, // 禁用背景点击
        message: "加载中..."
      });
      this.$http.post(BASE_URL + '/api/get_rate_page_data', {
        card_id: this.$route.query.card_id
      }).then(res => {
        console.log(res)
        this.serviceJob = res.data.worker.id;
        this.serviceName = res.data.worker.name;
        this.rateData = res.data.rates;
        this.globalToast.clear();
      }).catch(err => {
        this.globalToast.clear();
        this.$dialog
          .alert({
            message: "系统繁忙，请稍后再试!"
          })
      });
      this.$http.post(BASE_URL + '/api/check_card_rate_status', {
        card_id: this.$route.query.card_id
      }).then(res => {
        console.log(res)
        if (res.data.code == -10000) {
          this.$dialog
            .alert({
              message: res.data.message
            }).then(() => {
            this.$router.push({
              path: '/client/PersonalCenter',
              query: {
                user_id: res.data.user_id
              }
            })
          })
        }
      }).catch(err => {
        this.globalToast.clear();
        this.$dialog
          .alert({
            message: "系统繁忙，请稍后再试!"
          })
      });
    },
    methods: {
      btnMoney(money,e) {
        this.price = money;
        for (var i=0;i<document.getElementById('selectList').children.length;i++){
          document.getElementById('selectList').children[i].setAttribute('class','')
        }
        if (!e.target.className) {
          e.target.className = "activeMoney"; //切换按钮样式
        } else {
          e.target.className = ""; //切换按钮样式
        }
      },
      btnPrice() {
        if (this.price == null){
          this.ratePrice = this.money;
        } else {
          this.ratePrice = this.price;
        }
        this.globalToast = this.$toast.loading({
          duration: 0, // 持续展示 toast
          mask: true, //背景层
          forbidClick: true, // 禁用背景点击
          message: "加载中..."
        });
        this.$http.post(BASE_URL + '/wechat/prepay_for_red_packets', {
          worker_id: this.serviceJob,
          amount: this.ratePrice,
          open_id : localStorage.getItem('open_id')
        }).then(config => {
          wx.config({
            appId: config['appId'], // 必填，公众号的唯一标识
          });
          wx.chooseWXPay({
            timestamp: config['timestamp'],
            nonceStr: config['nonceStr'],
            package: config['package'],
            signType: config['signType'],
            paySign: config['paySign'], // 支付签名
            success: function (res) {
              console.log(res)
              alert('红包已发送')
            },
            fail: function (error) {
              console.log(error)
            }
          });
          this.globalToast.clear();
        })
      },
      //获取星星个数
      change() {
        this.value = this.value2;
      },
      rateType(serviceName, index, e, id) {
        if (!e.target.className) {
          e.target.className = "active"; //切换按钮样式
          // //写逻辑
          this.rateId.push(id)
        } else {
          e.target.className = ""; //切换按钮样式
          this.rateId.splice(this.rateId.indexOf(id), 1)
        }
        console.log(this.rateId)
      },
      //发红包显示隐藏
      // send() {
      //   this.show = true
      // },
      //提交
      rateBtn() {
        this.isDisable = true;
        this.globalToast = this.$toast.loading({
          duration: 0, // 持续展示 toast
          mask: true, //背景层
          forbidClick: true, // 禁用背景点击
          message: "加载中..."
        });
        this.$http.post(BASE_URL + '/api/store_rate_data', {
          card_id: this.$route.query.card_id,
          rates: this.rateId,
          rate: this.value
        }).then(res => {
          console.log(res)
          if (res.data.code == 10000) {
            this.$dialog
              .alert({
                message: res.data.message
              }).then(() => {
              this.$router.push({
                path: '/client/PersonalCenter',
                query: {
                  user_id: res.data.user_id
                }
              })
            })
          }
          this.globalToast.clear();
        }).catch(err => {
          this.globalToast.clear();
          this.isDisable = false;
          this.$dialog
            .alert({
              message: "系统繁忙，请稍后再试!"
            })
        });
      }
    }
  };
</script>
<style scoped>
  .Rate {
    background: #fff;
  }

  .rate_img {
    display: flex;
    padding: 10px 20px;
    border-bottom: 1px solid #c7c7c7;
  }

  .Rate .active {
    background: #489ef0;
    color: #fff !important;
  }
  .activeMoney {
    border:1px solid #489ef0 !important;
    color: #489ef0 !important;

  }
  .rate_img > img {
    width: 60px;
    height: 60px;
    margin-right: 15px;
  }

  .rate_img .rate_rig {
    text-align: left;
  }

  .rate_img .rate_rig > h2 {
    font-size: 16px;
    font-weight: bold;
  }

  .rate_rig, .rate_rig > p, .rate_star > p {
    font-size: 12px;
    color: #686868;
    margin-top: 10px;
  }

  .rate_star {
    padding: 0px 20px 20px 20px;
  }

  .rate_star > p:nth-child(1) {
    margin: 13px 0 15px 0;
  }

  .ul-list {
    text-align: center;
    display: flex;
    justify-content: space-around;
  }

  .rate_p span {
    font-size: 13px;
    font-weight: bold;
    margin-left: 5px;
  }

  .icon-hongbao {
    color: #fe690b;
  }

  .rate_p {
    display: flex;
    justify-content: center;
    line-height: 0px;
    margin-top: 37px;
    padding-bottom: 25px;
  }

  .icon-xiayibu {
    font-size: 15px;
    vertical-align: top;
  }

  .van-button--large {
    width: 95%;
    margin-top: 30px;
  }

  .rate_list {
    margin: 15px 0 28px 0;
  }

  .rate_list ul {
    display: flex;
    justify-content: center;
  }

  .rate_list ul li {
    width: 68px;
    height: 23px;
    border-radius: 3px;
    border: 1px solid #a5a5a5;
    line-height: 23px;
    color: #333333;
    font-size: 13px;
  }

  .rate_list ul li:nth-child(2) {
    margin: 0 15px;
  }

  .rate_top {
    border-bottom: 1px solid #c7c7c7;
    padding: 15px 0 15px 10px;
  }

  .rate_top > i {
    font-size: 25px;
    vertical-align: middle;
    float: left;
    position: relative;
    left: 41px;
    top: -4px;
  }

  .rate_top > span {
    font-size: 15px;
    vertical-align: middle;
  }

  .rate_popup p {
    border-bottom: 1px solid #c7c7c7;
    margin: 0 67px;
    text-align: left
  }

  .rate_popup p input {
    font-size: 12px;
    margin-bottom: 4px;
    margin-left: 12px
  }

  .rate_popup p span {
    text-align: right;
    float: right;
    line-height: 23px;
  }

  .rate_popup .van-button--large {
    width: 80%;
    margin: 20px 0
  }

  .btn-primary {
    height: 40px;
    line-height: 40px;
    width: 80%;
  }
</style>
