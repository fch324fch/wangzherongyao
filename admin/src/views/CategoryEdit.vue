<template>
  <div>
    <!-- id存在就是编辑分类，不存在就是新建分类 -->
    <h1>{{ id ? "编辑" : "新建" }}分类</h1>
    <!-- 横向布局 -->
    <!-- prevent默认提交不要跳转页面 native原生javascript-->
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="上级分类">
        <el-select v-model="model.parent">
          <!-- label显示的值 value选中的值   -->
          <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <!-- native 原生类型 -->
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  //接受传递过来的参数 通过id来判断是新建分类还是编辑分类有id的就是编辑分类
  props: {
    id: {},
  },
  data() {
    // 不使用return包裹的数据会在项目的全局可见，会造成变量污染,使用return包裹后数据中变量只在当前组件中生效，不会影响其他组件
    return {
      model: {},
      //上级分类
      parents:[]
    };
  },
  methods: {
    //异步保存方法
    async save() {
      //
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/categories/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/categories", this.model);
      }
      //使用 router.push 方法。这个方法会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，则回到之前的 URL
      this.$router.push("/categories/list");
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },
    async fetch() {
      //因为要接收id所用字符串模板
      const res = await this.$http.get(`rest/categories/${this.id}`);
      //获取到的name值赋值给model在页面渲染
      this.model = res.data;
    },
    async fetchParents(){
      const res = await this.$http.get(`rest/categories`)
      this.parents = res.data
    }
  },
  //页面加载自动执行
  created() {
    this.fetchParents()
    //如果id存在就调用fetch()方法
    this.id && this.fetch()
  },
};
</script>