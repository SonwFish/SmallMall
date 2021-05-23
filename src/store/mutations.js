export default {
  // mutation唯一的目的就是修改state中的状态
  // mutation中的每个方法尽可能完成一件事情
  AddCounter(state,payload) {
    payload.count ++
  },
  AddToCart(state, payload) {
    payload.checked = true
    state.cartList.push(payload)
  }
}
