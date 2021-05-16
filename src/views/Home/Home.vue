<template>
  <div id="home">
    <!--  导航栏组件-->
    <NavNar class="home-nav"><div slot="center">购物街</div></NavNar>
    <tab-control :titles="['流行','新款','精选']"
                 @tabClick="tabClick"
                 ref="tabControl1" v-show="isTabFixed"
                 class="tabControl">
    </tab-control>

    <!--滚动Scroll部分-->
    <scroll class="content" ref="scroll" :probe-type="3" :pull-up-load="true"
            @scroll="contentScroll" @pullingUp="loadMore">
      <!--轮播图组件-->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <!--推荐产品组件-->
      <recommend-view :recommends="recommends"></recommend-view>
      <!--特色产品组件-->
      <feature-view></feature-view>

      <!--导航控制组件-->
      <tab-control :titles="['流行','新款','精选']"
                   @tabClick="tabClick"
                   ref="tabControl2"></tab-control>
      <!--商品列表组件-->
      <goods-list :goods="showGoods"></goods-list>
    </scroll>

    <!--返回顶部键组件-->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>

</template>

<script>
  import NavNar from "@/components/common/navbar/NavNar";

  import HomeSwiper from "@/views/Home/childComps/HomeSwiper";
  import RecommendView from "@/views/Home/childComps/RecommendView";
  import FeatureView from "@/views/Home/childComps/FeatureView";

  import TabControl from "@/components/content/tabControl/TabControl";
  import GoodsList from "@/components/content/goods/GoodsList";
  import Scroll from "@/components/common/scroll/Scroll";
  import BackTop from "@/components/content/backTop/BackTop";

  import {getHomeMultidata,getHomeGoods} from "@/network/home";


  export default {
  name: "Home",
  components: {
    FeatureView,
    RecommendView,
    NavNar,
    HomeSwiper,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommends:[],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop',
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultidata()

    // 2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },

    mounted() {

    },
    methods: {
      //事件监听相关的方法
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
                break
          case 1:
            this.currentType = 'new'
                break
          case 2:
            this.currentType = 'sell'
                break
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;

      },

      // 回到顶部
      backClick() {
        this.$refs.scroll.scrollTo(0,0,500)
      },

      // 判断返回图标是否显示
      contentScroll(positon) {
        // 1.判断BackTop是否显示
        this.isShowBackTop = -positon.y > 1000

        // 2.绝对tabControl是否吸顶(position:flex)
        this.isTabFixed = (-positon.y) > this.tabOffsetTop
      },

      //上拉加载更多商品
      loadMore() {
        this.getHomeGoods(this.currentType)
      },

      swiperImageLoad() {
        // 获取tabCont的offsetTop
        // 所有的组件都有一个属性$el：用于获取组件中的元素
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop

      },

      // 网络请求相关的方法
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list,
            this.recommends = res.data.recommend.list
        })
      },

      getHomeGoods(type) {
        //获取页数，并且页数加一
        const page = this.goods[type].page + 1

        getHomeGoods(type,page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          this.$refs.scroll.scroll.refresh()
          this.$refs.scroll.finishPullUp()
        })
      }
    },
}
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    height: 100vh;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .tabControl {
    position: relative;
    top: 44px;
    z-index: 9;
  }

  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

</style>
