import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import http from './http'
import './style.css';
Vue.config.productionTip = false

Vue.prototype.$http = http;

//定义全局mixin 更高效的实现组件内容的复用
Vue.mixin({
  computed:{
    uploadUrl(){
      return this.$http.defaults.baseURL + '/upload'
    }
  },
  methods:{
    getAuthHeaders(){
      return {
        Authorization:`Bearer ${localStorage.token || ''}`
      }
    }
  }
})

new Vue({
  router,
  render: h => h(App) //render函数是vue通过js渲染dom结构的函数createElement，约定可以简写为h
}).$mount('#app')  //$mount手动挂载一个未挂载实例
