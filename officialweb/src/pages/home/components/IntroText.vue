<template>
  <!--<div>-->
    <p class="p1">{{ msg }}</p>
  <!--</div>-->
</template>

<script>

    export default {
        name: "IntroTest",
      data() {
          return{
            msg:"“蜂鸟窝”由四川家快保科技有限公司创立的房屋维保服务平台，为房屋所有者、租赁者、销售者以及第三方托管机构提供房屋维保服务，包括管道疏通、开锁、家电（电视机、冰箱、空调、洗衣机、热水器等）维修清洗、五金维修、房屋保洁等一系列标准化服务，同时针对客户需求提供产品定制化服务。"
          }
      }

    }
</script>

<style scoped>
  .p1{
    font-family: "PingFangSC-Regular";
    font-size: 18px;
    text-align:left;
    line-height: 29px;
    letter-spacing: 1px;
    font-style: normal;
    color: #333333;
    opacity:1;/*字体的透明度：1：默认样式，0：全透明*/
    margin: 58px auto;
    width: 77.66%;
    height: auto;
    word-wrap:break-word;
    word-break:break-all;
    overflow: hidden;
    text-indent: 2rem;
  }
  @media only screen and (max-width: 650px){
    .p1{
     margin-top: -30px;
      margin-bottom: 30px;
    }
  }
</style>
