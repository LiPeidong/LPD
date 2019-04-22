<template>
  <div class="Hasservice">
    <!-- 异常工单 -->
    <div v-show="false">
      <div class="Hasservice_list">
        <div class="Hasservice_listher">
          <h2><span></span>疏通服务</h2>
          <label>工单异常</label>
        </div>
        <div class="Hasservice_listcen">
          <p>姓名：李某某</p>
          <p>电话：184XXXX9826</p>
          <p>地址：四川省成都市成华区万科华茂1204号</p>
          <p>接单时间：2018年11月16日   15:35:49</p>
          <p>完成时间：2018年11月16日   16:35:49</p>
        </div>
        <div class="Hasservice_listpic">
          <p>异常原因：图片不符</p>
        </div>
      </div>
      <div class="Hasservice_list">
        <div class="Hasservice_listher">
          <h2><span></span>疏通服务</h2>
          <label>申诉中</label>
        </div>
        <div class="Hasservice_listcen">
          <p>姓名：李某某</p>
          <p>电话：184XXXX9826</p>
          <p>地址：四川省成都市成华区万科华茂1204号</p>
          <p>接单时间：2018年11月16日   15:35:49</p>
          <p>完成时间：2018年11月16日   16:35:49</p>
        </div>
        <div class="Hasservice_listpic">
          <p>异常原因：图片不符</p>
        </div>
      </div>
      <div class="Hasservice_list">
        <div class="Hasservice_listher">
          <h2><span></span>疏通服务</h2>
          <label>申诉失败</label>
        </div>
        <div class="Hasservice_listcen">
          <p>姓名：李某某</p>
          <p>电话：184XXXX9826</p>
          <p>地址：四川省成都市成华区万科华茂1204号</p>
          <p>接单时间：2018年11月16日   15:35:49</p>
          <p>完成时间：2018年11月16日   16:35:49</p>
        </div>
        <div class="Hasservice_listpic">
          <p>异常原因：图片不符</p>
        </div>
        <div class="Hasservice_listpic">
          <p>申诉失败原因：图片不符</p>
        </div>
      </div>
    </div>
    <div style="text-align: center; padding-top: 12px; height:100%;background: #fff;" v-show="true">
      <div style="max-width:45%;height:175px;overflow:hidden;margin: 0 auto;">
        <img src="../../assets/images/关于服务及订单.png" alt="" style="width:100%">
      </div>
      <p style="font-size: 12px;">您没有异常工单</p>
    </div>
  </div>
</template>

<script>
export default {
       name: 'ServiceAnomaly',
       data() {
         return {
         }
  },
}
</script>
<style scoped>
  .Hasservice{background:#f5f5f5;height: 100%;}
   .Hasservice_list{background: #fff;margin-bottom: 5px;}
   .Hasservice_listher{display: flex;justify-content:space-between;padding: 15px 10px 15px 10px;font-size: 16px;}
   .Hasservice_listher h2{color: #499ef0;border-left: 3px solid  #499ef0;padding-left:13px;}
   .Hasservice_listher label{color: #e60000;}
   .Hasservice_listcen{border-bottom: 1px solid #c7c7c7;padding-bottom: 10px;text-align: left;padding-left: 10px;}
   .Hasservice_listcen p{line-height: 24px;}
   .Hasservice_listpic{text-align: left;padding: 10px ;font-size: 12px;border-bottom: 1px solid #c7c7c7;color: #e60000;}
   .active{background: #499ef0;color: #fff !important;}
   .btn-primary{width: 200px;height: 40px;margin: 15px 0;}
  .van-button--normal{font-size: 18px !important;;}
</style>
