<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body{height: 100%;letter-spacing: 1px;font-family:PingFangSC-Regular ;}
body input{letter-spacing: 1px;}
body textarea{letter-spacing: 1px;}
#app {
  font-family:PingFangSC-Regular;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
  color: #333;

}
body .el-date-picker{
  width: 100% ;
}
</style>
