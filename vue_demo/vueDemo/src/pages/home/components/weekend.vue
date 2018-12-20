<template>
    <div>
        <div class='title'>周末去哪</div>
        <ul>
            <li class='item border-bottom' v-for="item of recommendList" v-bind:key="item.id">
                <div class='item-img-wrapper'>
                    <img class='item-img' v-bind:src='item.imgUrl'>
                </div>
                <div class='item-info'>
                    <p class='item-title'>{{item.title}}</p>
                    <p class='item-desc'>{{item.desc}}</p>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
  name: 'HomeWeekend',
  data () {
    return {
      recommendList: [{
        id: '0001',
        imgUrl: 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1545277082&di=b911395a81afd950f0bf53e2f592d467&src=http://img.pptjia.com/image/20180117/f4b76385a3ccdbac48893cc6418806d5.jpg',
        title: '大连海洋世界',
        desc: '浪漫大连首站，浪漫的海洋主题乐园'
      }, {
        id: '0001',
        imgUrl: 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1545277082&di=b911395a81afd950f0bf53e2f592d467&src=http://img.pptjia.com/image/20180117/f4b76385a3ccdbac48893cc6418806d5.jpg',
        title: '大连海洋世界',
        desc: '浪漫大连首站，浪漫的海洋主题乐园'
      }, {
        id: '0001',
        imgUrl: 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1545277082&di=b911395a81afd950f0bf53e2f592d467&src=http://img.pptjia.com/image/20180117/f4b76385a3ccdbac48893cc6418806d5.jpg',
        title: '大连海洋世界',
        desc: '浪漫大连首站，浪漫的海洋主题乐园'
      }, {
        id: '0001',
        imgUrl: 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1545277082&di=b911395a81afd950f0bf53e2f592d467&src=http://img.pptjia.com/image/20180117/f4b76385a3ccdbac48893cc6418806d5.jpg',
        title: '大连海洋世界',
        desc: '浪漫大连首站，浪漫的海洋主题乐园'
      }]
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import '~styles/mixins.styl'
  .title{
      margin-top: .2rem
      line-height: .8rem
      background: #eee
      text-indent: .2rem
      }
  .item-img{
      width:100%
      }
  .item-img-wrapper{
      overflow:hidden
      height:0
      padding-bottom:33.9%
  }
  .item-info{
      padding:.1rem
  }
  .item-title{
      line-height: .54rem
      font-size: .32rem
      ellipsis()
  }
  .item-desc{
      line-height: .4rem
      color: #ccc
      ellipsis()
      }
</style>
