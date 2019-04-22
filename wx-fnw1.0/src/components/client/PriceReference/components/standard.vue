<template>
  <div class="main_part">
    <div class="center">
      <p class="title">标准配件<span style="margin-left:10px;font-size:12px;color: #b7b7b7;">优享品质生活</span></p>
      <div class="list">
        <div class="item">
          <img src="../img/example.png" alt="" >
          <div class="part_info">
            <p>淋浴龙头</p>
            <p style="color:#f68b22">60元<span style="font-size:10px;margin-left:12px">起</span></p>
          </div>
        </div>
        <div class="item">
          <img src="../img/example.png" alt="" >
          <div class="part_info">
            <p>淋浴龙头</p>
            <p style="color:#f68b22">60元<span style="font-size:10px;margin-left:12px">起</span></p>
          </div>
        </div>
        <div class="item">
          <img src="../img/example.png" alt="" >
          <div class="part_info">
            <p>淋浴龙头</p>
            <p style="color:#f68b22">60元<span style="font-size:10px;margin-left:12px">起</span></p>
          </div>
        </div>
        <div class="item">
          <img src="../img/example.png" alt="" >
          <div class="part_info">
            <p>淋浴龙头</p>
            <p style="color:#f68b22">60元<span style="font-size:10px;margin-left:12px">起</span></p>
          </div>
        </div>
        <div class="item">
          <img src="../img/example.png" alt="" >
          <div class="part_info">
            <p>淋浴龙头</p>
            <p style="color:#f68b22">60元<span style="font-size:10px;margin-left:12px">起</span></p>
          </div>
        </div>
        <div class="item">
          <img src="../img/example.png" alt="" >
          <div class="part_info">
            <p>淋浴龙头</p>
            <p style="color:#f68b22">60元<span style="font-size:10px;margin-left:12px">起</span></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  
}
</script>
<style scoped>
.main_part{
  margin:4px 0;
  background-color: #fff;
}
.center{
  width: 96%;
  margin: 0 auto;
  padding-top:10px
}
.title{
  text-align: left;
  font-size: 15px
}
.list{
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap
}
.item{
  margin-top:6px;
  width: 48%;
  height:70px;
  background-color: #fffdfa;
}
.item img{
  margin-top:20px;
  float: left;
  margin-left:10px;
  width: 63px;
  height:33px;
}
.part_info{
  margin-top:18px;
  font-size: 14px
}
.part_info p{
  height:24px
}
</style>
