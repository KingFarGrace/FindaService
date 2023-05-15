const express = require('express')
const router = express.Router()
const adminHandler = require('../router_handler/admin')

router.post('/user/acpt', adminHandler.activateUser)
router.post('/user/rm', adminHandler.rmUser)

module.exports = router