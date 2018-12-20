<template>
    <div>
        <div class='title'>推荐</div>
        <ul>
            <li class='item border-bottom' v-for="item of recommendList" v-bind:key="item.id">
                <img class='item-img' v-bind:src='item.imgUrl'>
                <div class='item-info'>
                    <p class='item-title'>{{item.title}}</p>
                    <p class='item-desc'>{{item.desc}}</p>
                    <button class='item-button'>查看详情</button>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
  name: 'HomeRecommend',
  data () {
    return {
      recommendList: [{
        id: '0001',
        imgUrl: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2485763305,2926365116&fm=27&gp=0.jpg',
        title: '大连海洋世界',
        desc: '浪漫大连首站，浪漫的海洋主题乐园'
      }, {
        id: '0001',
        imgUrl: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2485763305,2926365116&fm=27&gp=0.jpg',
        title: '大连海洋世界',
        desc: '浪漫大连首站，浪漫的海洋主题乐园'
      }, {
        id: '0001',
        imgUrl: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2485763305,2926365116&fm=27&gp=0.jpg',
        title: '大连海洋世界',
        desc: '浪漫大连首站，浪漫的海洋主题乐园'
      }, {
        id: '0001',
        imgUrl: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2485763305,2926365116&fm=27&gp=0.jpg',
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
  .item{
      display: flex
      height: 1.9rem
      overflow: hidden
      }
  .item-img{
      width: 1.7rem
      height 1.7rem
      padding: .1rem
      }
  .item-info{
      min-width: 0
      flex: 1
      padding: .1rem
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
  .item-button{
      margin-top: .16rem
      background: #ff9300
      padding: 0 .2rem
      border-radius: .06rem
      color: #fff
      line-height: .44rem
      }
</style>
