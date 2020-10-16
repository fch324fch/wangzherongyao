//一个mongoose模型
const mongoose = require('mongoose')
//Schema 构造函数 定义数据库字段
const schema = new mongoose.Schema({
    title:{type:String},
    //mongoose.SchemaTypes.ObjectId 表示它是一个数据库里的ObjectId ref表示关联的模型
    categories:[{type:mongoose.SchemaTypes.ObjectId,ref:'Category'}],
    body:{type:String}
},{
    //时间
    timestamps:true
})
//导出创建的mongodb实例
module.exports = mongoose.model('Article',schema)