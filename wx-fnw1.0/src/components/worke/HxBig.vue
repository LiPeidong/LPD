<template>
  <div class="Hxverone">
    <!-- 核销确认 大房东-->
    <div class="Hxver_header">
      <h2>&ensp;服务信息</h2>
      <ul>
        <li><p style="white-space: nowrap">卡卷编码：</p>
          <p>{{card_id}}</p></li>
        <li><p style="white-space: nowrap">用户姓名：</p>
          <p>{{username}}</p></li>
        <li><P style="white-space: nowrap">用户电话：</P>
          <p>{{phone}}</p></li>
        <li>
          <p style="white-space: nowrap">用户地址：</p>
          <p>{{address}}</p>
        </li>
        <li class="header_li"></li>
        <li><p style="white-space: nowrap">服务承接时间：</p>
          <p>{{start_at}}</p></li>
        <li><p style="white-space: nowrap">服务完成时间：</p>
          <p>{{end_at}}</p></li>
      </ul>
    </div>
    <div class="Hxver_header">
      <h2>&ensp;服务结果</h2>
      <div class="Hxver_radio">
        <van-radio-group v-model="r">
          <van-radio :name="index" v-for="(item ,index) in itemData" :key="index"
                     v-show=item.show
                     @click="hxChange(index)"
                     style="width:auto"
          >
             {{item.content}}
          </van-radio>
        </van-radio-group>
      </div>
    </div>
    <div>
      <div class="hxshow" v-if="hxshow">
        <div class="hxinput" v-show="servicemoney">
          <span  style="width: 28%;text-align: left;">维修费用</span>
          <div  style="width: 70%;">
            <input type="text" disabled="disabled" placeholder="不可输金额" :value="price" style="width: 81%;text-align: right;">
            <span class="hxspan">元</span>
          </div>
        </div>
        <p>提示：请提示用户上传您和维修家电的合照，以保障后续服务跟踪。</p>
        <van-button size="large" @click="hxverto" style="margin-bottom: 30px;" :disabled="isDisable">确认核销</van-button>
      </div>
      <van-button size="large" v-if="showbtn" @click="hxbtn" style="margin-top: 30px;" v-show="serviceBtn">下一步
      </van-button>
    </div>
    <!--<div-->
      <!--style="border-bottom: 1px solid #c8c8c8;width: 70%;position: absolute;bottom: 10px;left:15%;text-align: center;">-->
      <!--<span-->
        <!--style="position:relative; top: 7px; background: #f5f5f5;z-index: 99; padding: 0px 15px;color: #c8c8c8;font-size: 12px;">我是有底线的</span>-->
    <!--</div>-->
  </div>
</template>

