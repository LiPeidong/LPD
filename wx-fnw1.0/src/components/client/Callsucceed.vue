<template>
  <div class="Submit_bg">
    <!-- 呼叫成功 -->
    	<div class="Submit_header">
            <van-icon name="checked" size="20px" color="#5b9e46"/>
            <p>呼叫服务成功</p>
            <p>服务工人将在30分钟内上门提供服务</p>
            <van-button size="large" @click="confirm">查看服务详情</van-button>
        </div>
  </div>
</template>

<script>
export default {
  name: "Callsucceed",
  methods:{
    confirm(){
      this.$router.push({
        path:'/userService',
        query:{
          card_id:this.$route.query.card_id
        }
      })
    }
  }
};
</script>
<style scoped>
.Submit_bg{text-align: center;}
.Submit_header{height: 200px;background: #fff;padding-top: 27px;}
.Submit_header p{font-size: 15px;margin: 15px 0;}
.van-button--large{width: 80%;border-radius: 10px;height: 40px;line-height: 40px;}
.van-button--default{background:#5f9dea;color: #fff;font-size: 18px;}
</style>
