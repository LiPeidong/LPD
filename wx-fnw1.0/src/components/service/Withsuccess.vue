<template>
  <div class="State_bg">
    <!--提现申请成功 -->
    	<div class="Submit_header">
            <van-icon name="checked" size="30px" color="#5b9e46"/>
            <p>申请提交成功</p>
            <p>审核通过后提现金额将在7个工作日内转入您的账户</p>
            <van-button size="large" @click="stateto">返回</van-button>
        </div>
  </div>
</template>

<script>
export default {
  name: "Withsuccess",
  data() {
    return {
     
    };
  },
  methods:{
    stateto(){
      this.$router.push({
        name:'Anomaly'
      })
    }
  }
};
</script>
<style scoped>
.State_bg{background:#fff;height: 100%;}
.State_bg .Submit_header{height: 200px;background: #fff;padding-top: 35px;}
.State_bg .Submit_header p{font-size: 15px;margin: 15px 0;}
.State_bg .Submit_header p:nth-child(2){font-size: 18px;}
.van-button--large{width: 80%;border-radius: 10px;}
.van-button--default{background:#5f9dea;color: #fff;font-size: 18px;margin-top: 20px;}
</style>