export default {
  addCart(context, payload) {
    //payload新添加的商品
    return new Promise((resolve => {
      // 1.查找之前数组中是否有该商品
      let oldProduct = context.state.cartList.find(item =>
        item.iid == payload.iid
      )

      // 2.判断oldProduct
      if (oldProduct) {
        context.commit('AddCounter',oldProduct)
        resolve('当前的商品数量+1')
      } else {
        payload.count = 1
        context.commit("AddToCart",payload)
        resolve('添加了新的商品')
      }
    }))
  }
}
