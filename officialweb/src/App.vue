<template>
  <div id="app">
    <my-header @status='setStatus'/>
    <div style="margin-top:80px">
      <router-view @news_to_app="news_to_app_data" :app_to_newsdetail="newsdata"/>
      <float/>
    </div>
    <my-footer/>
  </div>
</template>

<script>
import MyHeader from './pages/MyHeader'
import MyFooter from './pages/MyFooter'
import Float from './pages/Float'
export default {
  name: 'App',
  components:{
    MyHeader,
    MyFooter,
    Float
  },
  data(){
    return{
      newsdata:{}
    }
  },
  methods:{
    news_to_app_data(value){
      this.newsdata = value
    },
    setStatus(key){
      switch(key){
        case 0:
          this.$router.push('/')
          break;
        case 1:
          this.$router.push('/')
          break;
        case 2:
          this.$router.push('/Service')
          break;
        case 3:
          this.$router.push('/AboutUs')
          break;
        case 4:
          this.$router.push('/News')
          break;
        default :
        console.log('error')
      }
    }
  },
  created:function(){
    this.$router.push('/')//刷新时回到home
  },
  mounted:function(){
    this.$router.afterEach((to, from, next) => {
        window.scrollTo(0, 0)
      })
  },
  // beforeDestroy:function(){
  //   console.log('asdsadsdasds')
  //   return false
  //   localStorage.removeItem('currentPage')
  // }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
