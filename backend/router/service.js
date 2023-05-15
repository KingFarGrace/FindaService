const express = require('express')
const router = express.Router()
const serviceHandler = require('../router_handler/service')

router.get('/service/search', serviceHandler.getServices)
router.post('/service/add', serviceHandler.addService)

module.exports = router