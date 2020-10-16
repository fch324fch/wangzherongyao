//一个mongoose模型
const mongoose = require('mongoose')
//Schema 构造函数 定义数据库字段
const schema = new mongoose.Schema({
    name:{type:String},
    items:[{
        image:{type:String},
        url:{type:String},
    }]
})
//导出创建的mongodb实例
module.exports = mongoose.model('Ad',schema)