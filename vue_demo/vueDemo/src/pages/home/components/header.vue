<template>
  <div class="header">
    <div class="header-left">
        <span class="iconfont back-icon">&#xe624;</span>
    </div>
    <div class="header-input">
        <span class="iconfont">&#xe632;</span>
        输入城市/景点/游玩主题
    </div>
    <router-link to="/city">
        <div class="header-right">
            {{this.city}}
            <span class="iconfont">&#xe62d;</span>
        </div>
    </router-link>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default{
  name: 'HomeHeader',
  computed: {
    ...mapState(['city'])
  }
}
</script>
<style lang="stylus" scoped>
    @import '~styles/varibles.styl'
    .header{
        display: flex
        height: $headerHeight
        background:$bgcolor
        line-height: $headerHeight
        color: #fff
    }
    .header .header-left{
        width: .64rem
        float: left
    }
    .header-left .back-icon{
        margin-left:.1rem
        font-size: .4rem
    }
    .header .header-input{
        flex: 1
        height: .64rem
        margin-top: .12rem
        margin-left: .2rem
        background: #fff
        border-radius: .1rem
        color: #ccc
        line-height: .64rem
        padding-left: .2rem
    }
    .header .header-right{
        min-width: 1.04rem
        float: right
        text-align:center
        color: #fff
    }
</style>
