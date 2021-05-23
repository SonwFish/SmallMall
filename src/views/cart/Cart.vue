<template>
  <div class="cart">
<!--    导航-->
    <nav-nar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-nar>

<!--    商品列表-->
    <cart-list></cart-list>

<!--    底部汇总-->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavNar from "@/components/common/navbar/NavNar";
import CartList from "@/views/cart/chlidComps/CartList";
import CartBottomBar from "@/views/cart/chlidComps/CartBottomBar";

import {mapGetters} from 'vuex'

export default {
  name: "cart",
  components: {NavNar,CartList,CartBottomBar},
  computed: {
    ...mapGetters(['cartLength','cartList'])
  }
}
</script>

<style scoped>
  .cart {
    height: 100vh;
  }
  .nav-bar {
    background-color: var(--color-tint);
    color: #ffffff;
  }
</style>
