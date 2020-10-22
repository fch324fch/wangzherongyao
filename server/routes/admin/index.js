module.exports = app => {
    const express = require('express')
    const router = express.Router({
        // 导入父级参数到子级配置
        mergeParams: true
    })
    //找用户模块
    const AdminUser = require('../../models/AdminUser')
    //校验模块
    const assert = require('http-assert')
    //登录校验中间件
    const authMiidleware = require('../../middleware/auth')
    //资源校验中间件
    const resourceMiidleware = require('../../middleware/resource')
    //创建资源
    router.post('/', async (req, res) => {
        //数据库模型
        //create 创建数据
        const model = await req.Model.create(req.body)
        res.send(model)
    })
    //更新资源
    router.put('/:id', async (req, res) => {
        //findByIdAndUpdate通过id找对应数据将请求体更新与中返回新数据 
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })
    //删除资源
    router.delete('/:id', async (req, res) => {
        //找到id删除数据
        await req.Model.findByIdAndDelete(req.params.id)
        res.send({
            success: true
        })
    })
    //资源列表 校验用户是否登录
    router.get('/', async (req, res) => {
        //在下方作为一个中间件 //引入第三方模块inflection classify转类名的方法 把小写的复数形式转为大写的单数形式
        // const modelName = require('inflection').classify(req.params.resource)
        // //数据库模型
        // const Model = require(`../../models/${modelName}`)
        const queryOptions = {}
        //如果模型是分类的话就加一个poplulate('parent')
        if (req.Model.modelName === 'Category') {
            queryOptions.populate = 'parent'
        }
        //查询数据 populate表示关联 parent字段取出完整信息
        const items = await req.Model.find().setOptions(queryOptions)
        res.send(items)
    })
    //资源详情
    router.get('/:id', async (req, res) => {
        //查找id 这里使用params.id的原因是上面的url用的占位符:id
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })
    /*资源路由
    1.路由与请求地址匹配 定义接口api 
    2.获取到请求地址
    3.判断用户是否存在
    4.按顺序执行后面的函数(函数作为一个中间件)
    5.判断模型是否存在*/
    app.use('/admin/api/rest/:resource', authMiidleware(), resourceMiidleware(), router)
    //引入第三方模块multer来处理图片数据 dest:图片上传目标地址
    const multer = require('multer')
    const path = require('path')
    const upload = multer({ dest: path.join(__dirname, "/../../uploads") })
    //upload.single单个文件上传 file字段是浏览器header中form Data得到的
    app.post('/admin/api/upload', authMiidleware(), upload.single('file'), async (req, res) => {
        //本身没有req.file 是multer模块加上的 而且一定要有upload.single才有
        const file = req.file
        file.url = `http://www.xxiaofan.com/uploads/${file.filename}`
        res.send(file)
    })
    //生成token模块
    const jwt = require('jsonwebtoken')
    //登录路由 在前端把用户名和密码传过来 然后校验看是否成功 返回一个前端一个token并让前端保存 后续前端通过这个密钥来验证身份
    app.post('/admin/api/login', async (req, res) => {
        const { username, password } = req.body
        //1.根据用户名找用户
        //findOne查找一条数据 因为前面密码设置了select:false默认不读取密码 所以要加上select('+password')来读取密码
        const user = await AdminUser.findOne({ username }).select('+password')
        //第一个参数判断user存不存  不存在抛出第二个参数状态码 并返回 用户不存在
        assert(user, 422, "用户不存在")
        //2.校验密码
        //compareSync比较输入的明文与数据的密文
        const isValid = require('bcrypt').compareSync(password, user.password)
        assert(isValid, 422, "密码错误")
        //3.返回token
        //生成一个token 第一个参数保存用户的唯一id 第二个参数是一个密钥
        const token = jwt.sign({ id: user._id }, app.get('secret'))
        res.send({ token })
    })

    //错误处理中间件
    app.use(async (err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            //err.meassage是上面assert设置的
            message: err.message
        })
    })
}