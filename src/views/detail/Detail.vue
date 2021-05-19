<template>
  <div class="detail">
    <detail-nav-bar @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goodsInfo"></detail-base-info>
      <detail-shop-info :shop="shopInfo"></detail-shop-info>
      <DetailImageInfo :detail-info="detailInfo" @imgLoad="imageLoad"></DetailImageInfo>
      <detail-params-info ref="params" :param-info="itemParams"></detail-params-info>
      <detailcomment-info ref="comment" :comment-info="commentInfo"></detailcomment-info>
      <goods-list ref="recomment" :goods="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"/>

    <!--返回顶部键组件-->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import DetailNavBar from "@/views/detail/ChildComps/DetailNavBar";
import DetailSwiper from "@/views/detail/ChildComps/DetailSwiper";
import DetailBaseInfo from "@/views/detail/ChildComps/DetailBaseInfo";
import DetailShopInfo from "@/views/detail/ChildComps/DetailShopInfo";
import DetailImageInfo from "@/views/detail/ChildComps/DetailImageInfo";
import DetailParamsInfo from "@/views/detail/ChildComps/DetailParamsInfo";
import DetailcommentInfo from "@/views/detail/ChildComps/DetailcommentInfo";
import DetailBottomBar from "@/views/detail/ChildComps/DetailBottomBar";
import BackTop from "@/components/content/backTop/BackTop";

import GoodsList from "@/components/content/goods/GoodsList";

import Scroll from "@/components/common/scroll/Scroll";

import {getDetail, getRecommend, Goods} from "@/network/detail";
import {debouce} from "@/common/utils";

export default {
  name: "Detail",
  components: {
    DetailBottomBar,
    DetailSwiper,
    DetailNavBar,
    DetailBaseInfo,
    Scroll,
    DetailShopInfo,
    DetailImageInfo,
    DetailParamsInfo,
    DetailcommentInfo,
    GoodsList,
    BackTop
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goodsInfo: {},
      shopInfo: {},
      detailInfo: {},
      itemParams: {},
      commentInfo: {},
      recommends:[],
      themeTopYs: [],
      getThemesTopY: null,
      currentIndex: 0,
      isShowBackTop: false,
    }
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh()
      this.getThemesTopY()
    },
    titleClick(index) {
      console.log(index);
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
    },
    contentScroll(position) {
      // 1.获取y值
      const positionY = -position.y

      // 2.与主题的Y值进行对比
      let length = this.themeTopYs.length
      for (let i = 0; i < length; i++){
        if (this.currentIndex !== i
          &&(( i < length -1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])
          ||(i ===length -1 && positionY >= this.themeTopYs[i]))){
          this.currentIndex = i
          console.log(this.currentIndex);
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }

      // 3.是否显示回到顶部
      this.isShowBackTop = -position.y > 1000

    },

    // 回到顶部
    backClick() {
      this.$refs.scroll.scrollTo(0,0,500)
    },

    addToCart() {
      // 1.获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0];
      product.title = this.goodsInfo.title;
      product.desc = this.goodsInfo.desc;
      product.price = this.goodsInfo.realPrcie;
      product.iid = this.iid;


      // 2.将商品添加到购物车
      // this.$store.commit('addCart',product)
      this.$store.dispatch('addCart',product)
    }
  },
  mounted() {

  },

  updated() {

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

      // 6.取出参数的信息
      this.itemParams = data.itemParams;

      // 7.取出评论信息
      if(data.rate.cRate !== 0){
        this.commentInfo = data.rate.list[0]
      }

      this.$nextTick(() => {
        // 根据最新的数据，对应的DOM是已经被渲染出来
        // 但是图片依然是没有加载玩(目前获取到的offsetTop不包含其中的图片)
        //offsetTop值不对的时候，都是图片的问题

        this.themeTopYs = []

        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recomment.$el.offsetTop);

        console.log(this.themeTopYs);
      })
    })

    // 3.请求推荐数据
    getRecommend().then(res =>{
      this.recommends = res.data.list;
    })

    // 4.给getThemesTopY赋值
    this.getThemesTopY = debouce(() => {
      this.themeTopYs = []

      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recomment.$el.offsetTop);

      console.log(this.themeTopYs);
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
    height: calc(100% - 44px - 49px);
  }
</style>
