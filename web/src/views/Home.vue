<template>
  <div>
    <!-- start of swiper  -->
    <swiper :options="swiperOptions">
      <swiper-slide>
        <img
          class="w-100"
          src="../assets/images/1152bf8bae5e8a4fabf9b34fa77c736c.jpeg"
          alt=""
        />
      </swiper-slide>
      <swiper-slide>
        <img
          class="w-100"
          src="../assets/images/b4558806797eb3d3161a3d3049d55f11.jpeg"
          alt=""
        />
      </swiper-slide>
      <swiper-slide>
        <img
          class="w-100"
          src="../assets/images/7ef4f711b3a90460033034c0d10abd61.jpeg"
          alt=""
        />
      </swiper-slide>
      <div
        class="swiper-pagination pagination-home text-right px-3 pb-1"
        slot="pagination"
      ></div>
    </swiper>
    <!-- end of swiper  -->

    <!-- start of nav -->
    <div
      class="nav-icons bg-white mt-3 d-flex flex-wrap flex-column text-center pt-4 text-dark-1"
    >
      <div class="d-flex flex-wrap list" :class="{ down: foldIcon }">
        <div class="nav-item mb-3">
          <i class="sprite sprite-news"></i>
          <div class="py-2">爆料站</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-story"></i>
          <div class="py-2">故事站</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-shop"></i>
          <div class="py-2">周边商城</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-taste"></i>
          <div class="py-2">体验服</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-comers"></i>
          <div class="py-2">新人专区</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-extend"></i>
          <div class="py-2">荣耀·传承</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-camp"></i>
          <div class="py-2">王者营地</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-wx"></i>
          <div class="py-2">公众号</div>
        </div>
        <div class="nav-item mb-3">
          <img
            class="nav-icon"
            src="../assets/images/version-icon.png"
            alt=""
          />
          <div class="py-2">版本介绍</div>
        </div>
        <div class="nav-item mb-3">
          <img class="nav-icon" src="../assets/images/djhj.png" alt="" />
          <div class="py-2">对局环境</div>
        </div>
        <div class="nav-item mb-3">
          <img class="nav-icon" src="../assets/images/wxwzt.png" alt="" />
          <div class="py-2">无限王者团</div>
        </div>
        <div class="nav-item mb-3">
          <img class="nav-icon" src="../assets/images/cyhdy.png" alt="" />
          <div class="py-2">创意互动营</div>
        </div>
      </div>
      <div
        class="fold bg-light py-3 d-flex jc-center ai-center"
        @click="foldIcon = !foldIcon"
      >
        <span class="fold-icon" :class="{ down: foldIcon }"></span>
        <span class="fold-txt">{{ foldIcon ? "展开" : "收起" }}</span>
      </div>
    </div>
    <!-- end of nav -->

    <!-- start of news -->
    <m-list-card icon="cc-menu-circle" title="新闻资讯" :categories="newsCats">
      <!-- 这里#item连接 ListCard里slot name="item" -->
      <template #items="{ category }">
        <router-link
          tag="div"
          :to="`/articles/${news._id}`"
          v-for="(news, i) in category.newsList"
          :key="i"
          class="py-2 fs-lg d-flex"
        >
          <span class="text-info">[{{ news.categoryName }}]</span>
          <span class="px-2">|</span>
          <span class="flex-1 text-dark text-ellipsis pr-2">{{
            news.title
          }}</span>
          <span class="text-grey-1 fs-sm">{{ news.createdAt | date }}</span>
        </router-link>
      </template>
    </m-list-card>
    <!-- end of news -->

    <!-- start of hero -->
    <m-list-card icon="cc-menu-circle" title="英雄列表" :categories="heroCats">
      <!-- 这里#item连接 ListCard里slot name="item" -->
      <template #items="{ category }">
        <div class="d-flex flex-wrap" style="margin: 0 -0.5rem">
          <router-link
            tag="div"
            :to="`/heroes/${hero._id}`"
            v-for="(hero, i) in category.heroList"
            :key="i"
            class="p-2 text-center"
            style="width: 20%"
          >
            <img :src="hero.avatar" alt="" class="w-100" />
            <div>{{ hero.name }}</div>
          </router-link>
        </div>
      </template>
    </m-list-card>

    <m-list-card icon="shipin-" title="精彩视频" :categories="videoCats">
      待续
    </m-list-card>
  </div>
</template>

<script>
//格式化日期的模块
import dayjs from "dayjs";
export default {
  filters: {
    date(val) {
      // 两位数的月份和两位数的日期
      return dayjs(val).format("MM/DD");
    },
  },
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: ".pagination-home",
        },
      },
      newsCats: [],
      heroCats: [],
      videoCats:[],
      foldIcon: false,
    };
  },
  methods: {
    async fetchNewsCats() {
      const res = await this.$http.get("news/list");
      this.newsCats = res.data;
    },
    async fetchHeroCats() {
      const res = await this.$http.get("heroes/list");
      this.heroCats = res.data;
    },
  },
  created() {
    this.fetchHeroCats();
    this.fetchNewsCats();
  },
};
</script>

<style lang="scss">
@import "../assets/scss/variables";
.pagination-home {
  .swiper-pagination-bullet {
    border-radius: 0.1538rem;
    opacity: 1;
    background-color: map-get($colors, "white");
    &.swiper-pagination-bullet-active {
      background-color: map-get($colors, "info");
    }
  }
}
.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .list {
    &.down {
      overflow: hidden;
      height: 4.6154rem;
    }
    .nav-item {
      width: 25%;
      border-left: 1px solid $border-color;
      &:nth-child(4n + 1) {
        border: none;
      }
    }
  }
}
.fold {
  .fold-icon {
    margin-right: 0.5rem;
    padding-top: 0.6rem;
    width: 0.7692rem;
    height: 0.7692rem;
    border-top: 1px solid #333;
    border-right: 1px solid #333;
    transform: rotate(-45deg);
    &.down {
      margin-bottom: 0.5rem;
      transform: rotate(-225deg);
    }
  }
}
</style>
