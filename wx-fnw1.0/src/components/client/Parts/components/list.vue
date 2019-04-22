<template>
  <div class="list" style="display:flex;justify-content:space-between;flex-wrap:wrap">
    <div class="item">
      <div class="pic">
        <img src="../img/example.png" alt="">
      </div>
      <p>淋浴水龙头</p>
      <p style="color: #a1a1a1;">参考价<span class="price">30元</span></p>
    </div>
    <div class="item">
      <div class="pic">
        <img src="../img/example.png" alt="">
      </div>
      <p>淋浴水龙头</p>
      <p style="color: #a1a1a1;">参考价<span class="price">30元</span></p>
    </div>
    <div class="item">
      <div class="pic">
      <img src="../img/example.png" alt="">
      </div>
      <p>淋浴水龙头</p>
      <p style="color: #a1a1a1;">参考价<span class="price">30元</span></p>
    </div>
  </div>  
</template>
<script>
export default {
  
}
</script>
<style scoped>

  .list{
    padding-top:10px;
    width: 94%;
    margin: 0 auto
  }
  .pic{
    background-color: #fffdfa;
    height: 103px;
    display: flex;
    justify-content: center;
    align-items: center
  }
  .item{
    width: 49%;
    height: 160px;
    margin-bottom: 10px;
    border-radius: 10px;
    background-color: white
  }
  .list:after {
    content: "";
    flex: auto;
  }
  .item p{
    text-align: left;
    margin-left: 10px;
    margin-top: 10px
  }
  .item .price{
    color: #f68b22;font-size:16px;margin-left:80px
  }
</style>

