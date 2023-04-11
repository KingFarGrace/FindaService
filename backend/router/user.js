const express = require('express')
// const expressJoi = require('@escook/express-joi')
const router = express.Router()
const userHandler = require('../router_handler/user')
// const { reg_login_schema } = require('../schema/user')

// router.post('/register', expressJoi(reg_login_schema), userHandler.register)
// router.post('/login', expressJoi(reg_login_schema), userHandler.login)
router.post('/register', userHandler.register)
router.post('/login',userHandler.login)

module.exports = router