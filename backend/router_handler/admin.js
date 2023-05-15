const userModel = require('../db/userModel')
const serviceModel = require('../db/serviceModel')
const rtnJson = require('../utils/respUtil').rtnJson
const successRtn = require('../resp/resps').success
const failRtn = require('../resp/resps').failure

function setUserStatus(req, res, available) {
    var body = req.body
    userModel.findOne({ role: 'admin' }).then((data, err) => {
        if (err) return rtnJson(
            res,
            failRtn.dbOperationError
        )
        if (data.password !== body.adminKey) {
            res,
            failRtn.incorrectPwd
        }
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
    userModel.findOne({ role: 'admin' }).then((data, err) => {
        if (err) return rtnJson(
            res,
            failRtn.dbOperationError
        )
        if (data.password !== body.adminKey) return rtnJson(
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

module.exports = {
    activateUser: activateUser,
    rmUser: rmUser,
    activareService: activareService
}