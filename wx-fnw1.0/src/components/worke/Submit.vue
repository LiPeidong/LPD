<template>
  <div class="Submit_bg">
    <!-- 提交审核 -->
    	<div class="Submit_header">
            <van-icon name="checked" size="20px" color="#5b9e46"/>
            <p>注册申请已提交，审核将在3-5个工作日后完成</p>
            <van-button size="large" @click="confirm ">确定</van-button>
        </div>
  </div>
</template>

<script>
export default {
  name: "Submit",
  data() {
    return {
     
    };
  },
  methods:{
    confirm(){
      this.$router.push({path:'/Auditin'})
    }
  }
};
</script>
<style scoped>
.Submit_bg{background:#f5f5f5;text-align: center;}
.Submit_header{height: 200px;background: #fff;padding-top: 35px;}
.Submit_header p{font-size: 15px;color: #5b9e46;margin: 14px 0 25px 0;}
.van-button--large{width: 80%;border-radius: 10px;}
.van-button--default{background:#5f9dea;color: #fff;font-size: 18px;}
</style>