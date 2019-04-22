<template>
  <news-maincontent :data="newsdata"></news-maincontent>
</template>
<script>
import NewsMaincontent from './components/NewsMaincontent'
export default {
  name:'NewsDetail',
  data(){
    return {
      newsdata:this.app_to_newsdetail
    }
  },
  components:{
    NewsMaincontent
  },
  props:{
    app_to_newsdetail:Object
  },
}
</script>
<style scoped>

</style>