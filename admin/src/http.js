import axios from 'axios'
import Vue from 'vue'
import router from './router'

const http = axios.create({
    baseURL: 'http://localhost:3000/admin/api' || '/admin/api'
})

http.interceptors.request.use(function (config) {
    // Do something before request is sent 
    //Bearer表示类型 规范
    //给axios加了一个请求拦截器 所以每次axios发送请求的时候会判断本地存储有没有token 有token就上传到请求头
    if (localStorage.token) {
        config.headers.Authorization = 'Bearer ' + localStorage.token
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

//给http响应加一个拦截器 监听有没有出错内容 并引入vue弹出 $message是element-ui的方法
http.interceptors.response.use(
    res => {
        return res
    }, err => {
        if (err.response.data.message) {
            Vue.prototype.$message({
                type: 'error',
                message: err.response.data.message
            })
            if (err.response.status === 401) {
                router.push("/login")
            }
        }
        return Promise.reject(err)
    }
)
export default http