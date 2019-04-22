<template>
  <!-- 注册手册 -->
  <div id="before" v-cloak>
    <div class="box">
      <h2>欢迎您注册
        <br>蜂鸟窝家庭维修服务平台
      </h2>
      <p>注册之前，请您仔细阅读平台注册协议及免责声明条款内容及说明，接受协议后方可注册。</p>
      <div style="color:#7e7e7e; font-size: 12px;">
        <div style="display: flex; justify-content:center;">
          <van-checkbox v-model="isCheck" :disabled="!isCheckbox"></van-checkbox>&ensp;
          <div style="line-height: 20px;">
            我已认真阅读并接受
            <a href="http://saas.funlifeday.com/txt-register1.html">《蜂鸟窝平台维修技师注册协议》</a>
            <br>
            <a href="http://saas.funlifeday.com/txt-register2.html" style="line-height:20px;text-align: left">《蜂鸟窝家庭维修服务平台免责声明》</a>
          </div>
        </div>
      </div>
      <div class="p-10" style="margin-top: 30px;text-align:center !important;">
        <van-button size="large" @click="formV" :disabled="!isCheck">下一步</van-button>
      </div>
    </div>
  </div>
</template>

<script>
  import BASE_URL from "../../constants";

  export default {
    name: "RegisterBefore",
    data() {
      return {
        key: "",
        isCheck: false,
        isCheckbox: true,
        name: "", //微信昵称
        nickName: "", //微信昵称
        globalToast: null
      };
    },
    created() {
      this.globalToast = this.$toast.loading({
        duration: 0, // 持续展示 toast
        mask: true, //背景层
        forbidClick: true, // 禁用背景点击
        message: "加载中..."
      });
      this.key = this.$route.query.key;
      this.$http.get(BASE_URL + "/api/get_access_token").then(res => {
        res.data.expires_at = new Date().getTime() + (res.data.expires_in - 20) * 1000;
        localStorage.setItem("tokens", JSON.stringify(res.data));
        this.globalToast.clear();
        // 获取信息
        this.$http
          .get(BASE_URL + "/getUserInfo/" + this.key)
          .then(res => {
            console.log(res);
            if (res.data.code == -10000) {
              this.isCheckbox = false;
              this.$dialog
                .alert({
                  message: "请先关注公众号"
                })
                .then(() => {
                    this.$router.push({
                      path:'/AttentionVipce'
                    })
                });
            }
            if (res.data.code == 20000) {
              this.$dialog
                .alert({
                  message: "资料审核中"
                })
                .then(() => {
                  localStorage.setItem("auditin", JSON.stringify(res.data));
                  this.$router.push({path: "AuditinTwo"});
                  return false;
                });
            }
            if (res.data.code == 30000) {
              this.$dialog
                .alert({
                  message: "该员工已经是某服务商员工"
                })
                .then(() => {
                  localStorage.setItem("openId", res.data.user.open_id);
                  localStorage.setItem("workId", res.data.user.id);
                  this.$router.push({path: "/menu/person"});
                  localStorage.setItem("confirm", JSON.stringify(res.data));
                  return false;
                });
            }
            if (res.data.code == 40000) {
              this.$dialog
                .alert({
                  message: "审核未成功"
                })
                .then(() => {
                  localStorage.setItem("failed", JSON.stringify(res.data));
                  this.$router.push({path: "Auditfailed"});
                  return false;
                });
            }
            if (res.data.code == 50000) {
              this.$dialog
                .alert({
                  message: res.data.message
                })
                .then(() => {
                  this.isCheckbox = false;
                  return false;
                });
            }
            let datas = {
              open_id: res.data.user.original.openid,
              nickname: res.data.user.name,
              sex: res.data.user.original.sex,
              city: res.data.user.original.city,
              province: res.data.user.original.province,
              country: res.data.user.original.country,
              avatar: res.data.user.avatar,
              is_subscribe: res.data.user.is_subscribe,
              basic_products: res.data.basic_products,
              client_basic_product_cate_gory : res.data.client_basic_product_cate_gory,
              service_provider_basic_products : res.data.service_provider_basic_products,
              addselect1: res.data.list,
              can_areas: res.data.list,
              service_provider_id: res.data.user.service_provider_id,
              subscribe_at: res.data.user.subscribe_at,
              service_provider: res.data.user.service_provider
            };
            console.log(datas)
            //提交注册
            localStorage.setItem("temp", JSON.stringify(datas));
            console.log(JSON.parse(localStorage.getItem("temp")));
          });
        })
        .catch(err => {
          this.globalToast.clear();
          this.$dialog
            .alert({
              message: "系统繁忙，请稍后再试!"
            })
        });
    },
    mounted() {
      this.key = this.$route.query.key;
      // 生命周期
      this.$nextTick(() => {
        // 实例完全插入文档
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        } else {
          var body = document.querySelector('body');
          body.innerHTML = '请用微信打开此链接';
          body.setAttribute('text-align', 'center');
        }
      });
    },
    methods: {
      formV() {
        this.$router.push({
          path: "Register",
          name: "Register",
          query: {
            key: this.key
          }
        });
      },
    }
  };
</script>
<style>
  #before .box {
    background: #fff;
    padding: 10px;
    min-height: 100vh;
    text-align: left;
  }

  #before .box h2 {
    margin: 20px 0;
    line-height: 1.6;
  }

  #before .box p {
    padding: 50px 0 100px;
    font-size: 15px;
    line-height: 1.8;
    font-family: PingFangSC-Regular;
  }

  #before .box a {
    color: #489ef0;
  }

  #before .van-checkbox {
    margin: 0;
  }

  #before .box h2 {
    font-size: 24px;
    font-weight: 500;
  }
  #before .van-button{border-radius: 10px !important;}
   .van-button--large {
    width: 80%;
    height: 40px;
    line-height: 40px;
    font-weight: bold;
    font-size: 18px;
  }

  #before .van-dialog__message {
    text-align: center !important;
    font-size: 15px;
  }

  #before .van-hairline--top {
    text-align: center;
  }
van
  #before .van-checkbox__icon .van-icon {
    width: 15px !important;
    height: 15px !important;
    line-height: 15px !important;
    font-size: 10px !important;
  }

  #before .van-button--default {
    background: #489ef0 ;
    color: #fff !important;
  }
</style>

