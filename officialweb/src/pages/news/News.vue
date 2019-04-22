<template>
    <news-list @showDetail="rooter"></news-list>
</template>
<script>
import NewsList from './components/NewsList'
export default {
  name:'News',
  components:{
    NewsList
  },
  methods:{
    rooter(key){
      this.$emit('news_to_app',key)
    }
  }
}
</script>
<style scoped>

</style>