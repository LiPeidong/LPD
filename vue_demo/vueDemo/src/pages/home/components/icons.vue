<template>
  <div class="icons">
      <swiper :options="swiperOption">
        <swiper-slide v-for="(page, index) of pages" v-bind:key="index">
            <div class='icon' v-for="item of page" v-bind:key="item.id">
                <div class='icon-img'>
                <img class='icon-img-content' v-bind:src='item.imgUrl'/>
                </div>
                <p class='icon-desc'>{{item.desc}}</p>
            </div>
        </swiper-slide>
      </swiper>
  </div>
</template>
<script>
export default {
  name: 'HomeIcons',
  props: {
    list: Array
  },
  data () {
    return {
      swiperOption: {
        autoplay: false
      }
    }
  },
  computed: {
    pages () {
      const pages = []
      this.list.forEach((item, index) => {
        const page = Math.floor(index / 8)
        // 返回小于等于index/8的最大整数
        if (!pages[page]) {
          pages[page] = []
        }
        pages[page].push(item)
      })
      return pages
    }
  }
}
</script>
<style lang="stylus" scoped>
    @import '~styles/varibles.styl'
    @import '~styles/mixins.styl'
    .icons >>> .swiper-container{
        height:0
        padding-bottom:50%
    }
    .icons{
        width: 100%
        height:50vw
        margin-top: .1rem
    }

    .icon{
        position: relative
        overflow: hidden
        float:left
        width: 25%
        padding-bottom: 25%
        height:0
    }
    .icon-img{
        position: absolute
        top:0
        left:0
        right:0
        bottom:0.44rem
        box-sizing:border-box
        border:.1rem
    }
    .icon-img-content{
        height:100%
        display: block
        margin: 0 auto
    }
    .icon-desc{
        position:absolute
        left:0
        right:0
        bottom:0
        height:.44rem
        line-height:.44rem
        color:#darkTextColor
        text-align center
        ellipsis()
    }
</style>
