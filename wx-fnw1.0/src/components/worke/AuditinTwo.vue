<template>
    <div class="Auditfailed">
    <!-- 扫码进入的审核中 -->
        <div class="Audit">
            <div class="Hasservice_listcen">
                <h2>{{name}}  师傅</h2>
                <p>手机号码：{{phone}}</p>
                <p style="display:flex;flex-wrap:wrap;">服务内容：<span v-for="(item,index) in content" :key="index" style="margin-right:5px;">{{item.name}}</span></p>
                <p>所属商家：{{merchant}}</p>
                <p style="display:flex;flex-wrap:wrap;">服务范围：<span v-for="(item,index) in service" :key="index" style="margin-right:5px;">{{item.name}}</span></p>
                <p class="Hasservice_line"></p>
                <h2>请等待审核</h2>
            </div>
            <img src="../../assets/images/shz.jpg" alt="">
        </div>
    </div>
</template>

<script>
export default {
  name: "AuditinTwo",
  data() {
    return {
        name:'',
        phone:'',
        content:'',
        merchant:'',
        service:[],
    }
  },
  created () {      
     let data = JSON.parse(localStorage.getItem('auditin')) 
    this.name = data.user.name,
    this.phone = data.user.phone,
    this.content = data.user.basicproducts,
    this.merchant = data.user.service_provider,
    this.service = data.user.districts
    this.service.reverse()
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
</style>
