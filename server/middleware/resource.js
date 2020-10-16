//判断模型是否存在
module.exports = options => async (req, res, next) => {
    //引入第三方模块inflection classify转类名的方法 把小写的复数形式转为大写的单数形式
    const modelName = require('inflection').classify(req.params.resource)
    //在req上挂载一个数据库模型 
    req.Model = require(`../models/${modelName}`)
    next()
}