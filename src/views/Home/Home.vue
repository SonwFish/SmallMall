<template>
  <div id="home">
    <NavNar class="home-nav"><div slot="center">购物街</div></NavNar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
  </div>
</template>

<script>
  import NavNar from "@/components/common/navbar/NavNar";
  import HomeSwiper from "@/views/Home/childComps/HomeSwiper";
  import RecommendView from "@/views/Home/childComps/RecommendView";

  import {getHomeMultidata} from "@/network/home";


  export default {
  name: "Home",
  components: {
    RecommendView,
    NavNar,
    HomeSwiper
  },
  data() {
    return {
      banners: [],
      recommends:[]
    }
  },
  created() {
    // 1.请求多个数据
    getHomeMultidata().then(res => {
      this.banners = res.data.banner.list,
      this.recommends = res.data.recommend.list
    })
  }
}
</script>

<style scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
