<template>
<div>
      <div class="Serveproject">
    <!-- 服务项目 -->
       <h3>现有服务项目</h3>
       <p>平台将通过以下项目为您派单</p>
       <div class="Serveproject_list" style="margin-top:25px;">
           <h2>家庭服务</h2>
            <ul class="ul-list">
                <li>管道疏通</li>
            </ul>
       </div>
        <div class="Serveproject_list">
           <h2>家用电器维修</h2>
            <ul class="ul-list">
                <li>电视机</li>
                <li>电冰箱</li>
                <li>热水器</li>
            </ul>
       </div>
        <div class="Serveproject_list">
           <h2>五金配件维修</h2>
            <ul class="ul-list">
                <li>水管阀门</li>
                <li>龙头花洒</li>
                <li>厨卫管件</li>
            </ul>
       </div>
    </div>
    <van-button size="large" class="btn-primary" style="width:80%;margin-top:25px;">添加更多服务</van-button>
</div>
  
</template>

<script>
export default {
  name: "Serveproject",
  data() {
    return {
     
    };
  },

};
</script>
<style scoped>
.Serveproject{background:#fff; padding-bottom: 20px;}
.Serveproject>h3{padding:19px 0 10px 0;font-size: 18px;}
.Serveproject>p{font-size: 10px;color: #686868;}
.Serveproject_list{padding: 0 33px;}
.Serveproject_list h2{text-align: left;font-size: 18px;}
.ul-list li{margin-left: 0;background: #5f9dea;color: #fff;font-size: 14px;height: 25px;width: 24.33%;	border-radius: 25px;line-height: 25px;}

</style>
