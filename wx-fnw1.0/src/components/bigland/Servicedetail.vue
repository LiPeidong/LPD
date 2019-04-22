<template>
  <div class="Withdetail">
   <!-- 服务明细 -->
   <h2>服务明细</h2>
   <div class="detail" v-show="listShow">
      <ul>
        <li v-for="item in list">
          <p>{{item.basic_product}}</p>
          <p style="text-align:right;"> &yen; {{item.price}}.00</p>
          <p style="color:#878787;font-size:12px;">{{item.time}}</p>
        </li>
      </ul>
   </div>
    <div style="text-align: center; padding-top: 59px ;" v-show="Grashow">
      <img src="../../assets/images/kkry.jpg" alt="" style="width:90px;height: 78px;">
      <p style="margin-top: 22px; color: #686868; font-size: 18px;">暂无服务明细！</p>
    </div>
  </div>
</template>
<script>
  import BASE_URL from "../../constants";
export default {
  name: 'Servicedetail',
  data () {
    return {
      list:[],
      Grashow:false,
      listShow:true,
    }
  },
  mounted(){
    console.log(2222)
  },
  created() {
    console.log(1111)
    this.globalToast = this.$toast.loading({
      duration: 0, // 持续展示 toast
      mask: true, //背景层
      forbidClick: true, // 禁用背景点击
      message: "加载中..."
    });
    this.$http.post(BASE_URL+'/api/buy_services_detailed',{
      orderId : this.$route.query.order_id
    }).then(res => {
      this.globalToast.clear();
      if (res.data.length == 0){
        this.Grashow = true;
        this.listShow = false;
      } else {
        this.Grashow = false;
        this.listShow = true;
        this.list = res.data
      }
      console.log(res)
    }).catch(err => {
      this.globalToast.clear();
      this.$dialog
        .alert({
          message: "系统繁忙，请稍后再试!"
        })
    })
  }
}
</script>

<style scoped>
.Withdetail{height: 100%;}
.Withdetail>h2{font-size: 18px;background: #fff;padding: 12px 20px; font-weight: bold;text-align: left;}
.detail{background: #fff;text-align: left;margin-top: 5px;height: 100%;}
.detail>ul>li{border-bottom: 1px solid #c7c7c7;padding: 10px 20px;}
</style>
