<template>
    <div class="tab">
       <router-view @goPerson="goPerson" @goGrabsingle="goGrabsingle"></router-view>
       <van-tabbar v-model="active">
             <van-tabbar-item to=/menu/Grabsingle>
                <span>抢单池</span>
                <img slot="icon" slot-scope="props" :src="props.active ? icon.active : icon.normal">
            </van-tabbar-item>
            <van-tabbar-item to=/menu/Person>
                <span>个人中心</span>
                <img slot="icon" slot-scope="props" :src="props.active ? icon1.active : icon1.normal">
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<script>
import BASE_URL from "../../constants";
import Person from "@/components/worke/Person";
import Grabsingle from "@/components/worke/Grabsingle";
export default {
  name: "Menu",
  data() {
    return {
      active:'0',
      icon: {
        normal: require("../../assets/images/grab.jpg"),
        active: require("../../assets/images/grab1.jpg")
      },
      icon1: {
        normal: require("../../assets/images/personal.jpg"),
        active: require("../../assets/images/personal1.jpg")
      }
    };
  },
  created () {
    this.$dialog.close();
    this.active =this.$route.path === '/menu/person' ? 1 : 0;
  },
  mounted() {
    if (document.title == '个人中心') {
      this.active = 1;
    }else {
      this.active = 0;
    }
    this.key = this.$route.query.key;
    // 生命周期
    this.$nextTick(function () {
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
  methods:{
    goPerson(){
      this.active = 1
    },
    goGrabsingle(){
      this.active = 0
    }
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
