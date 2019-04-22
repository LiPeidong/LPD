<template>
  <div class="Hxver1">
    <!-- 核销确认 -->
    <div class="Hxver_header">
      <h2>&ensp;服务信息</h2>
      <ul>
        <li>卡卷编码： {{card_id}}</li>
        <li>用户姓名： {{username}}</li>
        <li>用户电话： {{phone}}</li>
        <li>用户地址： {{address}}</li>
        <li class="header_li"></li>
        <li>服务承接时间： {{start_at}}</li>
        <li>服务完成时间： {{end_at}}</li>
      </ul>
    </div>
    <div class="Hxver_header">
      <h2>&ensp;服务结果</h2>

      <div class="Hxver_radio">
        <van-radio-group v-model="r">
          <van-radio
            :name="index"
            v-for="(item ,index) in itemData"
            :key="index "
          >{{item.content}}
          </van-radio>
        </van-radio-group>
      </div>
    </div>
    <div>
      <div class="hxshow">
        <div class="hx_text" v-show="hxText">
          <textarea placeholder="请输入其他类型" v-model="contents"></textarea>
        </div>
        <div class="Hxver_header" v-show="paretsText">
          <h2>&ensp;配件信息</h2>
          <div class="hx_text" style="padding: 10px 10px 10px 0;">
            <textarea placeholder="请填写配件明细" v-model="part_detail"
                      style="border: 1px solid #ddd;width: 97%;padding-left: 10px;padding-top: 8px;box-sizing: border-box;"></textarea>
          </div>
        </div>

        <div class="hxinput">
          <span style="width: 28%;text-align: left;">维修费用</span>
          <div style="width: 70%;">
          <input type="number" id="inputValue" placeholder="请输入金额" v-model="price" style="width: 81%;text-align: right;">
          <span class="hxspan" style="padding-left: 10px;">元</span>
        </div>
        </div>
        <p>提示：请提示用户上传您和维修家电的合照，以保障后续服务跟踪。</p>
        <van-button size="large" @click="hxverto" style="margin-bottom: 20px;" :disabled="isDisable">确认核销</van-button>
      </div>
    </div>
    <!--<p class="hxborder">-->
      <!--<span>我是有底线的</span>-->
    <!--</p>-->
  </div>
</template>

