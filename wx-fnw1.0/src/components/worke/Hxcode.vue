<template>
  <div class="Hxcode">
    <!-- 核销二维码 -->
    <h3>请用户扫描二维码确认服务信息</h3>
    <img :src="img" alt>
    <van-button size="large" class="btn-primary" @click="hxcodeto">已收款</van-button>
  </div>
</template>

<script>
import BASE_URL from "../../constants";
export default {
  name: "Hxcode",
  data() {
    return {
      img: "",
      url: BASE_URL + "/api/upload_qiniu",
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
    this.$http
      .post(BASE_URL + "/api/get_service_provider_pay_code", {
        worker_id: localStorage.getItem("workId"),
        card_id:this.$route.query.card_id
      })
      .then(res => {
        this.globalToast.clear();

        if (res.data.code === 10000) {
          this.img = "http://testimg.funlifeday.com/" + res.data.qrcode_url;
          return false;
        }
        if (res.data.code === -10000) {
          this.$dialog.alert({
            message: "付款失败，请联系相关人员"
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
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
