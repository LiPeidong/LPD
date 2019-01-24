<template>
  <div class="Withdraw">
   <!-- 确认提现 -->
   <h2>到账银行卡&emsp;工商银行（0814）</h2>
   <div class="draw">
        <h3>提现金额</h3>
        <p style="font-size:30px;display:flex;line-height:45px;">&yen;&ensp;<input type="text" placeholder="" v-model="money"></p>
        <p>可提现余额￥1000.00 <span style="color:#499ef0;">&ensp;全部提现</span></p>
        <div style="text-align:center;">
            <van-button size="large" class="btn-primary " :disabled="!money"  style="width:80%;margin-top:38px;margin-bottom:51px;">确认提现</van-button>
        </div>
   </div>
  </div>
</template>
<script>
export default {
  name: 'BigWithdraw',
  data(){
    return {
      money:""
    }
  }
}
</script>

<style scoped>
.Withdraw>h2{font-size: 18px;background: #fff;padding: 12px 20px; text-align: left;margin-bottom: 5px;}
.draw{background:#fff;text-align: left;padding: 15px 20px 0 20px;margin-top: 5px;}
.draw p:nth-child(2){border-bottom: 1px solid #050505;text-align: left;}
.draw p:nth-child(3){margin-top: 15px;font-size: 12px;}
.draw p input{font-size: 27px;}
</style>
