<template>
  <div class="cart">
<!--    导航-->
    <nav-nar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-nar>

<!--    商品列表-->
    <cart-list></cart-list>
  </div>
</template>

<script>
import NavNar from "@/components/common/navbar/NavNar";
import CartList from "@/views/cart/chlidComps/CartList";

import {mapGetters} from 'vuex'

export default {
  name: "cart",
  components: {NavNar,CartList},
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
