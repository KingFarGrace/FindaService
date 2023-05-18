const express = require('express')
const router = express.Router()
const adminHandler = require('../router_handler/admin')

router.post('/user/acpt', adminHandler.activateUser)
router.post('/user/rm', adminHandler.rmUser)
router.get('/user/unavailable', adminHandler.getUnavailableUsers)
router.get('/user/lowLevel', adminHandler.getLowLevelProviders)
router.post('/service/acpt', adminHandler.activateService)
router.get('/service/unavailable', adminHandler.getUnavailableServices)
router.post('/review/rm', adminHandler.rmReviews)

module.exports = router