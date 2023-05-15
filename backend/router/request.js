const express = require('express')
const router = express.Router()
const requestHandler = require('../router_handler/request')

router.post('/request/send', requestHandler.sendRequest)
router.post('/request/update', requestHandler.updateRequest)
router.get('/request/:subject', requestHandler.getRequests)

module.exports = router