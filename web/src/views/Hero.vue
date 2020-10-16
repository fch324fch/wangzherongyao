<template>
  <div class="page-hero" v-if="model">
    <div class="topbar bg-black py-2 px-3 d-flex ai-center">
      <img src="../assets/logo.png" alt="" height="30" />
      <div class="px-2 flex-1">
        <span class="text-white">王者荣耀</span>
        <span class="text-white ml-3">攻略战</span>
      </div>
      <router-link to="/" tag="div" class="text-white"
        >更多英雄&nbsp;&gt;</router-link
      >
    </div>
    <div class="top" :style="{ 'background-image': `url(${model.banner})` }">
      <div class="info text-white p-3 d-flex flex-column h-100 jc-end">
        <div class="fs-sm">{{ model.title }}</div>
        <h2 class="my-2">{{ model.name }}</h2>
        <div class="fs-sm">
          {{ model.categories.map((v) => v.name).join("/") }}
        </div>
        <div class="d-flex jc-between pt-2">
          <div class="scores d-flex ai-center" v-if="model.scores">
            <span>难度</span>
            <span class="badge bg-primary">{{ model.scores.difficult }}</span>
            <span>技能</span>
            <span class="badge bg-blue-1">{{ model.scores.skills }}</span>
            <span>攻击</span>
            <span class="badge bg-danger">{{ model.scores.attack }}</span>
            <span>生存</span>
            <span class="badge bg-dark-2">{{ model.scores.survive }}</span>
          </div>
          <router-link
            :to="`/heroskin/${id}`"
            tag="span"
            class="text-grey fs-sm"
            v-if="model.skins"
            >皮肤：{{ model.skins.length }} &nbsp;&gt;</router-link
          >
        </div>
      </div>
    </div>
    <div class="bg-white pt-3 pb-1 border-bottom">
      <div class="nav pb-1 jc-around">
        <div
          class="nav-item"
          @click="active = i"
          :class="active === i ? 'active' : ''"
          v-for="(item, i) in biaoti"
          :key="i"
        >
          <!-- router-link本来是a标签 用tag改成div -->
          <div class="nav-link">{{ item }}</div>
        </div>
      </div>
    </div>
    <div v-show="active === 0">
      <div class="skill bg-white pt-2">
        <div class="d-flex jc-around">
          <router-link tag="div" to="/" class="py-3 px-5 bg-light show active"
            >英雄介绍视频</router-link
          >
          <router-link
            tag="div"
            :to="`/heroshow/${id}`"
            class="py-3 px-5 bg-light show"
            >一键识英雄</router-link
          >
        </div>
        <div class="skill-nav bg-white d-flex jc-around pt-4 px-3">
          <div
            class="nav-item"
            v-for="(item, index) in this.model.skills"
            :key="index"
            @click="skill_active = index"
          >
            <img
              :src="`${item.icon}`"
              alt=""
              :class="skill_active === index ? 'active' : ''"
            />
          </div>
        </div>
        <div
          class="px-3 pt-4 pb-2"
          v-show="skill_active === index"
          v-for="(item, index) in this.model.skills"
          :key="index"
        >
          <strong class="fs-lg">{{ item.name }}</strong>
          <span class="pl-5 text-grey fs-xs"
            >(冷却值：{{ item.delay }}&nbsp;消耗：{{ item.cost }})</span
          >
          <p class="text-grey-1 pt-3" style="line-height: 1.5rem">
            {{ item.description }}
          </p>
        </div>
      </div>
      <div class="mt-3 bg-white">
        <div>
          <div class="pt-3 px-4">
            <strong class="fs-xl">加点建议</strong>
          </div>
          <div class="d-flex jdjy" v-if="this.model.primaryskills">
            <div class="d-flex jn1 flex-column jc-center ai-center">
              <p>主升</p>
              <img
                class="jn"
                :src="`${this.model.primaryskills[0].icon}`"
                alt=""
              />
              <p>{{ this.model.primaryskills[0].name }}</p>
            </div>
            <div class="d-flex jn2 flex-column jc-center ai-center">
              <p>副升</p>
              <img
                class="jn"
                :src="`${this.model.primaryskills[1].icon}`"
                alt=""
              />
              <p>{{ this.model.primaryskills[1].name }}</p>
            </div>
            <div class="d-flex jn3 flex-column jc-center ai-center">
              <p>召唤师技能</p>
              <div class="jn33 d-flex jc-center ai-center">
                <div
                  class="zhs d-flex flex-column jc-center ai-center"
                  v-for="(item, i) in this.userskills"
                  :key="i"
                >
                  <img class="zhsjn" :src="`${item.icon}`" alt="" />
                  <p>{{ item.name }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="pt-3 px-4">
            <strong class="fs-xl">出装顺序</strong>
            <p>顺风出装</p>
          </div>
          <div class="px-4 d-flex border-bottom">
            <div
              v-for="(item, i) in this.item1"
              :key="i"
              class="item d-flex flex-column jc-center ai-center"
            >
              <img :src="`${item.icon}`" alt="" />
              <p class="fs-xs">{{ item.name }}</p>
            </div>
          </div>
          <div class="px-4">
            <p>逆风出装</p>
          </div>
          <div class="px-4 d-flex border-bottom">
            <div
              v-for="(item, i) in this.item2"
              :key="i"
              class="item d-flex flex-column jc-center ai-center"
            >
              <img :src="`${item.icon}`" alt="" />
              <p class="fs-xs">{{ item.name }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-3 bg-white">
        <div class="py-3 px-4">
          <strong class="fs-xl">铭文推荐</strong>
        </div>
        <div class="d-flex mingwens jc-around">
          <div
            v-for="(item, i) in mingwen"
            :key="i"
            class="d-flex flex-column mingwen jc-center ai-center"
          >
            <img class="mingwen-img" :src="`${item.icon}`" alt="" />
            <p class="fs-xl">{{ item.name }}</p>
          </div>
        </div>
      </div>
      <div class="mt-3 bg-white">
        <div class="pt-3 px-4">
          <strong class="fs-xl">使用技巧</strong>
        </div>
        <p class="px-4 text-grey-1 pb-2" style="line-height: 1.5rem">
          {{ this.model.usageTips }}
        </p>
      </div>
      <div class="mt-3 bg-white">
        <div class="pt-3 px-4">
          <strong class="fs-xl">对抗技巧</strong>
        </div>
        <p class="px-4 text-grey-1 pb-2" style="line-height: 1.5rem">
          {{ this.model.battleTips }}
        </p>
      </div>
      <div class="mt-3 bg-white">
        <div class="pt-3 px-4">
          <strong class="fs-xl">团战思路</strong>
        </div>
        <p class="px-4 text-grey-1 pb-2" style="line-height: 1.5rem">
          {{ model.teamTips }}
        </p>
      </div>
      <div class="mt-3 bg-white">
        <div class="pt-3 px-4">
          <strong class="fs-xl">英雄关系</strong>
        </div>
        <div class="border-bottom">
          <p class="px-4 fs-lg">最佳搭档</p>
          <div v-for="(item, i) in partners" :key="i" class="d-flex ai-start">
            <img
              style="transform: scale(0.5); margin-top: -4%"
              :src="`${item.avatar}`"
              alt=""
            />
            <p class="pr-4">{{ model.partners[i].description }}</p>
          </div>
        </div>
        <div class="border-bottom">
          <p class="px-4 fs-lg">被谁克制</p>
          <div v-for="(item, i) in enemys" :key="i" class="d-flex ai-start">
            <img
              style="transform: scale(0.5); margin-top: -4%"
              :src="`${item.avatar}`"
              alt=""
            />
            <p class="pr-4">{{ model.enemys[i].description }}</p>
          </div>
        </div>
        <div>
          <p class="px-4 fs-lg">克制谁</p>
          <div v-for="(item, i) in restrain" :key="i" class="d-flex ai-start">
            <img
              style="transform: scale(0.5); margin-top: -4%"
              :src="`${item.avatar}`"
              alt=""
            />
            <p class="pr-4">{{ model.restrain[i].description }}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-show="active === 1">
      <not></not>
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
      skill_active: 0,
      active: 0,
      biaoti: ["英雄初识", "进阶攻略"],
      model: null,
      userskills: [],
      item1: [],
      item2: [],
      mingwen: [],
      partners: [],
      enemys: [],
      restrain: [],
    };
  },
  computed: {},
  methods: {
    async fetch() {
      const res = await this.$http.get(`heroes/${this.id}`);
      if (res.data.userskills) {
        //获取召唤师技能
        const userskill_id = res.data.userskills;
        userskill_id.map(async (v) => {
          const res_userskill = await this.$http.get(`user_skill/${v}`);
          this.userskills.push(res_userskill.data);
        });
      }
      if (res.data.items1) {
        //获取顺风出装
        const item1_id = res.data.items1;
        item1_id.map(async (v) => {
          const res_item1 = await this.$http.get(`items/${v}`);
          this.item1.push(res_item1.data);
        });
      }
      if (res.data.items2) {
        //获取逆风出装
        const item2_id = res.data.items2;
        item2_id.map(async (v) => {
          const res_item2 = await this.$http.get(`items/${v}`);
          this.item2.push(res_item2.data);
        });
      }
      if (res.data.mingwens) {
        //获取铭文
        const mingwen_id = res.data.mingwens;
        mingwen_id.map(async (v) => {
          const res_mingwen = await this.$http.get(`mingwen/${v}`);
          this.mingwen.push(res_mingwen.data);
        });
      }
      if (res.data.partners) {
        //获取搭档
        const partners = res.data.partners;
        partners.map(async (v) => {
          const res_partners = await this.$http.get(`heroes/${v.hero}`);
          this.partners.push(res_partners.data);
        });
      }
      if (res.data.enemys) {
        //获取敌人
        const enemys = res.data.enemys;
        enemys.map(async (v) => {
          const res_enemys = await this.$http.get(`heroes/${v.hero}`);
          this.enemys.push(res_enemys.data);
        });
      }
      if (res.data.restrain) {
        //获取优势
        const restrain = res.data.restrain;
        restrain.map(async (v) => {
          const res_restrain = await this.$http.get(`heroes/${v.hero}`);
          this.restrain.push(res_restrain.data);
        });
      }
      this.model = res.data;
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
  created() {
    this.fetch();
  },
};
</script>

<style lang="scss">
@import "../assets/scss/_variables.scss";
.page-hero {
  .top {
    height: 50vw;
    background: #fff no-repeat top center;
    background-size: auto 100%;
  }
  .info {
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
    .scores {
      .badge {
        margin: 0 0.25rem;
        display: inline-block;
        width: 1rem;
        height: 1rem;
        line-height: 1rem;
        text-align: center;
        border-radius: 50%;
        font-size: 0.6rem;
        border: 1px solid rgba(255, 255, 255, 0.2);
      }
    }
  }
  .skill {
    .show {
      border-radius: 0.3846rem;
      border: 1px solid map-get($colors, "light-1");
      &.active {
        border: 1px solid map-get($colors, "primary");
      }
    }
  }
  .skill-nav {
    .nav-item {
      width: 20%;
      img {
        width: 90%;
        &.active {
          border: 3px solid map-get($colors, "primary");
          border-radius: 50%;
        }
      }
    }
  }
  .jdjy {
    .jn1 {
      flex: 1;
      .jn {
        width: 70%;
      }
    }
    .jn2 {
      flex: 1;
      .jn {
        width: 70%;
      }
    }
    .jn3 {
      flex: 2;
      .zhs {
        .zhsjn {
          border-radius: 50%;
          width: 70%;
        }
      }
    }
  }
  .item {
    flex: 1;
    img {
      border-radius: 50%;
      width: 90%;
    }
  }
  .mingwens {
    .mingwen {
      .mingwen-img {
        width: 50%;
      }
    }
  }
}
</style>