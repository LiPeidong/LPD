<template>
  <div class="Person">
    <!-- 可结算金额 -->
    <div class="Person_class">
        <div class="Person_classleft">
            <p>可结算金额</p>
            <h2>1000.00<span> 元</span></h2>
        </div>
        <div class="Person_classleft">
            <p style="text-align:right;">提现明细</p>
            <div class="closetx">提现</div>
        </div>
    </div>
     <div class="Hasservice_tab">
         <ul>
          <li  v-for="(item,index) in tab" :class="{active:active==index}" @click="closetab(index)" :key="index">{{item.data}}</li>
        </ul>
        <div class="Hasservice_fl">
             <div class="Hasservice_dat">
              <p>服务次数</p>
              <span>2次</span>
            </div>
            <div class="Hasservice_dat">
              <p>服务金额</p>
              <span>180.00</span>
            </div>
        </div>
    </div>
    <div class="closelist">
      <div class="closeflex">
        <div class="closeimg">
          <img src="../../assets/images/mt.jpg" alt="">
        </div>
        <div class="closetext">
          <div style="display:flex;justify-content:space-between;">
            <h3>疏通服务</h3>
            <p>2018.11.16</p>
          </div>

          <p>四川省成都市成华区万科华茂1204号</p>
          <span>已结算</span>
        </div>
      </div>
      <div class="Hasservice_fl">
             <div class="Hasservice_dat">
              <p>实际结算收入</p>
              <span style="font-size:15px;font-weight:600; ">&yen;8.00</span>
            </div>
            <div class="Hasservice_dat">
              <p>用户付款金额</p>
              <span style="font-size:15px;font-weight:600;">&yen;80.00</span>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Money',
   data() {
    return {
      active:0,
      show:false,
      tab:[
        {data:'今日'},
        {data:'近7日'},
        {data:'近30日'},
        {data:'全部'},
      ]
    }
  },
  methods:{
    closetab(index){
      this.active = index
    }
  }
}
</script>
<style scoped>
  .Person{background:#f5f5f5;height: 100%;}
  .Person_class{display: flex;justify-content:space-between;background: #fff;padding: 0 14px;}
  .Person_class .Person_classleft h2{color: #ff8431;font-size: 24px;}
  .Person_class .Person_classleft h2 span{font-size: 12px;}
  .Person_class .Person_classleft p{font-size: 14px;margin: 18px 0 13px 0;text-align: left;}
   .Person_class .Person_classleft{margin-bottom:19px;}
  .van-tabbar-item--active{color: #499ef0;}
  .van-popup{font-size: 25px;padding: 10px}
  .Hasservice_tab>ul{display: flex; height: 25px;border:1px solid #499ef0;border-radius: 25px;}
  .Hasservice_tab{padding: 10px 10px 0 10px;background: #fff;margin-top: 5px;}
  .Hasservice_tab>ul>li{flex-grow:1;line-height: 25px;color: #499ef0;font-size: 13px;font-family: PingFangSC-Regular;}
  .Hasservice_tab>ul>li:nth-child(1){border-radius: 25px 0 0 25px;}
  .Hasservice_tab>ul>li:nth-child(4){border-radius: 0 25px 25px 0;}
  .Hasservice_tab>ul>li:nth-child(2){border-left:1px solid #499ef0;border-right:1px solid #499ef0;}
  .Hasservice_tab>ul>li:nth-child(3){border-right:1px solid #499ef0;}
  .Hasservice_fl{display: flex;justify-content:space-around;font-size: 12px;color: #333;padding: 20px 0;}
  .Hasservice_fl .Hasservice_dat p{padding-bottom: 10px;}
  .Hasservice_fl .Hasservice_dat span{font-size: 14px;color: #499ef0;}
  .active{background: #499ef0;color: #fff !important;}
  .closetx{background:#499ef0;color: #fff;width: 100px;height: 30px;border-radius: 15px;line-height: 30px;font-size: 18px;}
  .closelist{background:#fff;margin: 10px 10px 0 10px;border-radius: 10px;}
  .closeflex{display: flex;border-bottom: 1px solid #c7c7c7;padding: 10px;}
  .closeimg{width: 48px;height: 48px;border: solid 1px #c7c7c7;padding:10px;}
  .closeimg img{width: 48px;height: 48px;}
  .closetext{text-align: left;margin-left: 12px;line-height: 22px;font-size: 12px;width:100%;}
  .closetext h3{font-size: 14px;font-weight: bold;}
  .closetext span{background: #61c161;font-size: 10px;color: #fff;text-align: center;display:inline-block;
    padding: 0 15px;height: 15px;border-radius: 8px;line-height: 16px;}
  .closep{text-align: right ;padding:13px 10px 13px 0;font-size: 12px;}
  .closep span{font-size: 18px;color:#499ef0; }
</style>
