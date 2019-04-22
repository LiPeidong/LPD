<template>
  <div class="Hxcode">
    <!-- 核销二维码 -->
    <h3>请用户扫描二维码确认服务信息</h3>
    <img :src="img" alt @click="imgBtn">
    <van-button size="large" class="btn-primary" @click="hxcodeto" >核销完成</van-button>
  </div>
</template>

<script>
import BASE_URL from "../../constants";
export default {
  name: "Hxcode",
  data() {
    return {
      img: "",
      globalToast: null,
      time:null,
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
      .post(BASE_URL + "/api/get_service_provider_pay_code", {
        worker_id: localStorage.getItem("workId"),
        card_id:this.$route.query.card_id
      })
      .then(res => {
        this.globalToast.clear();
        if (res.data.code === 10000) {
          this.img = res.data.qrcode_url;
          console.log(this.img);
          return false;
        }
        if (res.data.code === -10000) {
          this.$dialog.alert({
            message: "系统繁忙，请稍后再试！"
          });
        }
      })
      .catch(err => {
        this.globalToast.clear();
        this.$dialog
          .alert({
            message: "系统繁忙，请稍后再试!"
          })
      });
    // 如果转账功能一旦开通要用这里的逻辑
    this.time = setInterval(()=> {
    this.$http
      .post(BASE_URL + "/api/check_card_pay_or_not", {
        card_id:this.$route.query.card_id
      })
      .then(res => {
        this.globalToast.clear();
        if (res.data.code === 10000) {
          this.$dialog
            .alert({
              message: '核销成功'
            }).then(() => {
            this.$router.push({
              path: "/Menu/Person",
              query:{
                card_id: this.$route.query.card_id
              }
            });
          });
        }
      })
      .catch(err => {
        this.globalToast.clear();
        this.$dialog
          .alert({
            message: "系统繁忙，请稍后再试!"
          })
      });
    },2000)
  },
  destroyed(){
    clearInterval(this.time);
  },
  methods: {
    imgBtn(){
      this.globalToast = this.$toast.loading({
        duration: 0, // 持续展示 toast
        mask: true, //背景层
        forbidClick: true, // 禁用背景点击
        message: "加载中..."
      });
      this.$http.post(BASE_URL+'/api/fresh_qr_code',{
        card_id:this.$route.query.card_id
      }).then(res => {
        this.globalToast.clear();
        this.img = res.data.url;
      }).catch(err => {
        this.globalToast.clear();
        this.$dialog
          .alert({
            message: "系统繁忙，请稍后再试!"
          })
      })
    },
    hxcodeto() {
      this.$router.push({
        path: "/Menu/Person",
        query:{
          card_id: this.$route.query.card_id
        }
      });
    }
  }
};
</script>
<style scoped>
.Hxcode {
  background: #fff;
  height: 100%;
}
.Hxcode > h3 {
  padding: 30px 0 20px 0;
  font-size: 15px;
  font-weight: bold;
}
.Hxcode > img {
  width: 200px;
  margin-bottom: 40px;
}
.van-button--large {
  width: 80%;
}
</style>
