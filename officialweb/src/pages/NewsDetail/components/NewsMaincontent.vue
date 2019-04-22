<template>
  <div style="margin-top:10px;margin-bottom:30px">
    <div class="box">
      <div class="img"></div>
    </div>
    <img v-if="btnFlag" class="go-top" src="../img/fanhuidingbu-01.png" @click="backTop"/>
    <div class="nav">
      <img style="display:inline-block" src="../../../assets/home_logo.png">
      <p style="display:inline-block">&nbsp;<span style="cursor:pointer;" @click="toHome">首页>></span><span style="cursor:pointer" @click="toNews">新闻资讯>></span><span style="color: #499ef0;">新闻内容</span></p>
    </div>
    <div class="content">
      <div class="title">{{text.title}}</div>
      <div class="date">{{text.date}}</div>
      <div id="article"></div>
    </div>
  </div>
</template>
<script>

export default {
  name:'NewsMaincontent',
  props:{
    data:Object,

  },
  data(){
    return {
      btnFlag:true,
      text:this.data,
      imgUrl1_1:require("../img/wechat_20181222132957.png"),
      imgUrl1_2:require("../img/wechat_20181222133946.png"),
      imgUrl2_1:require("../img/img_1.jpg"),
      imgUrl2_2:require("../img/img_2.jpg"),
      imgUrl2_3:require("../img/img_3.jpg"),
      imgUrl2_4:require("../img/img_4.jpg"),
      imgUrl2_5:require("../img/img_5.jpg"),
      imgUrl2_6:require("../img/img_6.gif"),
      imgUrl3_1:require("../img/3_1.jpg"),
      imgUrl3_2:require("../img/3_2.jpg"),
      imgUrl3_3:require("../img/3_3.jpg"),
      imgUrl3_4:require("../img/3_4.jpg"),
      imgUrl3_5:require("../img/3_5.jpg"),
      imgUrl4_1:require("../img/4_1.jpg"),
      imgUrl4_2:require("../img/4_2.jpg"),
      imgUrl4_3:require("../img/4_3.gif"),
      imgUrl4_4:require("../img/4_4.jpg"),
      imgUrl4_5:require("../img/4_5.jpg"),
      imgUrl5_1:require("../img/5_1.jpg"),
      imgUrl5_2:require("../img/5_2.jpg"),
      imgUrl5_3:require("../img/5_3.jpg"),
      imgUrl5_4:require("../img/5_4.jpg"),
      imgUrl20190307_1:require("../img/20190307_1.jpg"),
      imgUrl20190307_2:require("../img/20190307_2.jpg"),
      imgUrl20190307_3:require("../img/20190307_3.jpg"),
      imgUrl20190307_4:require("../img/20190307_4.jpg"),
      imgUrl20190307_5:require("../img/20190307_5.jpg"),
      imgUrl20190307_6:require("../img/20190307_6.jpg"),
      imgUrl20190307_7:require("../img/20190307_7.jpg"),
      imgUrl20190307_8:require("../img/20190307_8.jpg")
    }
  },
  mounted:function(){
    console.log('图片地址'+this.imgUrl20190307_1)
    // if(JSON.stringify(this.text)!='{}'){
    //   var obj = JSON.stringify(this.text)
    //   localStorage.setItem("localdata",obj)
    // }
    // else{
    //   var localdata = JSON.parse(localStorage.getItem("localdata"))
    //   this.text = localdata
    // }
    this.text.article = this.text.article
    document.getElementById('article').innerHTML = this.text.article
    window.addEventListener('scroll',this.scrollToTop)
  },
  destroyed:function(){
    window.addEventListener('scroll',this.scrollToTop)
  },
  methods:{
    backTop () {
      let that = this
      let timer = setInterval(() => {
        let ispeed = Math.floor(-that.scrollTop / 5)
        document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed
        if (that.scrollTop === 0) {
          clearInterval(timer)
        }
      }, 16)
    },
 
  // 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
  scrollToTop () {
    let that = this
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    that.scrollTop = scrollTop
    if (that.scrollTop > 60) {
      that.btnFlag = true
    } else {
      that.btnFlag = false
    }
  },
    toHome(){
      this.$router.push('/')
    },
    toNews(){
      this.$router.push('/News')
    }
  }
}
</script>
<style scoped>
.go-top{
  position: fixed;
  bottom:10%;
  right:30px;
  color: #499ef0;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  border:0
}
.nav{
  margin-left:10%;
}
.content{
  max-width: 878px; 
  margin-top:100px;
  margin-right:auto;
  margin-left: auto;
}
.content .title{
  font-size: 24px;
  text-align: center
}
.content .date{
  font-size: 18px;
  text-align: center
}
.box{
        max-width: 100%;
 }
 .img {
         padding-top:30.85%; /* 316 / 1024 */
         background: url("../../../assets/news_banner.png") no-repeat;
          background-size:cover;
          background-position:center;
    }
#article{
  width: 100%;
  margin-left: auto;
  margin-right:auto;
  margin-top:30px;
}
@media only screen and (max-width: 878px){
  .content{
    margin-top:10px
  }
}


</style>