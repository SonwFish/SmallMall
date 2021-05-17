<template>
  <div class="detail">
    <detail-nav-bar/>
    <scroll class="content">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goodsInfo"></detail-base-info>
      <detail-shop-info :shop="shopInfo"></detail-shop-info>
      <DetailImageInfo :detail-info="detailInfo"></DetailImageInfo>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "@/views/detail/ChildComps/DetailNavBar";
import DetailSwiper from "@/views/detail/ChildComps/DetailSwiper";
import DetailBaseInfo from "@/views/detail/ChildComps/DetailBaseInfo";
import DetailShopInfo from "@/views/detail/ChildComps/DetailShopInfo";
import DetailImageInfo from "@/views/detail/ChildComps/DetailImageInfo";

import Scroll from "@/components/common/scroll/Scroll";

import {getDetail, Goods} from "@/network/detail";


export default {
  name: "Detail",
  components: {DetailSwiper, DetailNavBar, DetailBaseInfo, Scroll, DetailShopInfo, DetailImageInfo},
  data() {
    return {
      iid: null,
      topImages: [],
      goodsInfo: {},
      shopInfo: {},
      detailInfo: {}
    }
  },

  // activated() {
  //   this.iid = this.$route.params.iid
  // },
  created() {
    // 1.获取iid
    this.iid = this.$route.params.iid

    // 2.请求详情数据
    getDetail(this.iid).then(res => {
      // 1.获取数据
      const data = res.result;
      // 2.从res中取出轮播图的数据
      this.topImages = data.itemInfo.topImages

      // 3.创建商品对象
      this.goodsInfo = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

      // 4.取出店铺的信息
      this.shopInfo = data.shopInfo

      // 5.取出详情的信息
      this.detailInfo = data.detailInfo;
    })
  }
}
</script>

<style scoped>
  .detail {
    height: 100vh;
    background-color: #ffffff;
    position: relative;
    z-index: 1;
  }

  .content {
    background-color: #ffffff;
    height: calc(100% - 44px);
  }
</style>
