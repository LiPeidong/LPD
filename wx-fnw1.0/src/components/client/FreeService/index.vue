<template>
  <div class="main">
    <div>
      <hide-service></hide-service>
    </div>
    <div class="bottom">
      <bottom-part></bottom-part>
    </div>
  </div>
</template>
<script>
//http://localhost:8080/#/client/FreeService
import ShowService from './components/showService.vue'
import HideService from './components/hideService.vue'
import BottomPart from './components/bottom.vue'
export default {
  components: {
      ShowService,
      HideService,
      BottomPart
    },
}
</script>
<style scoped>
.main{
  width: 100%;
  height: 100%;
  position: relative;
}
.bottom{
  position: absolute;
  bottom:0px;
  width:100%
}
</style>