<script>
  import BASE_URL from "../../constants";

  export default {
    name: "HxBig",
    data() {
      return {
        isDisable:false,
        service_type: 1,
        price: 0,
        card_id: null,
        username: null,
        name: null,
        address: null,
        phone: null,
        start_at: null,
        end_at: null,
        r: 0,
        hxshow: true,
        showbtn: false,
        servicemoney: true,
        serviceBtn: false,
        itemData: [],
        location_time:null,
        lat:'',
        lng:''
      }
    },
    watch: {
      r: function (index) {
        if (index == 0) {
          this.servicemoney = true;
          this.service_type = 1;
        }
        if (index == 1) {
          this.serviceBtn = true;
          this.service_type = 5;
        }
        if (index == 2) {
          this.servicemoney = true;
          this.service_type = 10;
        }
        if (index == 3) {
          this.servicemoney = true;
          this.service_type = 100;
        }
      }
    },
    created() {
      this.globalToast = this.$toast.loading({
        duration: 0, // 持续展示 toast
        mask: true, //背景层
        forbidClick: true, // 禁用背景点击
        message: "加载中..."
      });
      this.$http
        .post(BASE_URL + "/api/get_card_detail_client_mode", {
          card_id: this.$route.query.card_id
        })
        .then(res => {
          console.log(res)
          if (res.data.code == -10000) {
            this.$dialog
              .alert({
                message: res.data.message
              })
              .then(() => {
                this.$router.push({
                  path: "/menu/person"
                });
              });
          }
          if (res.data.code == 10000) {
            this.card_id = res.data.card_info.card_id;
            this.username = res.data.card_info.user_name;
            this.name = res.data.card_info.service_type;
            this.address = res.data.card_info.user_address;
            this.phone = res.data.card_info.user_phone;
            this.start_at = res.data.card_info.service_start_at;
            this.end_at = res.data.card_info.service_end_at;
            this.price =  res.data.serviceResult.finished_with_noparts_price;
            if (res.data.serviceResult.parts == 'hide') {
              this.itemData = [
                {content: '已修复，未更换配件', show: true, price: res.data.serviceResult.finished_with_noparts_price},
                {content: '已修复，并更换配件', show: false},
                {content: '未修复，用户主动放弃修复', show: true, price: res.data.serviceResult.cancel_price},
                {content: '未修复，配件已停产', show: false}
              ]
            }
            if (res.data.serviceResult.parts == 'show') {
              this.itemData = [
                {content: '已修复，未更换配件', show: true, price: res.data.serviceResult.finished_with_noparts_price},
                {content: '已修复，并更换配件', show: true},
                {content: '未修复，用户主动放弃修复', show: true, price: res.data.serviceResult.cancel_price},
                {content: '未修复，配件已停产', show: true, show: true, price: res.data.serviceResult.cancel_price}
              ]
            }
          }
          this.globalToast.clear();
          console.log(res)
        })
        .catch(err => {
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
      this.$http.get(BASE_URL+'/wechat/get_admin_location_config').then(res => {
        this.globalToast.clear();
        wx.config(res.data);
      }).catch(err => {
        this.globalToast.clear();
        this.$dialog
          .alert({
            message: "系统繁忙，请稍后再试!"
          })
      })
    },
    methods: {
      hxChange(index) {
        if (index == 1) {
          this.showbtn = true;
          this.hxshow = false;
        } else {
          this.hxshow = true;
          this.showbtn = false;
          this.price = this.itemData[index].price
        }
      },
      //确认核销
      hxverto() {
        this.isDisable = true;
        wx.ready(() => {
          wx.getLocation({
            success: (res) =>{
              this.lat = res.latitude;
              this.lng = res.longitude;
              this.globalToast = this.$toast.loading({
                duration: 0, // 持续展示 toast
                mask: true, //背景层
                forbidClick: true, // 禁用背景点击
                message: "加载中..."
              });
              this.$http.post(BASE_URL + "/api/verify_card", {
                card_id: this.$route.query.card_id,
                service_type: this.service_type,
                worker_id: localStorage.getItem("workId"),
                price: this.price,
                end_at: this.end_at,
                lat : this.lat,
                lng : this.lng
              }).then(res => {
                this.globalToast.clear();
                if (res.data.code == 10000) {
                  this.$dialog
                    .alert({
                      message: "核销成功，等待用户确认中！"
                    }).then(res => {
                    this.$router.push({
                      path: '/Menu/Person'
                    })
                  }).catch(err => {
                    this.globalToast.clear();
                    this.$dialog
                      .alert({
                        message: "系统繁忙，请稍后再试!"
                      })
                  })
                }
              }).catch(err => {
                this.globalToast.clear();
                this.isDisable = false;
                this.$dialog
                  .alert({
                    message: "系统繁忙，请稍后再试!"
                  })
              })
            },
            cancel:(res) =>{
              this.$dialog.alert({
                title: '温馨提示',
                message: '接单须先授权获取地理位置！'
              }).then(function () {
               this.hxverto()
              });
            }
          });
        });

      },
      //跳转下一步
      hxbtn() {
        this.$router.push({
          name: 'Hxfill',
          query: {
            card_id: this.$route.query.card_id,
            service_type: this.service_type,
            service_end_at: this.end_at
          }
        })
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .Hxverone {
    height: 100%;
  }
  .Hxverone .Hxver_header {
    text-align: left;
  }
  .Hxverone .Hxver_header ul, .Hxver_radio {
    background: #fff;
    padding: 15px 10px;
    line-height: 28px;
  }
  .Hxverone .Hxver_radio .van-radio__input {
    font-size: 18px;
    line-height: 0;
  }
  .Hxverone .hxinput input::-webkit-input-placeholder {
    color: #c7c7c7 !important;
  }
  .Hxverone .Hxver_header h2 {
    font-size: 18px;
    margin: 15px 10px;
    border-left: 2px solid #499ef0;
    font-family: PingFangSC-Regular;
    letter-spacing: 1px;
  }
  .Hxverone .Hxver_header ul li {
    line-height: 23px;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    display: flex;
    letter-spacing: 1px;
  }
  .Hxverone .header_li {
    border-bottom: 1px solid #c7c7c7;
    margin: 14px 0;
  }
  .Hxverone .Hxver .van-radio {
    line-height: 28px;
  }
  .Hxverone .Hxver .van-button--large {
    width: 300px;
    border-radius: 10px;
    height: 40px;
    background: #499ef0;
    color: #fff;
    line-height: 40px;
    font-size: 18px;
    text-align: center;
    margin-top: 50px;
  }

  .Hxverone .hxinput {
    font-size: 14px;
    background: #fff;
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
    line-height: 22px;
    padding: 10px 10px;
  }

  .Hxverone .hxinput input {
    text-align: center;
    vertical-align: top;
    font-size: 14px;
    background: #fff;
  }

  .Hxverone .hxshow p {
    color: #5f9dea;
    font-size: 10px;
    margin-top: 10px;
    margin-bottom: 29px;
    padding-left: 10px;
    text-align: left;
  }

  .Hxverone .van-button--large {
    width: 80%;
    border-radius: 10px;
    font-size: 18px;
    color: #fff;
    background: #499ef0;
    height: 40px;
    line-height: 40px;
    border: 0;
  }
</style>
