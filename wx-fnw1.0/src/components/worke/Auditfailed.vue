<template>
    <div class="Auditfailed">
    <!-- 审核未通过 -->
        <div class="Audit">
            <div class="Hasservice_listcen">
                <h2>{{name}}  师傅</h2>
                <p>手机号码：{{phone}}</p>
                <p class="content">服务内容：<span v-for="(item,index) in content" :key="index">{{item.name}}</span></p>
                <p>所属商家：{{merchant}}</p>
                <p>服务范围：<span v-for="(item,index) in areaList" :key="index">{{item.name}}</span></p>
                <p class="Hasservice_line"></p>
                <h2>未通过原因</h2>
                <p class="Hasservice_red">{{cause}}</p>
            </div>
            <img src="../../assets/images/shw.jpg" alt="">
        </div>
        <van-button size="large" @click="faild">重新注册</van-button>
    </div>
</template>

<script>
export default {
  name: "Auditfailed",
  data() {
    return {
        name:'',
        phone:'',
        content:'', //服务内柔
        merchant:'', //所属商家
        service:'',
        cause : '', //未通过原因
        areaList:[] //服务范围
    };
  },
  created() {
    let faildata = JSON.parse(localStorage.getItem('failed'));

    this.name = faildata.user.name
    this.phone = faildata.user.phone
    this.content = faildata.user.basicproducts
    this.merchant = faildata.user.service_provider
    this.service = faildata.user.districts
    this.cause = faildata.user.fail_reason
    let datas = {
        open_id: faildata.user.open_id,
        nickname: faildata.user.nickname,
        sex: faildata.user.sex,
        city:faildata.user.city,
        province:faildata.user.province,
        country: faildata.user.country,
        avatar: faildata.user.avatar,
        is_subscribe: faildata.user.is_subscribe,
        basic_products: faildata.basic_products,
        addselect1:faildata.list,
        can_areas:faildata.list,
        service_provider_id:faildata.user.service_provider_id,
        subscribe_at:faildata.user.subscribe_at,
        service_provider:faildata.user.service_provider
    };

    localStorage.setItem('temp', JSON.stringify(datas))
    for(let i = 0; i<this.service.length;i++){
        let isArea = true
       for(let j = 0 ; j < this.service.length ; j++){
           if(this.service[i].id == this.service[j].parent_id) {
               isArea = false
               break
           }
       }
       if(isArea == true){
            this.areaList.push(this.service[i])
       }
    }
    return false
  },
  methods:{
      faild(){
          this.$router.push({name: 'AnewRegister'})
      }
  }
};
</script>
<style scoped>
.Audit{background:#fff;width: 95%;margin: 0 auto;margin-top: 8px;text-align:left;position: relative;}
.Hasservice_listcen{padding:15px 20px; }
.Hasservice_listcen h2{font-size: 18px;line-height: 27px;}
.Hasservice_listcen p{font-size: 13px;line-height: 27px;color: #686868;}
.Hasservice_line{border-bottom: 1px dashed #c7c7c7;margin: 13px 0;}
.Hasservice_red{color:#d10000 !important}
.van-button--large{width: 80%;border-radius: 10px;background-color: #5f9dea;color: #ffffff;font-size: 18px;margin-top: 43px;}
.Audit>img{width: 77px;height: 59px;position: absolute;top: 10px;right: 20px;}
.Hasservice_listcen span{margin-right: 5px;}
</style>
