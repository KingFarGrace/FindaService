//导入bcryptjs
const bcrypt = require('bcryptjs')

//导入数据库
const db = require('../db/index')



// 注册用户的处理函数
exports.regUser = (req, res) => {

// 接收表单数据
const userinfo = req.body

// 判断数据是否合法，输入内容是否为空
if (!userinfo.username || !userinfo.password) {{
  return res.send({ status: 1, message: '用户名或密码不能为空！' })
}
    res.send('reguser OK')
  }

  //定义sql语句，查询用户名是否占用，上面已经判断过是否为空
const sqlString = `select * from ev_users where username=?`
db.query(sql, [userinfo.username], function (err, results) {
    // 执行 SQL 语句失败
    if (err) {
      return res.send({ status: 1, message: err.message })
    }
    // 用户名被占用
    if (results.length > 0) {
      return res.send({ status: 1, message: '用户名被占用，请更换其他用户名！' })
    }
    
    // 对用户的密码,进行 bcrype 加密，返回值是加密之后的密码字符串
    userinfo.password = bcrypt.hashSync(userinfo.password, 10)

    //定义插入新用户sql语句
    const sql = 'insert into ev_users set ?'
    //调用
    db.query(sql, { username: userinfo.username, password: userinfo.password }, function (err, results) {
  // 执行 SQL 语句失败
  if (err) return res.send({ status: 1, message: err.message })
  // SQL 语句执行成功，但影响行数不为 1
  if (results.affectedRows !== 1) {
    return res.send({ status: 1, message: '注册用户失败，请稍后再试！' })
  }
  // 注册成功
  res.send({ status: 0, message: '注册成功！' })
})
  })
}
  // 登录的处理函数
  exports.login = (req, res) => {
    //接受表单数据
    const userinfo = req.body
    //定义sql语句
    const sql = `select * from ev_users where username=?`
    //执行sql语句根据用户名查询用户信息
    db.query(sql, userinfo.username, function (err, results) {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
        // 执行 SQL 语句成功，但是查询到数据条数不等于 1
        if (results.length !== 1) return res.cc('登录失败！')
        
        // 拿着用户输入的密码,和数据库中存储的密码进行对比
        const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
        // 如果对比的结果等于 false, 则证明用户输入的密码错误
        if (!compareResult) {

            return res.cc('登录失败！')
        }

        res.send('登陆成功')
    
      })
   
  }