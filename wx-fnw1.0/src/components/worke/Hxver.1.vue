<template>
  <div class="Hxverone">
    <!-- 核销确认 -->
    <div class="Hxver_header">
        <h2>&ensp;服务信息</h2>
        <ul>
          <li>工单编号： TV000001</li>
          <li>用户姓名： 李小鹏</li>
          <li>用户电话： 13545782908</li>
          <li>用户地址： 成华区万科华茂广场 4 栋 1203</li>
          <li class="header_li"></li>
          <li>服务承接时间： 2018 年 2 月 14 日&emsp;14:37:09</li>
          <li>服务完成时间： 2018 年 2 月 14 日&emsp;15:45:33</li>
        </ul>
    </div>
     <div class="Hxver_header">
        <h2>&ensp;服务结果</h2>
        <div class="Hxver_radio">
          <van-radio-group v-model="radio">
            <van-radio  :name="index" v-for="(item ,index) in itemData" :key="index" @click="hxChange(index)">{{item.content}}</van-radio>

          </van-radio-group>
        </div>
    </div>
   <div>
        <div class="hxshow" v-if="hxshow">
          <div class="hxinput" >
              <span style="font-weight:600">维修金额</span>
            <div>
                    <input type="text" placeholder="请输入金额"  v-model="isCheck" >
                    <span class="hxspan">元</span>
              </div>
          </div>
          <p>提示：请提示用户上传您和维修家电的合照，以保障后续服务跟踪。</p>
          <van-button size="large" @click="hxverto" :disabled="!isCheck" >确认核销</van-button>
        </div>
      <van-button size="large" v-if="showbtn" @click="hxbtn">下一步</van-button>
   </div>

      <p class="hxborder"><span>我是有底线的</span></p>
  </div>
</template>

<script>
export default {
  name: "Hxver",
  data() {
    return {
      isCheck: false,
      radio: '1',
      hxshow:false ,
      showbtn:false,
      itemData : [
        {content:'已修复，未更换配件'},
        {content:'已修复，并更换配件'},
        {content:'未修复，用户主动放弃修复'},
        {content:'未修复，配件已停产'}
      ]
    }
  },
  methods:{
    hxChange(index){
     if(index==1){
        this.showbtn = true
       this.hxshow = false
     }else{
       this.hxshow = true
        this.showbtn = false

     }
    },
    //确认核销跳转到下一步
    hxverto(){
      this.$router.push({
        name:'Hxcode'
      })
    },
    hxbtn(){
      this.$router.push({
        name:'Hxfill'
      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.Hxverone .Hxver_header{text-align: left;}
.Hxverone .Hxver_header ul,.Hxver_radio{background: #fff;padding: 15px 10px;}
.Hxverone .Hxver_header h2{font-size: 18px;font-weight: 600;margin: 15px 10px;border-left: 2px solid #499ef0;font-family: PingFangSC-Regular;}
.Hxverone .Hxver_header ul li{line-height: 23px;font-size: 14px;font-family: PingFangSC-Regular;}
.Hxverone .header_li{border-bottom: 1px solid #c7c7c7;margin: 14px 0;}
.Hxverone .Hxver .van-radio{line-height: 25px;}
.Hxverone .Hxver .van-button--large{width: 300px;border-radius: 10px;height: 40px;background: #499ef0;color: #fff;line-height: 40px;font-size: 18px;text-align: center;margin-top: 50px;}
.Hxverone .hxinput{font-size:14px;background: #fff;display: flex;justify-content:space-between;margin-top: 5px;line-height: 22px;}
.Hxverone .hxinput input{text-align: center;vertical-align: top;font-size: 14px;}
.Hxverone .hxshow p{color: #5f9dea;font-size: 10px;margin-top:10px;}
.Hxverone .hxborder{margin:0 59px;position: relative;bottom: -60px;}
.Hxverone .hxborder span{position: relative;top: 6px;background: #f5f5f5;padding: 0 10px;	color: #c8c8c8;}
</style>