<script>
  import BASE_URL from "../../constants";

  export default {
    name: "Hxver",
    data() {
      return {
        isDisable:false,
        i: null,
        globalToast: null,
        contents: null,
        price: null,
        service_type: 1,
        card_id: null,
        username: null,
        name: null,
        address: null,
        phone: null,
        start_at: null,
        end_at: null,
        isCheck: false,
        r: 0,
        hxText: false,
        itemData: [
          {content: "已修复，未更换配件"},
          {content: "已修复，并更换配件"},
          {content: "未修复，用户主动放弃修复"},
          {content: "其他"}
        ],
        part_detail: '',
        paretsText: false,
        lat:'',
        lng:'',
        location_time:null
      };
    },
    created() {
      this.globalToast = this.$toast.loading({
        duration: 0, // 持续展示 toast
        mask: true, //背景层
        forbidClick: true, // 禁用背景点击
        message: "加载中..."
      });
      this.$http
        .post(BASE_URL + "/api/get_card_detail", {
          card_id: this.$route.query.card_id
        })
        .then(res => {
          this.globalToast.clear();
          if (res.data.code == -10000) {
            this.$dialog
              .alert({
                message: "工单已被取消!"
              })
              .then(() => {
                this.$router.push({
                  path: "/menu/person"
                });
                return false;
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
          }
        })
        .catch(err => {
          this.globalToast.clear();
          this.$dialog
            .alert({
              message: "系统繁忙，请稍后再试!"
            })
        });
    },
    watch: {
      r: function (index) {
        if (index == 3) {
          this.hxText = true;
        } else {
          this.hxText = false;
        }
        if (index == 1) {
          this.paretsText = true;
        } else {
          this.paretsText = false;
        }
        if (index == 0) {
          this.service_type = 1;
        }
        if (index == 1) {
          this.service_type = 5;
        }
        if (index == 2) {
          this.service_type = 10;
        }
        if (index == 3) {
          this.service_type = 99;
        }
      }
    },
    methods: {
      //确认核销跳转到下一步
      test(num) {
        //判断一串字符是不是全部是数字
        // var reg = /^\d+$/;
        // if (!reg.test(num) == true) {
        //   return false;
        // } else {
        //   return true;
        // }
      },
      hxverto() {
        this.$dialog.confirm({
          title: '温馨提示',
          message: '请确认金额：' + this.price
        }).then(() => {
          this.isDisable = true;
          // if (this.$options.methods.test(this.price, this)) {
            this.globalToast = this.$toast.loading({
              duration: 0, // 持续展示 toast
              mask: true, //背景层
              forbidClick: true, // 禁用背景点击
              message: "加载中..."
            });
            this.$http
              .post(BASE_URL + "/api/verify_card_new_mode", {
                card_id: this.card_id,
                service_type: this.service_type,
                worker_id: localStorage.getItem("workId"),
                contents: this.contents,
                price: this.price,
                end_at: this.end_at,
                part_detail: this.part_detail
              })
              .then(res => {
                if (res.data.code == -10000) {
                  this.$dialog
                    .alert({
                      message: res.data.message
                    })
                    .then(() => {
                      this.$router.push({
                        path: "/menu/person"
                      });
                      return false;
                    });
                }
                if (res.data.code == -20000) {
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
                  this.$dialog
                    .alert({
                      message: '请用户扫码支付！'
                    }).then(() => {
                    this.$router.push({
                      path: "/Hxcode",
                      query: {
                        card_id: this.card_id
                      }
                    });
                  });
                }
                this.globalToast.clear();
              })
              .catch(error => {
                this.globalToast.clear();
                this.$dialog
                  .alert({
                    message: "系统繁忙，请稍后再试!"
                  })
              });
          // } else {
          //   this.$dialog
          //     .alert({
          //       message: "请输入正确费用"
          //     })
          //   this.isDisable = false;
          // }
        }).catch(() => {
          this.globalToast.clear();
          this.isDisable = false;
        });
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .Hxver1 .Hxver_header {
    text-align: left;
  }

  .Hxver1 {
    background: #f5f5f5;
  }

  .Hxver1 .Hxver_header ul,
  .Hxver_radio {
    background: #fff;
    padding: 15px 10px;
  }

  .Hxver1 .Hxver_header h2 {
    font-size: 18px;
    margin: 15px 10px;
    border-left: 2px solid #499ef0;
    font-family: PingFangSC-Regular;
  }

  .Hxver1 .Hxver_header ul li {
    line-height: 23px;
    font-size: 14px;
    font-family: PingFangSC-Regular;
  }

  .Hxver1 .header_li {
    border-bottom: 1px solid #c7c7c7;
    margin: 14px 0;
  }

  .Hxver1 .van-radio {
    line-height: 28px;
  }

  .Hxver1 .van-button--large {
    width: 300px;
    border-radius: 10px;
    height: 40px;
    background: #499ef0;
    color: #fff;
    line-height: 40px;
    font-size: 18px;
    text-align: center;
    margin-top: 29px;
  }

  .Hxver1 .hxinput {
    font-size: 14px;
    background: #fff;
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
    line-height: 22px;

  }

  .Hxver1 .hxinput input {
    text-align: center;
    vertical-align: top;
    font-size: 14px;
    text-align: right;
  }

  .Hxver1 .hxshow p {
    color: #5f9dea;
    font-size: 10px;
    margin-top: 10px;
    padding-left: 10px;
    text-align: left;
  }

  .Hxver1 .hxborder {
    margin: 0 59px;
    position: relative;
    bottom: -60px;
  }

  .Hxver1 .hxborder span {
    position: relative;
    top: 6px;
    left: 0px;
    background: #f5f5f5;
    padding: 0 10px;
    color: #c8c8c8;
  }

  .Hxver1 .hx_text {
    background: #fff;
    text-align: left;
    text-indent: 10px;
    margin-top: 5px;
    height: 50px;
  }
</style>
