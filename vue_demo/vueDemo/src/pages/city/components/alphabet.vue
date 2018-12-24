<template>
    <ul class="list">
        <li class='item'
        v-for="item of letters"
        v-bind:key="item"
        v-bind:ref="item"
        v-on:click="handleLetterClick"
        v-on:touchstart="handleTouchStart"
        v-on:touchmove="handleTouchMove"
        v-on:touchend="handleTouchEnd"
        >{{item}}</li>
    </ul>
</template>

<script>
export default {
  name: 'CityAlphabet',
  props: {
    cities: Object
  },
  computed: {
    letters () {
      const letters = []
      for (let i in this.cities) {
        letters.push(i)
      }
      return letters
    }
  },
  data () {
    return {
      touchStatus: false,
      startY: 0,
      timer: null
    }
  },
  updated () {
    this.startY = this.$refs['A'][0].offsetTop
  },
  methods: {
    handleLetterClick (e) {
      this.$emit('change', e.target.innerText) // 向父级触发change事件，并携带参数
    },
    handleTouchStart () {
      this.touchStatus = true
    },
    handleTouchMove (e) {
      if (this.touchStatus) {
        if (this.timer) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
          const touchY = e.touches[0].clientY - 79
          const index = Math.floor((touchY - this.startY) / 20)
          console.log('starty' + this.startY)
          console.log('touchy' + touchY)
          console.log('index' + index)
          if (index >= 0 && index < this.letters.length) {
            this.$emit('change', this.letters[index]) // 向父级触发change事件，并携带参数
          }
        }, 20)
      }
    },
    handleTouchEnd () {
      this.touchStatus = false
    }
  }
}
</script>

<style lang="stylus" scoped>
    @import '~styles/varibles.styl'
    .list{
        display: flex
        flex-direction: column
        justify-content: center
        position: absolute
        top: 1.58rem
        right: 0
        bottom: 0
        width: .4rem
        }
    .item{
        line-height: .4rem
        text-align: center
        color: $bgcolor
        }
</style>
