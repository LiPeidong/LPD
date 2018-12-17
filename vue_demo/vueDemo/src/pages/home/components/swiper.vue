<template>
<div class="wrapper">
    <swiper :options="swiperOption">
    <!-- slides -->
    <swiper-slide v-for="item of swiperList" v-bind:key='item.id'>
        <img class="swiper-img" v-bind:src="item.imgUrl"/>
    </swiper-slide>
    <!-- Optional controls -->
    <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
</div>
</template>

<script>
export default {
  name: 'HomeSwiper',
  data () {
    return {
      swiperOption: {
        pagination: '.swiper-pagination',
        loop: true
      },
      swiperList: [{
        id: '0001',
        imgUrl: 'http://attach.bbs.miui.com/forum/201303/16/173716jzszx8vbbb0z9o4k.jpg'
      }, {
        id: '0002',
        imgUrl: 'http://imgsrc.baidu.com/imgad/pic/item/21a4462309f79052df1c9eea06f3d7ca7acbd5e7.jpg'
      }
      ]
    }
  }
}
console.log(document.getElementsByClassName('swiper-img'))
</script>

<style lang="stylus" scoped>
    .wrapper >>> .swiper-pagination-bullet-active{
        background: #fff
    }
    .swiper-img{
        width: 100%;
        height: 129px
    }
    .wrapper{
        width: 100%
        height:31.25vw
        background: #eee
    }
</style>
