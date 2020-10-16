<template>
  <div>
    <!-- id存在就是编辑分类，不存在就是新建分类 -->
    <h1>{{ id ? "编辑" : "新建" }}广告位</h1>
    <!-- 横向布局 -->
    <!-- prevent默认提交不要跳转页面 -->
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="广告">
        <el-button size="samll" @click="model.items.push({})"
          ><i class="el-icon-plus"></i>添加广告</el-button
        >
        <el-row type="flex" style="flex-wrap: wrap">
          <el-col
            :md="24"
            v-for="(item, i) in model.items"
            :key="i"
            style="#ccc;margin-top:2rem;border-bottom:1px solid #ccc"
          >
            <el-form-item label="跳转连接(URL)">
              <el-input v-model="item.url"></el-input>
            </el-form-item>
            <el-form-item label="图片" style="margin-top: 1rem">
              <!-- action图片提交的地址POST请求  before-upload上传之前做什么 on-success成功之后做什么-->
              <el-upload
                class="avatar-uploader"
                :action="uploadUrl"
                :headers="getAuthHeaders()"
                :show-file-list="false"
                :on-success="(res) => $set(item, 'image', res.url)"
              >
                <img v-if="item.image" :src="item.image" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button
                size="small"
                type="danger"
                @click="model.items.splice(i, 1)"
                style="margin-left: 8rem; margin-bottom: 1rem"
                >删除</el-button
              >
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit" style="margin-top: 1rem"
          >保存</el-button
        >
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
        items: [],
      },
    };
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/ads/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/ads", this.model);
      }
      //使用 router.push 方法。这个方法会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，则回到之前的 URL
      this.$router.push("/ads/list");
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },
    async fetch() {
      //因为要接收id所用字符串模板
      const res = await this.$http.get(`rest/ads/${this.id}`);
      //获取到的name值赋值给model在页面渲染
      /*Object.assign方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。
        Object.assign方法的第一个参数是目标对象，后面的参数都是源对象。(如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性*/
      this.model = Object.assign({}, this.model, res.data);
    },
  },
  //页面加载自动执行
  created() {
    //如果id存在就调用fetch()方法
    this.id && this.fetch();
  },
};
</script>