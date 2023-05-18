const express = require('express')
const router = express.Router()
const userHandler = require('../router_handler/user')

router.post('/register/customer', userHandler.customerRegister)
router.post('/register/serviceProvider', userHandler.providerRegister)
router.post('/login', userHandler.login)
router.get('/user/info', userHandler.getUserInfo)
router.post('/user/update', userHandler.updateUserInfo)
router.post('/pwd/update', userHandler.updatePwd)

module.exports = router