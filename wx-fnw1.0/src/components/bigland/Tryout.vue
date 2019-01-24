<template>
  <div class="CharterA">
    <!-- 试用产品 -->
    <img src="../../assets/images/shiyongbanner.jpg" alt>
    <div class="CharterA_text">
      <h2>包租试用套餐</h2>
      <div style="display: flex;" class="CharterA_content">
        <h3>套餐内容</h3>
        <div>
          <p>全年不限次数的开锁服务免费试用</p>
          <p>全年不限次数的疏通服务免费试用</p>
        </div>
      </div>
    </div>
    <div class="CharterA_tab">
      <div class="CharterA_tab_title">
        <div
          style="padding-bottom:12px;"
          :class="{CharterA_tab_active:CharterA_tab_active==index}"
          v-for="(item,index) in tabs"
          :key="index"
          @click="tab(index)"
        >{{item}}</div>
      </div>
      <img src="../../assets/images/charter4.jpg" alt v-show="CharterA_tab_img" >
      <div v-show="CharterA_tab_estimate" class="estimate">
        <div class="estimate_flex">
          <img src="../../assets/images/pj.jpg" alt>
          <div style="display:flex; justify-content:space-between;width:100%;">
            <h3>需要开锁的房子</h3>
            <p style="color:#858585;">2018.11.16</p>
          </div>
        </div>
        <p style="margin-bottom:15px;">服务很好，很负责。很快就帮我开了门。绝对五星好评</p>
      </div>
       <div v-show="CharterA_tab_estimate" class="estimate">
        <div class="estimate_flex">
          <img src="../../assets/images/pj.jpg" alt>
          <div style="display:flex; justify-content:space-between;width:100%;">
            <h3>需要开锁的房子</h3>
            <p style="color:#858585;">2018.11.16</p>
          </div>
        </div>
        <p style="margin-bottom:15px;">服务很好，很负责。很快就帮我开了门。绝对五星好评</p>
      </div>
    </div>
    <div>
      <van-button type="default">申请试用</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tryout",
  data() {
    return {
      CharterA_tab_active: 0,
      CharterA_tab_img: true,
      CharterA_tab_estimate: false,
      tabs: ["商品详情", "评价"]
    };
  },
  methods: {
    tab(index) {
      this.CharterA_tab_active = index;
      if (index == 0) {
        this.CharterA_tab_img = true;
      } else {
        this.CharterA_tab_img = false;
      }
      if (index == 1) {
        this.CharterA_tab_estimate = true;
      } else {
        this.CharterA_tab_estimate = false;
      }
    }
  }
};
</script>

<style scoped>
.CharterA {
  background: #fff;
  color: #333;
  height: 100%;
}
.CharterA > img {
  width: 100%;
}
.CharterA_text {
  text-align: left;
  padding: 10px;
  line-height: 28px;
}
.CharterA_text > h2 {
  font-size: 15px;
  font-weight: bold;
}
.CharterA_content {
  font-size: 14px;
  justify-content: space-between;
}
.CharterA_content > h3 {
  font-weight: bold;
}
.CharterA_content p {
  color: #858585;
}
.CharterA_tab_title {
  font-size: 15px;
  display: flex;
  justify-content: space-around;
  border-top: 1px solid #c7c7c7;
  border-bottom: 5px solid #f5f5f5;
  padding: 12px 12px 0 12px;
}
.CharterA_tab_title > div {
  width: 62px;
}
.CharterA_tab_active {
  color: #499ef0;
  border-bottom: 2px solid #499ef0;
}
.CharterA_tab > img {
  width: 100%;
}
.estimate{border-bottom: 1px solid #c7c7c7;}
.estimate_flex {
  display: flex;
  padding: 10px 10px 15px 10px;
  line-height: 30px;
  font-size: 13px;
}
.estimate_flex > img {
  width: 30px;
  height: 30px;
  margin-right: 15px;
}
.van-button--normal{width: 100%;border: 0;color: #fff;background: #f68b22;font-size: 18px;border-radius: 0px;position: fixed;bottom: 0px;left: 0;}
</style>
