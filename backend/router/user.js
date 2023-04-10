const express = require('express')
const router = express.Router()

const userHandler = require('../router_handler/user')
// TODO: reduce express-joi lib and related code.
const expressJoi = require('@escook/express-joi')
const { reg_login_schema } = require('../schema/user')

router.post('/register', expressJoi(reg_login_schema), userHandler.regUser)
router.post('/login', expressJoi(reg_login_schema), userHandler.login)

module.exports = router