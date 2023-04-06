// 导入 mysql 模块
const mysql = require('mysql')

// 创建数据库连接对象  先把数据库写在这，之后可以再改
const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'admin123',
  database: 'my_db_01',
})

// 向外共享 db 数据库连接对象
module.exports = db