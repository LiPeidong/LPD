import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
Vue.use(Vuex)
export default new Vuex.Store({
  state: state,
  actions: {
    changeCity (ctx, city) {
      console.log(city)
      ctx.commit('changeCity', city) // actions接收到changeCity后，通过commit方法传递到mutation
    }
  },
  mutations: mutations
})
