const express = require('express')

//创建服务器
const app = express()

//set在app上设置一个全局变量 通过get获取
app.set('secret','fch324')
//使用JSON有效负载分析传入请求 参数可以是{limit}扩大请求体大小
app.use(express.json())
//跨域模块 ()直接使用
app.use(require('cors')())

//托管静态资源  让uploads里的文件可以让/uploads访问
app.use('/uploads', express.static(__dirname + '/uploads'))



require('./routes/admin')(app)
require('./plugins/db')(app)
require('./routes/web')(app)

app.listen(3000, () => {
    console.log('http://localhost:3000');
})