<template>
  <div class="page-skin bg-white" v-if="model">
    <div class="topbar bg-black py-2 px-3 d-flex ai-center">
      <img src="../assets/logo.png" alt="" height="30" />
      <div class="px-2 flex-1">
        <span class="text-white">王者荣耀</span>
        <span class="text-white ml-3">攻略战</span>
      </div>
    </div>
    <swiper :options="swiperOptions">
      <swiper-slide v-for="item in model.skins" :key="item.name">
        <img class="mt-2 img" :src="`${item.banner}`" alt="" />
        <p class="text-center">{{ item.name }}</p>
      </swiper-slide>
      <div class="swiper-pagination pagination-home" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  props: {
    id: { required: true },
  },
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: ".pagination-home",
        },
      },
      model: null,
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`/heroes/${this.id}`);
      this.model = res.data;
    },
  },
  created() {
    this.fetch();
  },
};
</script>

<style lang="scss">
@import "../assets/scss/_variables.scss";
.page-skin {
  height: 100vh;
  .img {
    width: 100vw;
    height: 80vh;
  }

  .swiper-pagination-bullet {
    border-radius: 0.1538rem;
    opacity: 1;
    background-color: map-get($colors, "grey");
    position: relative;
    top: 1.1538rem;
  }
  &.swiper-pagination-bullet-active {
    background-color: map-get($colors, "info");
  }
}
</style>