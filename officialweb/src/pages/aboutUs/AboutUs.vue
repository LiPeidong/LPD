<template>
  <div>
    <div class="top-box">
      <div class="top-img">
      </div>
    </div>
    <!--平台介绍-->
    <div>
      <div class="title">
        <p class="p1">关于我们</p>
        <p class="p2">ABOUT US</p>
        <about-text/>
      </div>
      <div class="second-box">
        <div class="second-img">

        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import AboutText from "./components/AboutText";
export default {
  name:'AboutUs',
  components:{AboutText}
}
</script>
<style scoped>
  .p1{
    font-family: "PingFangSC-Regular";
    font-size: 24px;
    text-align:center;
    line-height: 29px;
    letter-spacing:1px;
    font-style: normal;
    color: #499ef0;
    opacity:1;/*字体的透明度：1：默认样式，0：全透明*/
    margin: 19px auto;
  }
  .p2{
    font-family: "PLATFORM INTRODUCTION";
    font-size: 24px;
    text-align:center;
    line-height: 27px;
    letter-spacing:0px;
    font-style: normal;
    color: #499ef0;
    opacity:1;/*字体的透明度：1：默认样式，0：全透明*/
    margin: 19px auto 59px auto;
  }
  .title{
    padding-top: 66px;
  }
  .top-box{
    max-width: 100%;
    margin-top: 10px;
  }
  .top-img{
    padding-top: 36.61%;
    background: url("./img/about1.png") no-repeat;
    background-size:cover;
    background-position:center;
  }
  @media only screen and (max-width: 650px){
    .title{
      padding-top: 26px;
    }
  }
</style>
