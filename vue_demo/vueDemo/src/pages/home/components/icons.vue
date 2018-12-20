<template>
  <div class="icons">
      <swiper>
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
  data () {
    return {
      iconList: [{
        id: '0001',
        imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545068104449&di=ccb4310c281548a13580deca0fda082f&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F16%2F11%2F30%2F9320391c4b36c9506c7aa907c40517fc.jpg',
        desc: '景点门票很长的字符串'
      }, {
        id: '0002',
        imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545068104449&di=ccb4310c281548a13580deca0fda082f&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F16%2F11%2F30%2F9320391c4b36c9506c7aa907c40517fc.jpg',
        desc: '滑雪季'
      }, {
        id: '0003',
        imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545068104449&di=ccb4310c281548a13580deca0fda082f&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F16%2F11%2F30%2F9320391c4b36c9506c7aa907c40517fc.jpg',
        desc: '一日游'
      }, {
        id: '0004',
        imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545068104449&di=ccb4310c281548a13580deca0fda082f&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F16%2F11%2F30%2F9320391c4b36c9506c7aa907c40517fc.jpg',
        desc: '动植物园'
      }, {
        id: '0005',
        imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545068104449&di=ccb4310c281548a13580deca0fda082f&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F16%2F11%2F30%2F9320391c4b36c9506c7aa907c40517fc.jpg',
        desc: '泡温泉'
      }, {
        id: '0006',
        imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545068104449&di=ccb4310c281548a13580deca0fda082f&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F16%2F11%2F30%2F9320391c4b36c9506c7aa907c40517fc.jpg',
        desc: '必游榜单'
      }, {
        id: '0007',
        imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545068104449&di=ccb4310c281548a13580deca0fda082f&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F16%2F11%2F30%2F9320391c4b36c9506c7aa907c40517fc.jpg',
        desc: '自然风光'
      }, {
        id: '0008',
        imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545068104449&di=ccb4310c281548a13580deca0fda082f&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F16%2F11%2F30%2F9320391c4b36c9506c7aa907c40517fc.jpg',
        desc: '云南行'
      }, {
        id: '0009',
        imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545068104449&di=ccb4310c281548a13580deca0fda082f&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F16%2F11%2F30%2F9320391c4b36c9506c7aa907c40517fc.jpg',
        desc: '九寨'
      }]
    }
  },
  computed: {
    pages () {
      const pages = []
      this.iconList.forEach((item, index) => {
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
