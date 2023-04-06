//导入express
const express = require('express')
//创建服务器的实例对象
const app = express()
//配置cors中间件
const cors =  require('cors')
app.use(cors())
//配置解析表单数据的中间件,只能解析application/x-www-form-urlencoded 格式的表单数据
app.use(express.urlencoded({extended:false}))

// 响应数据的中间件
app.use(function (req, res, next) {
    // status = 0 为成功； status = 1 为失败； 默认将 status 的值设置为 1，方便处理失败的情况
    res.cc = function (err, status = 1) {
      res.send({
        // 状态
        status,
        // 状态描述，判断 err 是 错误对象 还是 字符串
        message: err instanceof Error ? err.message : err,
      })
    }
    next()
  })

  //导入joi
  const joi = require('@hapi/joi')

  // 错误中间件
  app.use(function (err, req, res, next) {
    // 数据验证失败导致的错误
    if (err instanceof joi.ValidationError) return res.cc(err)
    // 未知错误
    res.cc(err)
  })
//导入并使用用户路由
const userRouter = require('./router/user')
app.use('/api', userRouter)
//启动服务器
app.listen(3007,() =>{
    console.log('app server running at http://127.0.0.1:3007')
})