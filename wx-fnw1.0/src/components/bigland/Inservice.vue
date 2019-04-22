<template>
  <div class="Hasservice">
    <!-- 服务中房屋 -->
      <div class="Hasservice_list" v-for="(item,index) in dataList" :key="index" v-show="listShow">
      <div class="Hasservice_listher">
        <h2>
          <span>
          {{ item.basic_product_name }}
          </span>
        </h2>
        <h4 style="font-size:16px; color:#ff8431;">服务中</h4>
      </div>
      <div class="Hasservice_listcen">
        <p>姓名：{{ item.orders.name }}</p>
        <p>电话：{{ item.orders.phone }}</p>
        <div style="display: flex">
        <p style="white-space: nowrap">地址：</p><p>{{ item.orders.full_address }}</p>
        </div>
      </div>
    </div>
      <div style="text-align: center; padding-top: 12px; height:100%;background: #fff;" v-show="Grashow">
        <div style="max-width:45%;height:175px;overflow:hidden;margin: 0 auto;">
          <img src="../../assets/images/关于房屋.png" alt="" style="width:100%">
        </div>
        <p style="font-size: 12px;">当前没有正在服务中的房屋</p>
      </div>
  </div>
</template>

<script>
import BASE_URL from "../../constants";
export default {
  name: "Inservice",
  data() {
    return {
      dataList:[],
      Grashow:false,
      listShow:true,
    }
  },
  created() {
    this.globalToast=this.$toast.loading({
      duration:0,
      mask:true,
      forbidClick:true,
      message:"加载中..."
    });
    let bigLandId=localStorage.getItem('big_land_id');
    this.$http.post(BASE_URL+'/api/get_in_service_cards',{
      big_land_id:bigLandId
    }).then(res => {
      this.globalToast.clear();
      if (res.data.cards.length == 0){
        this.Grashow = true;
        this.listShow = false;
      } else {
        this.Grashow = false;
        this.listShow = true;
        this.dataList=res.data.cards;
      }
      console.log(res);
    }).catch(err => {
      this.globalToast.clear();
      this.$dialog
        .alert({
          message:"系统繁忙，请稍后再试！"
        })
    })
  }
};
</script>
<style scoped>
.Hasservice {
  background: #f5f5f5;
  height: 100%;
}

.Hasservice_list {
  width: 355px;
  background: #fff;
  border-radius: 10px;
  margin: 0 auto;
  margin-top: 10px;
  margin-bottom: 10px;
}
.Hasservice_listher {
  display: flex;
  justify-content: space-between;
  padding: 10px 10px 15px 10px;
}
.Hasservice_listher h2 {
  font-size: 16px;
  color: #499ef0;
  border-left: 3px solid #499ef0;
  padding-left: 13px;
  line-height: 15px;
}
.Hasservice_listcen {
  padding-bottom: 10px;
  text-align: left;
  padding-left: 10px;
}
.Hasservice_listcen p {
  line-height: 23px;
}

</style>
