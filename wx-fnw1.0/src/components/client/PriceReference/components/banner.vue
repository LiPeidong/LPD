<template>
  <div>
    <img src="../img/banner.png" alt="banner" style="width:100%;height:30%">
    <div class="list">
      <div class="item">
        <img src="../img/wujin.png" alt="" style="width:45px;height:45px">
        <p>五金配件</p>
      </div>
      <div class="item">
        <img src="../img/kongtiao.png" alt="" style="width:45px;height:45px">
        <p>空调配件</p>
      </div>
      <div class="item">
        <img src="../img/reshuiqi.png" alt="" style="width:45px;height:45px">
        <p>热水器配件</p>
      </div>
      <div class="item">
        <img src="../img/suoxin.png" alt="" style="width:45px;height:45px">
        <p>锁芯</p>
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
  background-color:#fff;
  padding-top:10px;
  display: flex;
  justify-content: space-around
}
.item p{
  margin-top:10px;
  padding-bottom: 10px
}
</style>
