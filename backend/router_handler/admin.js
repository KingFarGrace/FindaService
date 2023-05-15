const userModel = require('../db/userModel')
const serviceModel = require('../db/serviceModel')
const reviewModel = require('../db/reviewModel')
const rtnJson = require('../utils/respUtil').rtnJson
const successRtn = require('../resp/resps').success
const failRtn = require('../resp/resps').failure

function setUserStatus(req, res, available) {
    var body = req.body
    userModel.findOne({ role: 'admin', password: body.adminKey }).then((data, err) => {
        if (err) return rtnJson(
            res,
            failRtn.dbOperationError
        )
        if (data === null) return rtnJson(
            res,
            failRtn.incorrectPwd
        )
        userModel.findOneAndUpdate({ email: body.email }, { available: available })
        .then((data, err) => {
            if (err) return rtnJson(
                res,
                failRtn.dbOperationError
            )
            if (data === null) return rtnJson(
                res,
                failRtn.invalidEmail
            )
        })
    })
    return rtnJson(
        res,
        successRtn.update
    )
}

function activateUser(req, res) {
    setUserStatus(req, res, true)
}

function rmUser(req, res) {
    setUserStatus(req, res, false)
}

function activareService(req, res) {
    var body = req.body
    userModel.findOne({ role: 'admin', password: body.adminKey }).then((data, err) => {
        if (err) return rtnJson(
            res,
            failRtn.dbOperationError
        )
        if (data === null) return rtnJson(
            res,
            failRtn.incorrectPwd
        )
        serviceModel.findOneAndUpdate(
            { provider: body.provider, service: body.service }, 
            { available: true }
        ).then((data, err) => {
            if (err) return rtnJson(
                res,
                failRtn.dbOperationError
            )
            if (data === null) return rtnJson(
                res,
                failRtn.noMatchedService
            )
            if (data.available === true) return rtnJson(
                res,
                failRtn.alreadyActivated
            ) 
        })
    })
    return rtnJson(
        res, 
        successRtn.update,
        ' provider: ' + body.provider + ' service: ' + body.service
    )
}

function rmReviews(req, res) {
    var body = req.body
    userModel.findOne({ role: 'admin', password: body.adminKey }).then((data, err) => {
        if (err) return rtnJson(
            res,
            failRtn.dbOperationError
        )
        if (data === null) return rtnJson(
            res,
            failRtn.incorrectPwd
        )
        reviewModel.findOneAndDelete({ provider: body.provider, service: body.service, username: body.username })
        .then((data, err) => {
            if (err) return rtnJson(
                res,
                failRtn.dbOperationError
            )
            if (data === null) return rtnJson(
                res,
                failRtn.noMatchedReview
            )
        })
    })
    return rtnJson(
        res,
        successRtn.delete
    )
}

module.exports = {
    activateUser: activateUser,
    rmUser: rmUser,
    activareService: activareService,
    rmReviews: rmReviews
}