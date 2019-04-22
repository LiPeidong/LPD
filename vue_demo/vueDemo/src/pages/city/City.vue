<template>
    <div>
        <city-header></city-header>
        <city-search v-bind:cities="cities"></city-search>
        <city-list v-bind:cities="cities" v-bind:hot="hotCities" v-bind:letter="letter"></city-list>
        <city-alphabet v-bind:cities="cities" v-on:change="handleLetterChange"></city-alphabet>
    </div>
</template>
<script>
import axios from 'axios'
import CityHeader from './components/header'
import CitySearch from './components/search'
import CityList from './components/list'
import CityAlphabet from './components/alphabet'
export default {
  name: 'City',
  components: {
    CityHeader,
    CitySearch,
    CityList,
    CityAlphabet
  },
  data () {
    return {
      cities: {},
      hotCities: [],
      letter: ''
    }
  },
  methods: {
    getCityInfo () {
      axios.get('/static/mock/city.json')
        .then(this.handleGetCityInfoSucc)
    },
    handleGetCityInfoSucc (res) {
      res = res.data
      console.log(res)
      if (res.ret && res.data) {
        this.cities = res.data.cities
        this.hotCities = res.data.hotCities
      }
    },
    handleLetterChange (letter) { // 父级触发change事件后，进行处理
      this.letter = letter
    }
  },
  created () {
    console.log('city页面的created')
  },
  mounted () {
    this.getCityInfo()
  }
}
</script>
<style lang="stylus" scoped>

</style>
