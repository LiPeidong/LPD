<template>
  <div class="all">
    <div class="title">
      <div class="titleName">
        <p>服务信息</p>
      </div>
    </div>
    <div class="detail">
      <ul class="clientInfo unit">
        <li>用户姓名：{{data}}</li>
        <li>用户电话：1238932423</li>
        <li>用户地址：成华区万科华茂广场4栋1203</li>
      </ul>
      <ul class="timeInfo unit">
        <li>服务发起时间：2018年12月2日 14:00:12</li>
        <li>服务承接时间：2018年12月6日 12:23:12</li>
        <li>服务完成时间：2018年12月6日 12:12:33</li>
      </ul>
      <ul class="WorkerInfo unit">
        <li>服务人员姓名：彭师傅</li>
        <li>服务人员工号：CHUSAD32</li>
        <li>服务人员电话：341222139</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name:"ServiceInfo",
  data () {
    return {
    }
  },
  props:['data']
}
</script>
<style scoped>
.all{
  text-align: left
}
.titleName{
  margin:22px 0 22px 15px;
  padding-left:15px;
  border-left:3px solid #5f9dea
}
.titleName p{
  font-size: 15px
}
.detail{
  padding-left: 15px;
  padding-right:15px;
  background-color: #fff;
  height:248px;
  display: flex;
  flex-direction: column;
  justify-content:space-around
}
.unit{
  padding-bottom: 10px;
  display: flex;
  height:60px;
  flex-direction: column;
  justify-content:space-around;
}

.unit li{
  color: #333333;
  font-size: 12px
}
.unit{
  border-bottom: 1px solid #c7c7c7
}
.unit:last-child{
  border-bottom:0;
}
</style>