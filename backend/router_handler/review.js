const reviewModel = require('../db/reviewModel').reviewModel
const rtnJson = require('../utils/respUtil').rtnJson
const successRtn = require('../resp/resps').success
const failRtn = require('../resp/resps').failure

function addReview(req, res) {
    var body = req.body
    var doc = new reviewModel(body)
    doc.save().then((data, err) => {
        if (err) return rtnJson(
            res,
            failRtn.dbOperationError
        )
    })
    return rtnJson(
        res,
        successRtn.create,
        '',
        body
    )
}

function displayReviews(req, res) {
    var query = req.query
    reviewModel.find({ provider: query.provider, service: query.service })
    .then((data, err) => {
        if (err) return rtnJson(
            res,
            failRtn.dbOperationError
        )
        if (data.length === 0) return rtnJson(
            res,
            failRtn.noReviewsFound
        )
        return rtnJson(
            res,
            successRtn.retrieve,
            ' Reviews of provider: ' + query.provider + ' service: ' + query.service,
            data
        )
    })    
}

module.exports = {
    addReview: addReview,
    displayReviews: displayReviews
}