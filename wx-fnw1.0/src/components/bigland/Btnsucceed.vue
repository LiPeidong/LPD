<template>
  <div class="Submit_bg">
    <!-- 信息提交 -->
    	<div class="Submit_header">
            <van-icon name="checked" size="30px" color="#5b9e46"/>
            <p>提交成功</p>
            <p>工作人员将在2个工作日内联系您</p>
            <van-button size="large" @click="confirm ">确定</van-button>
        </div>
  </div>
</template>

<script>
export default {
  name: "Btnsucceed",
  data() {
    return {

    };
  },
  methods:{
    confirm(){
      this.$router.push({path:'/BigMenu/BigPerson'})
    }
  }
};
</script>
<style scoped>
.Submit_bg{background:#f5f5f5;text-align: center;}
.Submit_header{background: #fff;padding-top: 35px;}
.Submit_header p{font-size: 15px;color: #333;margin: 14px 0 25px 0;}
.van-button--large{width: 80%;border-radius: 10px;height: 40px;line-height: 40px;margin-bottom: 52px;}
.van-button--default{background:#5f9dea;color: #fff;font-size: 18px;}
</style>
