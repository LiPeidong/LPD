<template>
<div>
    <router-link
    tag="div"
    to="/"
    class="header-abs"
    v-show="showAbs"
    >
        <span class="iconfont header-abs-back">&#xe624;</span>
    </router-link>
    <div
    class="header-fixed"
    v-show="!showAbs"
    v-bind:style="opacityStyle"
    >
        <router-link  to="/" class="header-fixed-back">
        <span class="iconfont header-fixed-back">&#xe624;</span>
        </router-link>
        景点详情
    </div>
</div>
</template>
<script>
export default {
  name: 'DetailHeader',
  data () {
    return {
      showAbs: true,
      opacityStyle: {
        opacity: 0
      }
    }
  },
  methods: {
    handleScroll () {
      console.log('scroll')
      const top = document.documentElement.scrollTop
      if (top > 60) {
        let opacity = top / 140
        opacity = opacity > 1 ? 1 : opacity
        this.opacityStyle = {
          opacity: opacity
        }
        this.showAbs = false
      } else {
        this.showAbs = true
      }
    }
  },
  activated () { // 页面展示的时候执行函数
    window.addEventListener('scroll', this.handleScroll) // 全局的事件，会对其他组件也产生影响
  },
  deactivated () { // 页面即将被隐藏时执行，也就是页面被替换
    window.removeEventListener('scroll', this.handleScroll) // 对全局事件进行解绑
  }
}
</script>
<style lang="stylus" scoped>
     @import '~styles/varibles.styl'
    .header-abs{
        position: absolute
        left: .2rem
        top: .2rem
        width: .8rem
        height: .8rem
        line-height:.8rem
        border-radius: .4rem
        background: rgba(0,0,0,.8)
        text-align: center
    }
    .header-abs-back{
        color:#fff
        font-size: .4rem
    }
    .header-fixed{
        position fixed
        top: 0
        left: 0
        right: 0
        overflow: hidden
        height: $headerHeight
        line-height: $headerHeight
        text-align: center
        color: #fff
        background: $bgcolor
        font-size: .32rem
    }
    .header-fixed-back{
        position: absolute
        top: 0
        left: 0
        width: .64rem
        text-align: center
        font-size: .4rem
        color: #fff
    }
</style>
