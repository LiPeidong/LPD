<template>
  <div>
    <service-info :data="ajaxdata"></service-info>
    <service-result></service-result>
    <service-picture @picsubmit="getpic"></service-picture>
    <div class="p-10" style="margin: 20px 0 40px;text-align:center;">
      <van-button class="btn-primary" size="large" style="width:80%">确认提交</van-button>
    </div>
  </div>
</template>
<script>
import ServiceInfo from './components/ServiceInfo'
import ServiceResult from './components/ServiceResult'
import ServicePicture from './components/ServicePicture'
export default {
  name:"ServiceDetail",
  data () {
    return {
      ajaxdata:[
        {li:'主页'},
        {li:'日志'},
        {li:'悲伤'},
        {li:'开心'}
      ]
    }
  },
  methods:{
    getpic (kik) {
      console.log(kik)
    }
  },
  components:{
    ServiceInfo,
    ServiceResult,
    ServicePicture
  }  
}
</script>
<style scoped>
</style>