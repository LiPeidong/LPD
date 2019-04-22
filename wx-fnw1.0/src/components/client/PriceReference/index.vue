<template>
  <div class="main">
    <banner-part></banner-part>
    <standard-part></standard-part>
    <activity-part></activity-part>
    <bottom-part class="bottom"></bottom-part>
  </div>
</template>
<script>
import BannerPart from './components/banner.vue'
import BottomPart from './components/bottom.vue'
import StandardPart from './components/standard.vue'
import ActivityPart from './components/activity.vue'
export default {
  components:{
    BannerPart,
    BottomPart,
    StandardPart,
    ActivityPart
  }
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
