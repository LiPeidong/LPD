<template>
  <div class="main_part">
    <div class="center">
      <p class="title">标准配件<span style="margin-left:10px;font-size:12px;color: #b7b7b7;">优享品质生活</span></p>
      <div class="list">
        <div class="item">
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
  margin:6px auto;
  width: 98%;
  height:50px;
  background-color: #d7d7d7;
}
</style>
