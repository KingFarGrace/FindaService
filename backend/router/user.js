const express = require('express')
const router = express.Router()
const userHandler = require('../router_handler/user')

router.post('/register/customer', userHandler.customerRegister)
router.post('/register/serviceProvider', userHandler.providerRegister)
router.post('/login',userHandler.login)

module.exports = router