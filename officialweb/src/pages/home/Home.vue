<template>
  <div>
    <div class="top-box">
      <div class="top-img">
      </div>
    </div>
    <!--平台介绍-->
    <div>
      <div class="title">
      <p class="p1">平台介绍</p>
      <p class="p2">PLATFORM INTRODUCTION</p>
      <intro-text/>
      </div>
      <div class="second-box">
      <div class="second-img">

      </div>
      </div>
    </div>
     <!--平台优势-->
    <div style="background-color: #fafafa;" class="title">
      <div align="center">
        <p class="p1">平台优势</p>
        <p class="p2">PLATFORM PROFILE</p>
      </div>
      <div class="bbox">
        <img src="./img/ad1.png" alt="" class="ad">
        <img src="./img/ad2.png" alt="" class="ad">
        <img src="./img/ad3.png" alt="" class="ad">
        <img src="./img/ad4.png" alt="" class="ad">
      </div>
    </div>
     <!--合作伙伴-->
    <div class="com-box">
      <p class="p5">合作伙伴</p>
      <p class="p6">PARTNERS</p>
    </div>
    <!--合作伙伴logo-->
    <div style="background-color: #fafafa">
    <div class="com-logo">
      <img class="img1" src="./img/logo1.png" width="161px" height="56px">
      <img class="img2" src="./img/logo2.png" height="97" width="63">
      <img class="img3" src="./img/logo3.png" width="185" height="55">
      <img class="img4" src="./img/logo4.png" width="282" height="56">
      <img class="img5" src="./img/logo5.png" height="54" width="174">
    </div>
    </div>
  </div>
</template>
<script>
  import IntroText from "./components/IntroText";


  export default {
  name:'Home',
  components: {IntroText},
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

  .p5{
    font-family: "PingFangSC-Regular";
    font-size: 24px;
    text-align:center;
    line-height: 29px;
    letter-spacing:1px;
    font-style: normal;
    color: #ffffff;
    opacity:1;/*字体的透明度：1：默认样式，0：全透明*/
    margin: 0px auto;
    padding-top: 30px;
  }
  .p6{
    font-family: "PARTNERS";
    font-size: 24px;
    text-align:center;
    line-height: 27px;
    letter-spacing:1px;
    font-style: normal;
    color: #ffffff;
    opacity:1;/*字体的透明度：1：默认样式，0：全透明*/
    margin: 15px auto;
  }
  .top-box{
    max-width: 100%;
    margin-top: 10px;
  }
  .top-img{
    padding-top: 36.61%;
    background: url("./img/home1.png") no-repeat;
    background-size:cover;
    background-position:center;
  }
  .second-box{
    max-width: 77.66%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 61px;
  }
  .second-img{
    padding-top: 21.51%;
    padding-bottom: 61px;
    background: url("./img/home2.png") no-repeat;
    background-size:cover;
    background-position:center;
  }
  .com-box{
    background-color: #fece4d;
    height: 120px;
    text-align: center;
  }
  .com-logo{
    display: flex;
    max-width: 100%;
    flex-wrap: wrap;
    margin-bottom: 30px;
    /*height: 227px;*/
    background-color: #fafafa;
    align-items: center;
    justify-content: center;
  }
  .com-logo img{
    margin: 60px 48px;
  }
  .bbox{
    display: flex;
    max-width: 100%;
    flex-wrap: wrap;
    justify-content: center;

  }
  .ad{
    width: 235px;
    height: 300px;
    margin: 0 40px 100px 40px;
  }



  @media only screen and (max-width: 878px) {
    .com-logo img {
      margin: 30px 24px;
    }
    .img1 {
      width: 81px;
      height: 28px;
    }

    .img2 {
      width: 32px;
      height: 49px;
    }

    .img3 {
      width: 93px;
      height: 28px;
    }

    .img4 {
      width: 181px;
      height: 28px;
    }

    .img5 {
      width: 87px;
      height: 27px;
    }
  }
  @media only screen and (max-width: 650px){
    .ad{
      width: 117px;
      height: 150px;
      margin: -20px 20px 50px 20px;
    }
    .title{
      padding-top: 26px;
    }
    .second-box{
      margin-bottom: 41px;
    }
    .com-box{
      background-color: #fece4d;
      height: 80px;
      text-align: center;
    }
    .p5{
      font-size: 22px;
      line-height: 24px;
      margin: 0px auto;
      padding-top: 15px;
    }
    .p6{
      font-size: 22px;
      line-height: 25px;
      margin: 8px auto;
    }

  }
  @media only screen and (max-width: 380px){
    .com-logo img {
      margin: 20px 18px;
    }
    .img1 {
      width: 64px;
      height: 22px;
    }

    .img2 {
      width: 25px;
      height: 39px;
    }

    .img3 {
      width: 74px;
      height: 22px;
    }

    .img4 {
      width: 113px;
      height: 22px;
    }

    .img5 {
      width: 70px;
      height: 22px;
    }
  }
</style>

