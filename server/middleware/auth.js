//判断用户存不存在中间件
//生成token模块
const jwt = require('jsonwebtoken')
//找用户模块
const AdminUser = require('../models/AdminUser')
//校验模块
const assert = require('http-assert')
module.exports = options => async (req, res, next) => {
    //获取前端放置token的请求头里的authorization字段
    const token = String(req.headers.authorization || '').split(' ').pop()
    assert(token, 401, '请先登录')
    //解析token返回之前设置token的id
    const { id } = jwt.verify(token, req.app.get('secret'))
    assert(id, 401, '请先登录')
    //为了后续能用user变量所以将它挂载到req上
    req.user = await AdminUser.findById(id)
    assert(req.user, 401, '请先登录')
    await next()
}