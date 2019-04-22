<template>
  <div class="list" style="display:flex;justify-content:center;flex-wrap: wrap;padding-bottom:160px;">
    <div class="item" style="margin-top:20%">
      <img src="../img/jiadian.png" alt="jiadian">
      <p style="margin-top:12px;color: #499ef0;font-size:13px">家电维修</p>
      <div class="call_service">
        <p style="color:#ffffff">呼叫服务</p>
      </div>
    </div>
    <div class="item" style="margin-top:20%">
      <img src="../img/wujin.png" alt="jiadian">
      <p style="margin-top:12px;color: #499ef0;font-size:13px">五金维修</p>
      <div class="call_service">
        <p style="color:#ffffff">呼叫服务</p>
      </div>
    </div>
    <div class="item">
      <img src="../img/guandao.png" alt="jiadian">
      <p style="margin-top:12px;color: #499ef0;font-size:13px">管道疏通</p>
      <div class="call_service">
        <p style="color:#ffffff">呼叫服务</p>
      </div>
    </div>
    <div class="item">
      <img src="../img/kaisuo.png" alt="jiadian">
      <p style="margin-top:12px;color: #499ef0;font-size:13px">家庭开锁</p>
      <div class="call_service">
        <p style="color:#ffffff">呼叫服务</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  
}
</script>
<style scoped>
.list{
  background-image: url('../img/background.png');background-size: cover
}
.item{
  width:154px;height:149px;background-color:#ffffff;border-radius:10px;margin:20px;box-shadow: 0 0 10px rgba(73, 158, 240, 0.1); border:1px solid white
}
.item img{
  width:86px;height:66px;margin-top:10px
}
.call_service{
  font-size: 14px; width: 76px;height: 20px;background-color: #499ef0;border-radius: 10px;margin:0 auto;margin-top:10px
}
.call_service p{
  padding-top:3px
}
</style>


