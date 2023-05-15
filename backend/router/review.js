const express = require('express')
const router = express.Router()
const reviewHandler = require('../router_handler/review')

router.post('/review/add', reviewHandler.addReview)
router.get('/review/info', reviewHandler.displayReviews)

module.exports = router