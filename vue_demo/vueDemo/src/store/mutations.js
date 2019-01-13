export default {
  changeCity (state, city) { // mutation接收到acitions的数据，进行改变状态操作
    state.city = city
    try {
      localStorage.city = city
    } catch (e) {}
  }
}
