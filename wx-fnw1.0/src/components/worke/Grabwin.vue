<template>
  <div class="Submit_bg">
    <!-- 抢单成功 -->
    	<div class="Submit_header">
            <van-icon name="checked" size="30px" color="#5b9e46"/>
            <p>抢单成功</p>
            <p>请在5分钟之内与用户联系</p>
            <van-button size="large" @click="winto">查看工单详情</van-button>
        </div>
  </div>
</template>

<script>
export default {
  name: "Grabwin",
  data() {
    return {
     card_id:''
    };
  },
  created() {
    this.card_id = this.$route.query.card_id;
  },
  methods:{
    winto(){
      this.$router.push({
        name:'Thisserve',
        query:{
          card_id : this.card_id
        }
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
.van-button--large{width: 80%;border-radius: 10px;}
.van-button--default{background:#5f9dea;color: #fff;font-size: 18px;margin-top: 20px;}
</style>
