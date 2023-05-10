const express = require('express')
const app = express()
// Cross-domain
// const cors =  require('cors')
// app.use(cors())

const bodyParser = require('body-parser')
app.use(bodyParser.json())
const userRouter = require('./router/user')
app.use('/', userRouter)

// Run server
app.listen(3000,() =>{
    console.log('app server running at http://127.0.0.1:3000')
})