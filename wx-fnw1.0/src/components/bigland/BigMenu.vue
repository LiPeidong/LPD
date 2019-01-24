<template>
    <div class="tab">
       <router-view></router-view>
       <van-tabbar v-model="active" style=" box-shadow:   0px -10px 10px #fbfbfb;">
             <van-tabbar-item to=/BigMenu/Home>
                <span>首页</span>
                <img slot="icon" slot-scope="props" :src="props.active ? icon.active : icon.normal">
            </van-tabbar-item>
            <van-tabbar-item to=/BigMenu/BigPerson>
                <span>个人中心</span>
                <img slot="icon" slot-scope="props" :src="props.active ? icon1.active : icon1.normal">
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
import BASE_URL from "../../constants";

export default {
  name: "BigMenu",
  data() {
    return {
      active:'0',
      icon: {
        normal: require("../../assets/images/home1.jpg"),
        active: require("../../assets/images/home2.jpg")
      },
      icon1: {
        normal: require("../../assets/images/personal.jpg"),
        active: require("../../assets/images/personal1.jpg")
      }
    };
  },
  created () {
    this.active =this.$route.path === '/BigMenu/BigPerson' ? 1 : 0;
  },
  mounted() {
    // this.key = this.$route.query.key;
    // // 生命周期
    // this.$nextTick(function () {
    // 	// 实例完全插入文档
    // 	var ua = window.navigator.userAgent.toLowerCase();
    // 	if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    // _this3.cartView();
    // 	} else {
    // 		var body = document.querySelector('body');
    // 		body.innerHTML = '请用微信打开此链接';
    // 		body.setAttribute('text-align', 'center');
    // 	}
    //   });
  }    
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tab {
  height: 100%;
  width: 100%;
  background-color: #fff;
  position: fixed;
  bottom: 0px;
}
</style>
