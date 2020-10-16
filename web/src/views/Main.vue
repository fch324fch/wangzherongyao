<template>
  <div>
    <div class="topbar bg-black py-2 px-3 d-flex ai-center">
      <img src="../assets/logo.png" alt="" height="30" />
      <div class="px-2 flex-1">
        <div class="text-white">王者荣耀</div>
        <div class="text-grey-1 fs-xxs">团队成就更多</div>
      </div>
      <button type="button" class="btn bg-primary">立即下载</button>
    </div>
    <div class="bg-primary pt-3 pb-2">
      <div class="nav nav-inverse pb-1 jc-around">
        <div
          class="nav-item"
          v-for="(item, i) in tabs"
          :key="i"
          @click="active = i"
          :class="active === i ? 'active' : ''"
        >
          <!-- router-link本来是a标签 用tag改成div -->
          <router-link class="nav-link" :to="`${item.path}`" tag="div">{{
            item.name
          }}</router-link>
        </div>
      </div>
    </div>
    <!-- 子路由容器 -->
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0,
      tabs: [
        { name: "首页", path: "/" },
        { name: "攻略中心", path: "/gonglue" },
        { name: "赛事中心", path: "/match" },
      ],
    };
  },
};
</script>

<style lang="scss">
.topbar {
  //吸顶
  position: sticky;
  top: 0;
  z-index: 999;
}
</style>