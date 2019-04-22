<template>
  <div class="Submit_bg">
    <!-- 服务项目审核 -->
    	<div class="Submit_header">
            <van-icon name="checked" size="25px" color="#5b9e46"/>
            <p>提交成功</p>
            <!--<p>工作人员将在5个工作日内审核该申请</p>-->
            <van-button size="large" @click="checkto">确定</van-button>
        </div>

  </div>
</template>

<script>
export default {
  name: "Servecheck",
  data() {
    return {

    };
  },
  methods:{
    checkto(){
      this.$router.push({
        name :'Person'
      })
    }
  }
};
</script>
<style scoped>
.Submit_bg{background:#fff;height: 100%;}
.Submit_header{height: 200px;background: #fff;padding-top: 35px;}
.Submit_header p{font-size: 15px;margin: 15px 0;}
.Submit_header p:nth-child(2){font-size: 18px;}
.van-button--large{width: 80%;border-radius: 10px;height:40px;line-height: 40px;}
.van-button--default{background:#5f9dea;color: #fff;font-size: 18px;margin-top: 20px;}
</style>
