<template>
  <div>
    <div class="top-box">
      <div class="top-img">
      </div>
    </div>
    <div class="code" v-show="isShow">
      <div class="x-img" @click="mousedown">
        <img src="./img/x.png">
      </div>
      <div class="code-img">
        <img src="./img/2dcode.png">
      </div>
      <p class="code-p">扫描二维码关注“蜂鸟窝”微信公众号<br/>
        查看产品详情</p>
    </div>
    <!--套餐1-->
    <div style="background-color: #ffffff">
      <div>
        <p class="p1">包租无忧A</p>
        <p class="p2">每天仅需3毛钱，蜂鸟窝为房东提供全年不限次数的开锁服务和疏通服务，最快30分钟上门，维修更方便，租客更省心！</p>
        <div class="detail">
          <p class="p3" @click="mousedown">点击查看详细内容</p>
        </div>
        <div class="table-box" @click="toBigger0">
          <div class="tableA">
          </div>
        </div>
      </div>
    </div>
    <!--套餐2-->
    <div style="background-color: #fafafa">
      <div>
        <p class="p1">包租无忧B</p>
        <p class="p2">每天仅需7毛钱，蜂鸟窝为房东提供全年不限次、不限价的简单维修和管道疏通、紧急开锁服务，最快30分钟上门，房东更省心，租客能满意！</p>
        <div class="detail">
          <p class="p3" @click="mousedown">点击查看详细内容</p>
        </div>
        <div class="table-box" @click="toBigger1">
          <div class="tableB">
          </div>
        </div>
      </div>
    </div>
    <!--套餐3-->
    <div style="background-color: #ffffff">
      <div>
        <p class="p1">包租无忧C</p>
        <p class="p2">每天仅需1块1，蜂鸟窝提供全年维修不限次、不限价的保姆式维修服务，范围更广，价格更低，最快30分钟上门，房东省钱更省心！</p>
        <div class="detail">
          <p class="p3" @click="mousedown">点击查看详细内容</p>
        </div>
        <div class="table-box" @click="toBigger2">
          <div class="tableC">
          </div>
        </div>
      </div>
    </div>
    <!--套餐4-->
    <div style="background-color: #fafafa">
      <div>
        <p class="p1">包租魔方</p>
        <p class="p2">按需选择，深度定制，蜂鸟窝为您解决最急需的维修服务，最快30分钟上门，全年服务不限次不限价！</p>
        <div class="detail">
          <p class="p3" @click="mousedown">点击查看详细内容</p>
        </div>
        <div class="table-box"  @click="toBigger3" style="max-width: 65.45%; margin-bottom: 29px">
          <div class="tableD">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">



export default {
  name:'Service',
  data() {
    return {
      isShow:false,
      index:0
    }
  },
  methods:{
    mousedown() {
      if(this.isShow)
        this.isShow=false
      else
        this.isShow=true
},
    toBigger0() {
      this.index=0;
      this.toBigger();
    },
    toBigger1() {
      this.index=1;
      this.toBigger();
    },
    toBigger2() {
      this.index=2;
      this.toBigger();
    },
    toBigger3() {
      this.index=3;
      this.toBigger();
    },
    toBigger() {
      let objImg=document.getElementsByClassName("table-box");
      if (objImg[this.index].style.maxWidth != '100%') {
        objImg[this.index].style.maxWidth = '100%'
      }else if(this.index>=0&&this.index<=2&&objImg[this.index].style.maxWidth == '100%') {
        objImg[this.index].style.maxWidth='77.6%'
      }else{
        objImg[this.index].style.maxWidth='65.45%'
      }

    }
  }
}
</script>
<style scoped>

  .p1{
    font-family: "PingFangSC-Regular";
    font-size: 30px;
    text-align:center;
    line-height: 30px;
    letter-spacing:1px;
    font-style: normal;
    color: #333333;
    opacity:1;/*字体的透明度：1：默认样式，0：全透明*/
    margin: 0px auto;
    padding-top: 60px;
  }
  .p2{
    width: 80%;
    font-family: "PingFangSC-Regular";
    font-size: 18px;
    text-align:center;
    line-height: 28px;
    letter-spacing:1px;
    font-style: normal;
    color: #333333;
    opacity:1;/*字体的透明度：1：默认样式，0：全透明*/
    margin: 29px auto;
  }
  .p3{
    font-family: "PingFangSC-Regular";
    font-size: 18px;
    text-align:center;
    line-height: 20px;
    letter-spacing:1px;
    font-style: normal;
    color: #499ef0;
    opacity:1;/*字体的透明度：1：默认样式，0：全透明*/
    margin: 0px auto;
    padding: 13px 44px;
  }
  .code-p{
    font-family: "PingFangSC-Regular";
    font-size: 18px;
    text-align:center;
    line-height: 30px;
    letter-spacing:1px;
    font-style: normal;
    color: #333333;
    margin-top: -5px;
  }
  .top-box{
    max-width: 100%;
    margin-top: 10px;
  }
  .top-img{
    padding-top: 36.61%;
    background: url("./img/service1.png") no-repeat;
    background-size:cover;
    background-position:center;
  }
  .detail{
    width: 241px;
    height: 44px;
    border: 2px #499ef0 solid;
    border-radius: 22px;
    position: relative;
    left: 50%;
    margin-left: -120.5px;
  }
  .detail:hover{
    background-color: #499ef0;
  }
  .p3:hover{
    color: #ffffff;
    cursor: pointer;
  }
  .table-box{
    max-width: 77.6%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 40px;
    padding-bottom: 80px;
  }
  .tableA{
    padding-top: 24.3%;
    background: url("./img/tableA.png") no-repeat;
    background-size:cover;
    background-position:center;
  }
  .tableB{
    padding-top: 32.17%;
    background: url("./img/tableB.png") no-repeat;
    background-size:cover;
    background-position:center;
  }
  .tableC{
     padding-top: 38.2%;
     background: url("./img/tableC.png") no-repeat;
     background-size:cover;
     background-position:center;
   }
  .tableD{
      padding-top: 57.16%;
      background: url("./img/tableD.png") no-repeat;
      background-size:cover;
      background-position:center;
    }
  .code{
    background-color: #ffffff;
    width: 411px;
    height: 432px;
    position:fixed;
    *position:absolute;
    top:50%;
    left:50%;
    margin:-205.5px 0 0 -205.5px;
    border-radius: 20px;
    z-index: 1000;
  }
  .x-img{
    width: 26px;
    height: 26px;
    margin-left: 362px;
    margin-top: 16px;
    cursor: pointer;
  }
  .code-img{
    text-align: center;
    width: 300px;
    height: 300px;
    position: relative;
    left: 50%;
    margin-left: -150px;
    margin-top: 1px;
  }
  @media only screen and (max-width: 650px){
    .p1{
      padding-top: 30px;
    }
    .table-box{
      padding-bottom: 50px;
    }
    .detail{
      width: 150px;
      height: 30px;
      border: 2px #499ef0 solid;
      border-radius: 22px;
      position: relative;
      left: 50%;
      margin-left: -75px;
      margin-top: -10px;
      margin-bottom: -10px;
    }
    .p3{
      font-family: "PingFangSC-Regular";
      font-size: 14px;
      text-align:center;
      line-height: 16px;
      letter-spacing:1px;
      font-style: normal;
      color: #499ef0;
      opacity:1;/*字体的透明度：1：默认样式，0：全透明*/
      margin: 0px auto;
      padding: 8px 14px;
    }

  }
</style>
