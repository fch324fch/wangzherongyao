//一个mongoose模型
const mongoose = require('mongoose')
//Schema 构造函数 定义数据库字段
const schema = new mongoose.Schema({

    //分类名
    name:{type:String},
    //mongoose.SchemaTypes.ObjectId 表示它是一个模型里的ObjectId ref表示关联的模型 保存分类的上级分类的id
    parent:{type:mongoose.SchemaTypes.ObjectId,ref:'Category'}
})
//导出创建的mongodb实例 第三个参数设置集合名 默认将第一个参数小写加s
module.exports = mongoose.model('Category',schema)