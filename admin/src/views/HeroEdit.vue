<template>
  <div>
    <!-- id存在就是编辑分类，不存在就是新建分类 -->
    <h1>{{ id ? "编辑" : "新建" }}英雄</h1>
    <!-- label-width横向布局 -->
    <!-- prevent默认提交不要跳转页面 -->
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-tabs value="basic">
        <el-tab-pane label="基础信息" name="basic">
          <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <!-- action图片提交的地址POST请求  before-upload上传之前做什么 on-success成功之后做什么-->
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers="getAuthHeaders()"
              :show-file-list="false"
              :on-success="(res) => $set(this.model, 'avatar', res.url)"
            >
              <img v-if="model.avatar" :src="model.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="背景图">
            <!-- action图片提交的地址POST请求  before-upload上传之前做什么 on-success成功之后做什么-->
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers="getAuthHeaders()"
              :show-file-list="false"
              :on-success="(res) => $set(this.model, 'banner', res.url)"
            >
              <img v-if="model.banner" :src="model.banner" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="介绍图">
            <!-- action图片提交的地址POST请求  before-upload上传之前做什么 on-success成功之后做什么-->
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers="getAuthHeaders()"
              :show-file-list="false"
              :on-success="(res) => $set(this.model, 'image', res.url)"
            >
              <img v-if="model.image" :src="model.image" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="职业">
            <!-- multiple下拉菜单多选 -->
            <el-select v-model="model.categories" multiple>
              <el-option
                v-for="item of categories"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="召唤师技能">
            <!-- multiple下拉菜单多选 -->
            <el-select v-model="model.userskills" multiple filterable>
              <el-option
                v-for="item of userskills"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="铭文推荐">
            <!-- multiple下拉菜单多选 -->
            <el-select v-model="model.mingwens" multiple filterable>
              <el-option
                v-for="item of mingwens"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate
              style="margin-top: 0.6rem"
              :max="9"
              show-score
              v-model="model.scores.difficult"
            ></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate
              style="margin-top: 0.6rem"
              :max="9"
              show-score
              v-model="model.scores.skills"
            ></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate
              style="margin-top: 0.6rem"
              :max="9"
              show-score
              v-model="model.scores.attack"
            ></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate
              style="margin-top: 0.6rem"
              :max="9"
              show-score
              v-model="model.scores.survive"
            ></el-rate>
          </el-form-item>
          <el-form-item label="顺风出装">
            <el-select v-model="model.items1" multiple filterable>
              <el-option
                v-for="item of items"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <el-select v-model="model.items2" multiple filterable>
              <el-option
                v-for="item of items"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input v-model="model.usageTips" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input v-model="model.battleTips" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input v-model="model.teamTips" type="textarea"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能">
          <el-button size="samll" @click="model.skills.push({})"
            ><i class="el-icon-plus"></i>添加技能</el-button
          >
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col
              :md="12"
              v-for="(item, i) in model.skills"
              :key="i"
              style="#ccc;margin-top:2rem;border-bottom:1px solid #ccc"
            >
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <!-- action图片提交的地址POST请求  before-upload上传之前做什么 on-success成功之后做什么-->
                <el-upload
                  class="avatar-uploader"
                  :action="uploadUrl"
                  :headers="getAuthHeaders()"
                  :show-file-list="false"
                  :on-success="(res) => $set(item, 'icon', res.url)"
                >
                  <img v-if="item.icon" :src="item.icon" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="冷却值">
                <el-input v-model="item.delay"></el-input>
              </el-form-item>
              <el-form-item label="消耗">
                <el-input v-model="item.cost"></el-input>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model="item.description"></el-input>
              </el-form-item>
              <el-form-item label="小提示">
                <el-input type="textarea" v-model="item.tips"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  size="small"
                  type="danger"
                  @click="model.skills.splice(i, 1)"
                  >删除</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="主要技能">
          <el-button size="samll" @click="model.primaryskills.push({})"
            ><i class="el-icon-plus"></i>添加技能</el-button
          >
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col
              :md="12"
              v-for="(item, i) in model.primaryskills"
              :key="i"
              style="#ccc;margin-top:2rem;border-bottom:1px solid #ccc"
            >
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <!-- action图片提交的地址POST请求  before-upload上传之前做什么 on-success成功之后做什么-->
                <el-upload
                  class="avatar-uploader"
                  :action="uploadUrl"
                  :headers="getAuthHeaders()"
                  :show-file-list="false"
                  :on-success="(res) => $set(item, 'icon', res.url)"
                >
                  <img v-if="item.icon" :src="item.icon" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item>
                <el-button
                  size="small"
                  type="danger"
                  @click="model.skills.splice(i, 1)"
                  >删除</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="皮肤">
          <el-button size="samll" @click="model.skins.push({})"
            ><i class="el-icon-plus"></i>添加皮肤</el-button
          >
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col
              :md="12"
              v-for="(item, i) in model.skins"
              :key="i"
              style="#ccc;margin-top:2rem;border-bottom:1px solid #ccc"
            >
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="皮肤">
                <!-- action图片提交的地址POST请求  before-upload上传之前做什么 on-success成功之后做什么-->
                <el-upload
                  class="avatar-uploader"
                  :action="uploadUrl"
                  :headers="getAuthHeaders()"
                  :show-file-list="false"
                  :on-success="(res) => $set(item, 'banner', res.url)"
                >
                  <img v-if="item.banner" :src="item.banner" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item>
                <el-button
                  size="small"
                  type="danger"
                  @click="model.skills.splice(i, 1)"
                  >删除</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="最佳搭档">
          <el-button size="samll" @click="model.partners.push({})"
            ><i class="el-icon-plus"></i>添加英雄</el-button
          >
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col
              :md="12"
              v-for="(item, i) in model.partners"
              :key="i"
              style="#ccc;margin-top:2rem;border-bottom:1px solid #ccc"
            >
              <!-- filterable让下拉选项带搜索 -->
              <el-form-item label="名称">
                <el-select filterable v-model="item.hero">
                  <el-option
                    v-for="hero in heroes"
                    :key="hero._id"
                    :value="hero._id"
                    :label="hero.name"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model="item.description"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  size="small"
                  type="danger"
                  @click="model.partners.splice(i, 1)"
                  >删除</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="被谁克制">
          <el-button size="samll" @click="model.enemys.push({})"
            ><i class="el-icon-plus"></i>添加英雄</el-button
          >
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col
              :md="12"
              v-for="(item, i) in model.enemys"
              :key="i"
              style="#ccc;margin-top:2rem;border-bottom:1px solid #ccc"
            >
              <!-- filterable让下拉选项带搜索 -->
              <el-form-item label="名称">
                <el-select filterable v-model="item.hero">
                  <el-option
                    v-for="hero in heroes"
                    :key="hero._id"
                    :value="hero._id"
                    :label="hero.name"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model="item.description"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  size="small"
                  type="danger"
                  @click="model.partners.splice(i, 1)"
                  >删除</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="克制谁">
          <el-button size="samll" @click="model.restrain.push({})"
            ><i class="el-icon-plus"></i>添加英雄</el-button
          >
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col
              :md="12"
              v-for="(item, i) in model.restrain"
              :key="i"
              style="#ccc;margin-top:2rem;border-bottom:1px solid #ccc"
            >
              <!-- filterable让下拉选项带搜索 -->
              <el-form-item label="名称">
                <el-select filterable v-model="item.hero">
                  <el-option
                    v-for="hero in heroes"
                    :key="hero._id"
                    :value="hero._id"
                    :label="hero.name"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model="item.description"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  size="small"
                  type="danger"
                  @click="model.partners.splice(i, 1)"
                  >删除</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-form-item style="margin-top: 1rem">
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  //接受传递过来的参数
  props: {
    id: {},
  },
  data() {
    // 不使用return包裹的数据会在项目的全局可见，会造成变量污染,使用return包裹后数据中变量只在当前组件中生效，不会影响其他组件
    return {
      mingwens: [],
      categories: [],
      items: [],
      heroes: [],
      userskills: [],
      model: {
        name: "",
        avatar: "",
        banner: "",
        partners: [],
        scores: {
          difficult: 0,
        },
        skills: [],
        primaryskills:[],
      },
    };
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/heroes/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/heroes", this.model);
      }
      //使用 router.push 方法。这个方法会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，则回到之前的 URL
      // this.$router.push("/heroes/list");
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },
    async fetch() {
      //因为要接收id所用字符串模板
      const res = await this.$http.get(`rest/heroes/${this.id}`);
      //如果this.model和res.data有同名的 res.data就会覆盖model里的数据，没有就加上
      this.model = Object.assign({}, this.model, res.data);
    },
    async fetchCategories() {
      //因为要接收id所用字符串模板
      const res = await this.$http.get(`rest/categories`);
      //获取到的
      this.categories = res.data;
    },
    async fetchItems() {
      //因为要接收id所用字符串模板
      const res = await this.$http.get(`rest/items`);
      //获取到的name值赋值给model在页面渲染
      this.items = res.data;
    },
    async fetchHeroes() {
      //因为要接收id所用字符串模板
      const res = await this.$http.get(`rest/heroes`);
      //获取到的name值赋值给model在页面渲染
      this.heroes = res.data;
    },
    async fetchSkills() {
      //因为要接收id所用字符串模板
      const res = await this.$http.get(`rest/user_skill`);
      //获取到的name值赋值给model在页面渲染
      this.userskills = res.data;
    },
    async fetchMingwens() {
      //因为要接收id所用字符串模板
      const res = await this.$http.get(`rest/mingwen`);
      //获取到的name值赋值给model在页面渲染
      this.mingwens = res.data;
    },
  },
  //页面加载自动执行
  created() {
    this.fetchMingwens();
    this.fetchSkills();
    this.fetchHeroes();
    this.fetchCategories();
    this.fetchItems();
    //如果id存在就调用fetch()方法
    this.id && this.fetch();
  },
};
</script>