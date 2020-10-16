<template>
  <div>
    <!-- id存在就是编辑分类，不存在就是新建分类 -->
    <h1>{{ id ? "编辑" : "新建" }}召唤师技能</h1>
    <!-- label-width横向布局 -->
    <!-- prevent默认提交不要跳转页面 -->
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <!-- action图片提交的地址POST请求  before-upload上传之前做什么 on-success成功之后做什么-->
        <!-- 因为没有axios请求所以没有token的请求头导致图片上传不成功 所以在main.js中加了一个全局方法用来设置请求头 -->
        <!-- show-file-list 是否显示已上传列表 -->
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :headers="getAuthHeaders()"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="model.icon" :src="model.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
      model: {
        name:"",
        icon:""
      },
      parents: [],
    };
  },
  methods: {
    afterUpload(res){
      //防止url没有赋值上 显示赋值
      //this.$set(this.model,'icon',res.url)
      this.model.icon = res.url
    },
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/user_skill/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/user_skill", this.model);
      }
      //使用 router.push 方法。这个方法会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，则回到之前的 URL
      // this.$router.push("/items/list");
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },
    async fetch() {
      //因为要接收id所用字符串模板
      const res = await this.$http.get(`rest/user_skill/${this.id}`);
      //获取到的name值赋值给model在页面渲染
      this.model = res.data;
    },
  },
  //页面加载自动执行
  created() {
    //如果id存在就调用fetch()方法
    this.id && this.fetch();
  },
};
</script>