<template>
  <div class="Thisserve_bg">
    <!-- 正在服务工单 -->
    <div class="Workdetails_header">
      <P>{{name}}</P>
      <a :href='"tel:"+phone'>联系电话</a>
    </div>
    <div class="Workdetails_details">
      <p>用户名称：{{username}}</p>
      <p style="display: flex;"><span style="white-space: nowrap;">用户地址：</span><span>{{address}}</span></p>
    </div>
    <div class="Workdetails_details">
      <p>接单时间：{{datetime}}&ensp;&ensp;</p>
    </div>
    <van-button
      class="btn-primary"
      size="large"
      style="width:80%;margin-top:25px;height: 40px;line-height: 40px;"
      @click="hxto"
      :disabled="isDisable"
    >核销工单
    </van-button>
    <van-button
      class="btn-primary"
      size="large"
      style="width:80%;margin-top:25px;height: 40px;line-height: 40px;"
      @click="toPerson"
    >返回个人中心
    </van-button>
  </div>
</template>
<script>
  import BASE_URL from "../../constants";

  export default {
    name: "Thisserve",
    data() {
      return {
        name: "",
        isDisable:false,
        username: "",
        address: "",
        datetime: "",
        value: 5,
        number1: 134.0,
        number2: 10.0,
        number3: "",
        card_id: "",
        phone: ""
      };
    },
    created() {
      this.globalToast = this.$toast.loading({
        duration: 0, // 持续展示 toast
        mask: true, //背景层
        forbidClick: true, // 禁用背景点击
        message: "加载中..."
      });
      this.card_id = this.$route.query.card_id;
      localStorage.getItem("workId");
      this.$http
        .post(BASE_URL + "/api/get_card_detail", {
          card_id: this.card_id
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
                return false;
              });
          } else if (res.data.code == 10000) {
            this.username = res.data.card_info.user_name;
            this.name = res.data.card_info.service_type;
            this.address = res.data.card_info.user_address;
            this.datetime = res.data.card_info.service_start_at;
            this.phone = res.data.card_info.user_phone;
          } else if (res.data.code == 20000) {
            this.$router.push({
              name: "Hxcode",
              query: {
                card_id: res.data.card_id
              }
            });
          } else if (res.data.code == 30000) {
            this.$router.push({
              path: "/Menu/Person"
            });
          }
          this.globalToast.clear();
        })
        .catch(err => {
          this.globalToast.clear();
          this.$dialog
            .alert({
              message: "系统繁忙，请稍后再试!"
            })
        });
    },
    methods: {
      hxto() {
        this.isDisable = true;
        this.globalToast = this.$toast.loading({
          duration: 0, // 持续展示 toast
          mask: true, //背景层
          forbidClick: true, // 禁用背景点击
          message: "加载中..."
        });
        this.$http
          .post(BASE_URL + "/api/get_card_detail", {
            card_id: this.card_id
          })
          .then(res => {
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
              if (res.data.card_type == 'client') {
                this.$router.push({
                  name: 'HxBig',
                  query: {
                    card_id: this.card_id
                  }
                })
              } else if (res.data.card_type == 'self') {
                this.$router.push({
                  name: "Hxver",
                  query: {
                    card_id: this.card_id
                  }
                });
              }

            }
            this.globalToast.clear();
          })
          .catch(err => {
            this.globalToast.clear();
            this.isDisable = false;
            this.$dialog
              .alert({
                message: "请稍后再试!"
              })
          });
      },
      toPerson() {
        this.$router.push({
          path: "/menu/Person",
          query: {
            worker_id: localStorage.getItem("workId")
          }
        });
      }
    }
  };
</script>
<style>
  .Thisserve_bg {
    height: 100%;
    color: #333333;
  }

  .Thisserve_bg {
    background: #f5f5f5;
  }

  .Thisserve_bg .Workdetails_header {
    height: 64px;
    background: #fff;
    border-bottom: 1px solid #c7c7c7;
    position: relative;
  }

  .Thisserve_bg .Workdetails_header p {
    font-weight: bold;
    text-align: left;
    line-height: 65px;
    padding-left: 10px;
    font-size: 18px;
    font-family: PingFangSC-Regular;
  }

  .Thisserve_bg .Workdetails_details {
    text-align: left;
    padding-left: 10px;
    font-size: 15px;
    background: #fff;
    padding-bottom: 8px;
    padding-top: 8px;
  }

  .Thisserve_bg .Workdetails_details:nth-child(2) {
    border-bottom: 1px solid #c7c7c7;
  }

  .Thisserve_bg .Workdetails_details p {
    line-height: 28px;
  }

  .Thisserve_bg .Workdetails_header a {
    width: 90px;
    height: 30px;
    border-radius: 15px;
    line-height: 30px;
    position: absolute;
    top: 16px;
    right: 10px;
    color: #fff;
    background: #489ef0;
  }
</style>
