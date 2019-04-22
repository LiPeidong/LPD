<template>
  <!--<div>-->
  <p class="p1">{{ msg }}</p>
  <!--</div>-->
</template>

<script>

  export default {
    name: "AboutTest",
    data() {
      return{
        msg:"“蜂鸟窝”由四川家快保科技有限公司创立的房屋维保服务平台，总部位于成都市成华区，是成华区创新服务重点平台、电子科技大学科技园重点企业。 \n" +
          "  “蜂鸟窝”为房屋所有者、租赁者、销售者以及第三方托管机构提供房屋维保服务，包括管道疏通、开锁、家电（电视机、冰箱、空调、洗衣机、热水器等）维修清洗、五金维修、房屋保洁等一系列标准化服务，同时针对客户需求提供产品定制化服务。 \n" +
          "    “蜂鸟窝”团队80%来源于BAT等一线互联网公司，拥有丰富的互联网运营经验，自主研发的SaaS系统，打通了用户、商家、匠人之间的壁垒，高效的管理系统，降低商家获客成本、管理成本、提升ARPU值；便捷的下单流程，一键呼叫，就近派单，为用户提供了专业、优质、低价的维保服务。\n" +
          "  “蜂鸟窝”坚持以持续创新为客户不断提供优质的服务，始终以服务为核心，不断打磨服务标准，通过技术创新和服务创新，打造国内领先的房屋维保服务平台。"
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
