const userModel = require('../db/userModel')
const rtnJson = require('../utils/respUtil')
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
        userModel.findOneAndUpdate({ email: body.email }, { available: available }).then((data, err) => {
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

module.exports = {
    activateUser: activateUser,
    rmUser: rmUser
}