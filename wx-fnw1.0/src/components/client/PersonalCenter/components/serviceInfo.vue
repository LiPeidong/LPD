<template>
  <div class="info">
    <div class="content">
      <div class="top">
        <div class="title">
          <p class="serviceName">电视机维修</p>
          <p class="serviceStatus">使用中</p>
        </div>
      </div>
      <div class="bottom">
        <div class="addressInfo">
          <img class="addressIcon line" src="../img/address.png" />
          <p class="line addressCenter">四川省成都市成华区万科华茂广场1203</p>
        </div>
        <div class="dateInfo">
          <img class="dateIcon line" src="../img/date.png" />
          <p class="line dateCenter">2018-8-12(周一) 13:02</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name:"serviceInfo"
}
</script>
<style scoped>
  .info{
    border-radius: 10px;
    text-align: left;
    width:87%;
    height:119px;
    margin: 15px auto;
    background-color: #fff
  }
  .content{
    padding:15px
  }
  .title p{
    display: inline-block;
  }
  .serviceName{
    border-left:3px solid #499ef0;
    padding-left:10px;
    font-size: 15px
  }
  .serviceStatus{
    font-size: 13px;
    color: #499ef0;
    float:right
  }
  .addressIcon{
    width: 14px;
    height:17px;
    line-height: 17px
  }
  .dateIcon{
    width: 15px;
    height:16px;
    line-height:16px
  }
  .line{
    display: inline-block;
  }
  .addressInfo{
    margin-top:22px
  }
  .dateInfo{
    margin-top:19px
  }
  .addressCenter{
    height:17px;
    line-height: 17px;
    font-size:13px;
    color: #686868;
  }
  .dateCenter{
    height:16px;
    line-height: 16px;
    font-size:13px;
    color: #686868;
  }
</style>
