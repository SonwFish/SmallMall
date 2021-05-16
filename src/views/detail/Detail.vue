<template>
  <div>
    <detail-nav-bar/>
    <detail-swiper :top-images="topImages"></detail-swiper>
  </div>
</template>

<script>
import DetailNavBar from "@/views/detail/ChildComps/DetailNavBar";
import DetailSwiper from "@/views/detail/ChildComps/DetailSwiper";
import {getDetail} from "@/network/detail";


export default {
  name: "Detail",
  components: {DetailSwiper, DetailNavBar},
  data() {
    return {
      iid: null,
      topImages: []
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
    })
  }
}
</script>

<style scoped>

</style>
