<template>
  <div class="login-container">
    <el-card header="请先登录" class="login-card">
      <!-- native监听表单的原生表单事件 prevent阻止表单默认提交不要跳转页面 -->
      <el-form @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="model.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style>
.login-card {
  width: 25rem;
  margin: 6rem auto;
}
</style>

<script>
export default {
  data() {
    return {
      model: {},
    };
  },
  methods: {
    async login() {
      const res = await this.$http.post("login", this.model);
      //讲服务器响应过来的token保存到本地存储
      localStorage.token = res.data.token;
      //跳转到首页
      this.$router.push("/");
      this.$message({
        type: "success",
        message: "登录成功",
      });
    },
  },
};
</script>