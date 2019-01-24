<template>
  <div class="Hasservice">
    <!-- 我的工人 -->
    <div class="Hasservice_header">
      <h2>{{headcount}} <span>人</span></h2>
      <p>工人总数</p>
    </div>
    <div class="mywork_list">
      <ul>
        <li v-for="item in datas" @click="toDatail(item.id)">
          <div class="work_img">
            <img src="../../assets/images/work.jpg" alt="">
          </div>
          <div class="mywork_text">
            <div style="font-size:12px;">
               <h3 style="font-size:14px;font-weight:bold;">{{item.name}}</h3>
               <p>本月已服务工单</p>
               <p>本月已服务金额</p>
            </div>
            <div style="text-align:right;color: #499ef0; font-size:14px;">
                <van-rate
                  v-model="value"
                  :size="14"
                  :count="5"
                  color="#ffa800"
                  readonly
                />
                <P>{{item.service_count}}单</P>
                <P>{{item.service_total_price}}元</P>
            </div>
          </div>
        </li>

      </ul>
    </div>
  </div>
</template>

<script>
  import BASE_URL from "../../constants";
export default {
  name: 'Mywork',
   data() {
    return {
      value:3,
      headcount:'0',
      datas:[],
      service_provider_id:null
    }
  },
  created(){
    this.globalToast = this.$toast.loading({
      duration: 0, // 持续展示 toast
      mask: true, //背景层
      forbidClick: true, // 禁用背景点击
      message: "加载中..."
    });
    this.service_provider_id = this.$route.query.service_provider_id;
    console.log('service_provider_id:'+this.service_provider_id)
    this.$http
      .post(BASE_URL + "//api/get_workers", {
        service_provider_id: this.service_provider_id
      })
      .then(res => {
        console.log(res)
        this.headcount = res.data.length;
        this.datas = res.data;
        this.globalToast.clear();
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods:{
    showtab(index){
      this.active = index
    },
    toDatail(worker_id){
      this.$router.push({
        path:'/servedOrder',
        query:{
          worker_id  : worker_id
        }
      })
    }
}

}
</script>
<style scoped>
  .Hasservice{background:#f5f5f5;height: 100%;}
  .Hasservice_header{background:#fff;}
  .Hasservice_header>h2{font-weight: bold; color: #ff8431;font-size: 24px;font-family: PingFangSC-Regular;padding: 20px 0 13px 0;}
  .Hasservice_header>h2>span{font-size: 12px;}
  .Hasservice_header>p{font-size: 14px;padding-bottom: 20px;}
  .mywork_list ul li{display: flex;background: #fff;margin: 10px;padding: 12px 10px;margin-bottom: 10px;}
  .mywork_text{text-align: left;width: 100%;display: flex;justify-content:space-between;margin-left: 11px;line-height: 21px;}
  .work_img img{width: 58px;height: 58px;}
</style>
