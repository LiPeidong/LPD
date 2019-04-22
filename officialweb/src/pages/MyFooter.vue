<template>
  <div class="container">
    <div class="content">
      <div class="left">
        <img src='../assets/code.png'>
        <p>扫描关注"蜂鸟窝"</p>
      </div>
      <div class="right">
        <p class="p1">咨询热线:<br/>4008084989</p>
        <p class="p2">公司地址:<br/>成华区二环路东二段508号<br/>万科华茂广场1204</p>
      </div>
    </div>
    <div>
      <p style="font-family: ArialMT;font-size: 12px;">©2008-2019 四川家快保科技有限公司 蜀ICP备14018957号-8</p>
    </div>
  </div>
</template>
<script>
export default {
  name:'MyFooter'
}
</script>
<style scoped>
.container{
  text-align: center;
}
.content{
  display: flex;
  justify-content: center
}
.left p{
  font-family: PingFangSC-Regular;
	font-size: 18px;
  line-height:31px;
  margin-top:0px
}
.right{
  margin-left:30px;
  margin-top:-26px;
  text-align: left;
  line-height:42px
}
.p1{
  font-family: PingFangSC-Regular;
  font-size: 28px;
}
.p2{
  font-size: 18px;
  line-height: 31px;
  margin-top:-8px;
}
@media only screen and (max-width: 878px){
  .right{
    margin-left: 10px;
  }
  .p1{
    font-size: 20px;
    line-height: 30px;
    margin-top: 30px;
  }
  .p2{
    font-size: 16px;
    line-height: 27px;
  }

}
</style>
