<template>
  <div class="header">
    <div class="header-left">
        <span class="iconfont back-icon">&#xe624;</span>
    </div>
    <div class="header-input">
        <span class="iconfont">&#xe632;</span>
        输入城市/景点/游玩主题
    </div>
    <div class="header-right">
        {{this.city}}
        <span class="iconfont">&#xe62d;</span>
    </div>
  </div>
</template>
<script>
export default{
  name: 'HomeHeader',
  props: {
    city: String
  }
}
</script>
<style lang="stylus" scoped>
    @import '~styles/varibles.styl'
    .header{
        display: flex
        height: .86rem
        background:$bgcolor
        line-height: .86rem
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
        width: 1.24rem
        float: right
        text-align:center
    }
</style>
