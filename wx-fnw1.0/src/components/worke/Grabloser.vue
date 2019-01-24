<template>
  <div class="Submit_bg">
    <!-- 抢单失败 -->
    	<div class="Submit_header">
            <van-icon name="clear" size="30px" color="#d32d1f"/>
            <p>抢单失败</p>
            <p>服务已被其他工人抢走</p>
            <van-button size="large">返回</van-button>
        </div>
  </div>
</template>

<script>
export default {
  name: "Grabloser",
  data() {
    return {
     
    };
  },

};
</script>
<style scoped>
.Submit_bg{background:#fff;height: 100%;}
.Submit_header{height: 200px;background: #fff;padding-top: 35px;}
.Submit_header p{font-size: 15px;margin: 15px 0;}
.Submit_header p:nth-child(2){font-size: 18px;}
.van-button--large{width: 80%;border-radius: 10px;}
.van-button--default{background:#5f9dea;color: #fff;font-size: 18px;margin-top: 20px;}
</style>