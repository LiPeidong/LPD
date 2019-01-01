<template>
    <div>
        <div class="banner" @click="handleBannerClick">
            <img class="banner-img" src="http://img1.qunarzz.com/piao/fusion/1801/1a/94428c6dea109402.jpg_640x200_2cf590d8.jpg">
            <div class="banner-info">
                <div class="banner-title">大连海洋水</div>
                <div class="banner-number banner-icon"><span class="iconfont">&#xe632;</span>39</div>
            </div>
        </div>
        <common-gallary
        v-bind:imgs="imgs"
        v-show="showGallary"
        @close="handleGallaryClose"
        ></common-gallary>
    </div>
</template>
<script>
import CommonGallary from 'common/gallary/Gallary'
export default {
  name: 'DetailBanner',
  data () {
    return {
      showGallary: false,
      imgs: ['http://img1.qunarzz.com/piao/fusion/1801/1a/94428c6dea109402.jpg_640x200_2cf590d8.jpg',
        'http://img1.qunarzz.com/piao/fusion/1801/1a/94428c6dea109402.jpg_640x200_2cf590d8.jpg']
    }
  },
  methods: {
    handleBannerClick () {
      this.showGallary = true
    },
    handleGallaryClose () {
      this.showGallary = false
    }
  },
  components: {
    CommonGallary
  }
}
</script>
<style lang="stylus" scoped>
.banner{
    position relative
    overflow: hidden
    height: 0
    padding-bottom: 55%
}
.banner-img{
    width: 100%
}
.banner-info{
    display: flex
    position: absolute
    left: 0
    right: 0
    bottom: 0
    line-height: .6rem
    color: #fff
    background-image: linear-gradient(top, rgba(0,0,0,0), rgba(0,0,0,0.8))
}
.banner-title{
    flex:1
    color: red
    font-size .32rem
    padding 0 .2rem
}
.banner-number{
    margin-top: .14rem
    padding: 0 .4rem
    line-height: .32rem
    height: .32rem
    border-radius: .2rem
    background: rgba(0,0,0,8)
    font-size .24rem
}
.banner-icon{
    font-size: .24rem
}
</style>
