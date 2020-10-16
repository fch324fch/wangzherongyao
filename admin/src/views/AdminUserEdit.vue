<template>
  <div>
    <!-- id存在就是编辑分类，不存在就是新建分类 -->
    <h1>{{ id ? "编辑" : "新建" }}管理员</h1>
    <!-- 横向布局 -->
    <!-- prevent默认提交不要跳转页面 -->
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="用户名">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="model.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
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
      model: {},
      parents: [],
    };
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/admin_users/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/admin_users", this.model);
      }
      //使用 router.push 方法。这个方法会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，则回到之前的 URL
      this.$router.push("/admin_users/list");
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },
    async fetch() {
      //因为要接收id所用字符串模板
      const res = await this.$http.get(`rest/admin_users/${this.id}`);
      //获取到的name值赋值给model在页面渲染
      this.model = res.data;
    },
    async fetchParents() {
      const res = await this.$http.get(`rest/admin_users`);
      this.parents = res.data;
    },
  },
  //页面加载自动执行
  created() {
    this.fetchParents();
    //如果id存在就调用fetch()方法
    this.id && this.fetch();
  },
};
</script>