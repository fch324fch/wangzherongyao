module.exports = app =>{
    const mongoose = require('mongoose')
    //连接数据库
    mongoose.connect('mongodb://127.0.0.1:27017/node-vue-moba',{
        useNewUrlParser: true
    })
    //require-all第三方模块 一次性把文件夹的所有模块引入
    require('require-all')(__dirname+'/../models')
    
}