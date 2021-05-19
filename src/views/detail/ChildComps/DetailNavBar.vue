<template>
  <div>
    <NavNar class="nav-bar">
      <div slot="left" @click="backClick"><img src="~assets/img/common/back.svg"></div>
      <div slot="center" class="title">
        <div v-for="(item,index) in titles" class="title-item"
             :class="{active: currentIndex === index}"
             @click="titleClick(index)"
        >
          {{item}}
        </div>
      </div>
    </NavNar>
  </div>
</template>

<script>
import NavNar from "@/components/common/navbar/NavNar";
export default {
  name: "DetailNavBar",
  data() {
    return {
      titles:['商品','参数','评论','推荐'],
      currentIndex: 0
    }
  },
  components: {
    NavNar
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index
      this.$emit('titleClick',index)
    },
    backClick() {
      this.$router.back()
    }

  }
}
</script>

<style scoped>
.nav-bar {
  position: relative;
  z-index: 9;
  background-color: #ffffff;
}
.nav-bar img{
  margin-top: 15px;
}

.title {
  margin-top: 5px;
  display: flex;
}

.title-item {
  font-size: 15px;
  flex: 1;
}

.active {
  color: var(--color-high-text);
}
</style>
