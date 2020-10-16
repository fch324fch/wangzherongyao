<template>
  <div class="page-article" v-if="model">
    <div class="d-flex py-3 px-2 border-bottom">
      <div class="iconfont icon-back text-blue"></div>
      <strong class="flex-1 text-ellipsis text-blue pl-2">
        {{ model.title }}
      </strong>
      <div class="text-grey fs-xs">2019-06-19</div>
    </div>
    <div v-html="model.body" class="px-4 article-body fs-xl"></div>
    <div class="px-4 border-top py-3">
      <div class="d-flex ai-center">
        <i class="iconfont icon-lianjie text-grey-1"></i>
        <strong class="text-blue fs-lg px-1">相关资讯</strong>
      </div>
      <div class="pt-2 mt-2">
        <router-link
          tag="div"
          v-for="item in model.related"
          :key="item._id"
          :to="`/articles/${item._id}`"
          class="py-1 lianjie-title d-flex"
          ><span>{{ item.title }} </span> <span class="text-grey fs-xs pl-4 ">2020-10-13</span></router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: { required: true },
  },
  data() {
    return {
      model: null,
    };
  },
  watch: {
    //监听id变化后重新直接fetch
    id:'fetch',
    // id(){
    //   this.fetch()
    // }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`articles/${this.id}`);
      this.model = res.data;
    },
  },
  created() {
    this.fetch();
  },
};
</script>

<style lang="scss">
.page-article {
  .icon-back {
    font-size: 1.6923rem;
  }
  .icon-lianjie {
    font-size: 2.3077rem;
  }
  .lianjie-title span:first-child{
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .article-body {
    img {
      max-width: 100%;
      height: auto;
    }
    iframe {
      width: 90%;
      height: auto;
    }
  }
}
</style>