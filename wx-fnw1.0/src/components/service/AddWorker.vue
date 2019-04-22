<template>
    <div class="addWorker">
      <!--添加工人-->
      <div class="addWorker_tecxt">
          <span style="line-height: 33px;">扫描二维码填写信息</span><br />
          <span>审核通过后可成为工人</span>
      </div>
      <img :src="url+qr_img" alt="">
    </div>
</template>

<script>
    export default {
      name: "AddWorker",
      data(){
          return {
            qr_img:'',
            url:'http://saas.funlifeday.com/storage/'
          }
      },
      created() {
          this.qr_img = localStorage.getItem('qr_img');

      }
    }
</script>

<style scoped>
  .addWorker{background: #FFF;height: 100%;}
.addWorker_tecxt{font-size: 15px;padding-top:26px;}
</style>
