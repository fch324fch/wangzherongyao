//一个mongoose模型
const mongoose = require('mongoose')
//Schema 构造函数 定义数据库字段
const schema = new mongoose.Schema({
    username:{type:String},
    //给密码做散列 set是一个函数修改保存方式 val是用户本来填的密码 hashSync散列 第二个参数是散列程度且不可逆
    //select:flase使密码在编辑面不展示
    password:{type:String,select:false,set(val){ return require('bcrypt').hashSync(val,10)}}
})
//导出创建的mongodb实例
module.exports = mongoose.model('AdminUser',schema)