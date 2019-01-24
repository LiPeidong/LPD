<template>
  <div class="Hxver group">
    <!-- 组合获取报价 -->
    <div class="select_h3">
      <h3>请选择所需服务&ensp;(可多选)</h3>
      <div class="select_list">
        <ul>
          <li @click="select_btn">
            <div class="select_div">
              <img src="../../assets/images/mt.jpg" alt>
            </div>
            <van-checkbox v-model="checked"  class="select_radio" checked-color="#51af36"></van-checkbox>
            <p>管道疏通</p>
          </li>

        </ul>
      </div>
    </div>
    <div class="Hxver_header">
      <h2 class="active_border">&ensp;房屋信息</h2>
    </div>
    <div class="hxinput">
      <div style="line-height:24px;">
        <span style="line-height:24px;">房屋区域：&ensp;</span>
        <input type="text" placeholder="请选择已有的房屋区域">
      </div>
      <i class="el-icon-arrow-down" style="line-height:25px;"></i>
    </div>
    <div class="hxinput">
      <div>
        <span style="line-height:24px;">房屋年限：&ensp;</span>
        <input type="text" placeholder="请填写房屋年限">
      </div>
      <span class="hxspan" style="line-height:24px;">年</span>
    </div>
    <div class="hxinput">
      <div>
        <span style="line-height:24px;">家电年限：&ensp;</span>
        <input type="text" placeholder="请填写房屋内的家电年限">
      </div>
      <span class="hxspan" style="line-height:24px;">年</span>
    </div>
    <div class="hxinput">
      <div>
        <span style="line-height:24px;">房屋数量：&ensp;</span>
        <input type="text" placeholder="请填写房屋数量">
      </div>
      <span class="hxspan" style="line-height:24px;">套</span>
    </div>
    <div class="hxinput">
      <div>
        <span style="line-height:24px;">联系人：&ensp;&emsp;</span>
        <input type="text" placeholder="请填写联系人姓名">
      </div>
    </div>
    <div class="hxinput">
      <div>
        <span style="line-height:24px;">联系电话：&ensp;</span>
        <input type="text" placeholder="请填写联系电话">
      </div>
    </div>
    <van-button size="large">提交信息获取报价</van-button>
  </div>
</template>

<script>
import BASE_URL from "../../constants";
export default {
  name: "GroupQuote",
  data() {
    return {
      checked: '',
       select_show:true
    };
  },
  methods:{
    select_btn(){
      console.log(this.radio)
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.select_h3 {
  padding-left: 10px;
}
.select_h3 > h3 {
  font-size: 18px;
  text-align: left;
  margin-bottom: 20px;
  padding-top: 14px;
}
.Hxver {
  color: #333 !important;
  background: #fff;
}
.group .Hxver_header {
  text-align: left;
  background: #f5f5f5;
  padding: 10px;
}
.Hxver_header h2 {
  font-size: 15px;
  font-weight: bold;
  font-family: PingFangSC-Regular;
}
.active_border {
  border-left: 3px solid #499ef0;
}
.Hxver  .van-button--large {
  width: 300px;
  border-radius: 10px;
  height: 40px;
  background: #499ef0;
  color: #fff;
  line-height: 40px;
  font-size: 18px;
  text-align: center;
  margin-top: 35px;
  margin-bottom: 62px;
}
.hxinput {
  font-size: 14px;
  padding: 10px 10px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #c7c7c7;
}
.hxinput input {
  vertical-align: top;
  font-size: 14px;
}
.hxinput input::-webkit-input-placeholder {
  /* placeholder颜色  */
  color: #c7c7c7;
  /* placeholder字体大小  */
  font-size: 14px;
}
.select_list > ul {
  padding: 0 12px;
  display: flex;
  flex-wrap: wrap;
  justify-content:space-between;
}
.select_list > ul > li {
  width: 85px;
  margin-right: 10px;
  position: relative;
}

.select_list > ul > li .select_div  {
  height: 85px;
  border: 1px solid #c7c7c7;
  display: flex;
  align-items: center;
  border-radius: 5px;
}
.select_radio{position: absolute;top: 4px;right: -5px;}
.select_radio .van-icon-success{width:15px !important;height: 15px;line-height: 15px;}
.select_radio .van-icon-success::before {font-size:10px;-webkit-transform:scale(0.8);}
.select_list > ul > li >div>img{height: 80px;margin: 0 auto;}
.select_list > ul > li  p{margin: 13px 0 10px 0;}
</style>
