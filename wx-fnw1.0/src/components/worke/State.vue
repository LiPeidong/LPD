<template>
  <div class="State_bg">
    <!--提交申诉 -->
    	<div class="Submit_header">
            <van-icon name="checked" size="30px" color="#5b9e46"/>
            <p>提交成功</p>
            <p>工作人员将在7个工作日内为您处理申诉</p>
            <van-button size="large" @click="stateto">确认</van-button>
        </div>
  </div>
</template>

<script>
export default {
  name: "State",
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