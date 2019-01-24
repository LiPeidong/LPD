<template>
  <div class="all">
    <div class="title">
      <div class="titleName">
        <p>服务结果</p>
      </div>
    </div>
    <div class="resume">
      <div class="resumeBox">
        <p class="a">已维修，更换配件</p>
        <p class="a">配件：电路板</p> 
      </div>
    </div>
    <div class="detail">
      <ul class="Cost unit">
        <li class="">
          <p>维修费用：</p>
          <p class="number">344元</p>
        </li>
        <li>
          <p>平台补贴金额：</p>
          <p class="number">-30元</p>
        </li>
        <li>
          <p>最终支付金额：</p>
          <p class="number">324元</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name:"ServiceResult",
  data () {
    return {

    }
  }
}
</script>
<style scoped>
.all{
  text-align: left
}
.titleName{
  margin:22px 0 22px 15px;
  padding-left:15px;
  border-left:3px solid #5f9dea
}
.titleName p{
  font-size: 15px
}
.resumeBox{
  background-color: #fff;
  margin-bottom:5px;
}
.a{
  padding: 10px 10px 10px 15px;
  font-size: 12px
}
.a:last-child{padding-top:0; color:#333333}
.a:first-child{padding-top:10px ;color:#499ef0}
.detail{
  padding-left: 15px;
  padding-right:15px;
  background-color: #fff;
  height:125px;
  display: flex;
  flex-direction: column;
  justify-content:space-around
}
.unit{
  display: flex;
  height:125px;
  flex-direction: column;
  justify-content:space-around;
}
.unit li{
  color: #333333;
  font-size: 12px;
  border-bottom:1px solid #c7c7c7;
  padding-top:5px;
  padding-bottom:12px
}
.unit li:first-child{padding-top:10px;}
.unit li:last-child{padding-bottom:10px;border-bottom:0;}
.Cost li p{
  display: inline;
}
.number{
  color:#499ef0;
  float:right
}
</style>
