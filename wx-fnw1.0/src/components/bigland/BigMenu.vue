<template>
    <div class="tab">
       <router-view @goPerson="goPerson" @goGrabsingle="goGrabsingle"></router-view>
       <van-tabbar v-model="active" style=" box-shadow:   0px -10px 10px #fbfbfb;">
             <van-tabbar-item :to="{path:'/BigMenu/Home',query:{big_land_id : big_land_id}}">
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
      big_land_id:'',
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
    this.$dialog.close();
    this.active =this.$route.path === '/BigMenu/BigPerson' ? 1 : 0;
    this.big_land_id = localStorage.getItem('big_land_id')

  },
  methods:{
    goPerson(){
      this.active = 1
    },
    goGrabsingle(){
      this.active = 0
    },
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
