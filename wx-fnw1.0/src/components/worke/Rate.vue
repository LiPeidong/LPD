<template>
 <div>
    <div class="Rate">
    <!-- 评价 -->
    	<div class="rate_img">
        <img src="../../assets/images/pj.jpg" alt="">
        <div class="rate_rig">
            <h2>王师傅</h2>
            <p>服务工号：FL-0280001KS</p>
        </div>
      </div>
      <div class="rate_star">
          <p>请您为本次服务打分</p>
          <van-rate
            v-model="value"
            :size="25"
            color="#ffa800"
          />
          <ul class="ul-list">
            <li>服务态度好</li>
            <li>服务态度好</li>
            <li>服务态度好</li>
            <li>服务态度好</li>
            <li>服务态度好</li>
            <li>服务态度好</li>
          </ul>
          <p class="rate_p" @click="send"><i class="iconfont icon-hongbao"></i><span>给师傅发个感谢红包</span><i class="iconfont icon-xiayibu"></i></p>
      </div>
      <van-popup v-model="show" position="bottom" >
        <div class="rate_popup">
            <div class="rate_top">
              <i class="iconfont icon-cuowu"></i>
              <span>感 谢 红 包</span>
            </div>
            <div class="rate_list">
              <ul>
                <li>2元</li>
                <li>5元</li>
                <li>10元</li>
              </ul>
            </div>
            <p>其他金额 <input type="text" placeholder="任意金额"><span>元</span></p>
            <van-button size="large" class="btn-primary">去支付</van-button>
        </div>
      </van-popup>
  </div>
  <van-button size="large" class="btn-primary">提交</van-button>
 </div>

</template>

<script>
export default {
  name: "Rate",
  data() {
    return {
     value:4,
     show:false
    };
  },
  methods:{
    send(){
     this.show=true
    }
  }
};
</script>
<style scoped>
.Rate{background:#fff;}
.rate_img{display: flex;padding: 10px 20px;border-bottom: 1px solid #c7c7c7;}
.rate_img>img{width: 60px;height: 60px;margin-right: 15px;}
.rate_img .rate_rig{text-align: left;}
.rate_img .rate_rig>h2{font-size: 16px;font-weight: bold;}
.rate_rig,.rate_rig>p,.rate_star>p{font-size: 12px;color: #686868;margin-top: 10px;}
.rate_star>p:nth-child(1){margin:13px 0 15px 0;}
.ul-list{text-align: center;}
.rate_p span{font-size: 13px;font-weight: bold;margin-left:5px;}
.icon-hongbao{color: #fe690b;}
.rate_p{padding-bottom:20px;}
.icon-xiayibu{font-size: 15px;vertical-align:top;}
.van-button--large{width: 95%;margin-top: 30px;}
.rate_list{margin:15px 0 28px 0;}
.rate_list ul{display: flex;justify-content:center;}
.rate_list ul li{width: 84px;height: 25px;border-radius: 5px;border:1px solid #a5a5a5;line-height: 25px;color: #333333;font-size: 13px;}
.rate_list ul li:nth-child(2){margin: 0 15px;}
.rate_top{border-bottom: 1px solid #c7c7c7;line-height: 25px;padding: 15px 0;padding-left: 10px;}
.rate_top>i{font-size: 25px;vertical-align: middle;text-align: left;float: left;}
.rate_top>span{font-size: 15px;font-weight: bold;vertical-align: middle;}
.rate_popup p{border-bottom: 1px solid #c7c7c7;margin: 0 46px 0 44px;text-align: left}
.rate_popup p input{font-size: 12px;margin-bottom: 4px;margin-left: 12px}
.rate_popup p span{text-align: right;float: right;}
.rate_popup .van-button--large{width: 80%;margin: 20px 0}
</style>
