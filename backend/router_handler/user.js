const userModel = require('../db/userModel').userModel
const verify = require('../utils/validateUtil').verify
const validationSchemas = require('../validation/user')
const rtnJson = require('../utils/respUtil').rtnJson
const successRtn = require('../resp/resps').success
const failRtn = require('../resp/resps').failure

function customerRegister(req, res) {
    var body = req.body
    // Check field: role
    const roleArr = ['customer', 'admin', 'serviceProvider']
    if (roleArr.indexOf(body.role) === -1) return rtnJson(
        res,
        failRtn.accessInvalid
    )
    // Data validation
    var { msg, valid } = verify(validationSchemas.customerRegisterSchema, body)
    if (!valid) return rtnJson(
        res, 
        failRtn.accountDataInvalid,
        msg
    )
    // Is username duplicated?
    userModel.find({ username: body.username }).then((data, err) => {
        if (err) return rtnJson(
            res, 
            failRtn.dbOperationError 
        )
        if (data.length !== 0) return rtnJson(
            res, 
            failRtn.duplicatedUsername
        )
        // Is email duplicated?
        userModel.find({ email: body.email }).then((data, err) => {
            if (err) return rtnJson(
                res, 
                failRtn.dbOperationError
            )
            if (data.length !== 0) return rtnJson(
                res, 
                failRtn.duplicatedEmail 
            )
            // Insert user data into db
            userModel.create({
                email: body.email,
                username: body.username,
                role: body.role,
                password: body.password,
                available: true
            }).then((data, err) => {
                if (err) return rtnJson(
                    res, 
                    failRtn.dbOperationError
                )
            })// All done
            userModel.findOne({ email: body.email }).then((data, err) => {
                if (err) return rtnJson(
                    res,
                    failRtn.dbOperationError
                )
                return rtnJson(
                    res, 
                    successRtn.register,
                    '',
                    data
                )
            })
        })
    })
    
    
}

function providerRegister(req, res) {
    var body = req.body

    const roleArr = ['customer', 'admin', 'serviceProvider']
    if (roleArr.indexOf(body.role) === -1) return rtnJson(
        res,
        failRtn.accessInvalid
    )
    
    var { msg, valid } = verify(validationSchemas.providerRegisterSchema, body)
    if (!valid) return rtnJson(
        res, 
        failRtn.accountDataInvalid,
        msg
    )

    userModel.find({ username: body.username }).then((data, err) => {
        if (err) return rtnJson(
            res, 
            failRtn.dbOperationError 
        )
        if (data.length !== 0) return rtnJson(
            res, 
            failRtn.duplicatedUsername
        )
        userModel.find({ email: body.email }).then((data, err) => {
            if (err) return rtnJson(
                res, 
                failRtn.dbOperationError
            )
            if (data.length !== 0) return rtnJson(
                res, 
                failRtn.duplicatedEmail 
            )
            userModel.create({
                email: body.email,
                username: body.username,
                role: body.role,
                password: body.password,
                available: false
            }).then((data, err) => {
                if (err) return rtnJson(
                    res, 
                    failRtn.dbOperationError
                )
                return rtnJson(
                    res,
                    successRtn.register
                )
            })
        })
    })
    
}

function login(req, res) {
    // console.log(req.body)
    var body = req.body
    var { msg, valid } = verify(validationSchemas.loginSchema, body)
    if (!valid) return rtnJson(
        res,
        failRtn.accountDataInvalid,
        msg
    )
    userModel.findOne( { $or: [{ email: body.email }, { username: body.username }] })
    .then((data, err) => {
        if (err) return rtnJson(
            res,
            failRtn.dbOperationError
        )
        if (data === null) return rtnJson(
            res,
            failRtn.noSuchUser
        )
        if (body.password !== data.password) return rtnJson(
            res,
            failRtn.incorrectPwd
        )
        return rtnJson(
            res,
            successRtn.login,
            '',
            {
                username: data.username,
                email: data.email,
                role: data.role,
                description: data.description,
                address: data.address,
                postcode: data.postcode,
                available: data.available,
                ctime: data.ctime
            }
        )
    })
}

function getUserInfo(req, res) {
    var username = req.query.username
    userModel.findOne({ username: username, available: true }).then((data, err) => {
        if (err) return rtnJson(
            res,
            failRtn.dbOperationError
        )
        if (data === null) return rtnJson(
            res,
            failRtn.invalidUsername,
            username
        )
        return rtnJson(
            res,
            successRtn.retrieve,
            ' User: ' + username,
            data
        )
    })
}

function updateUserInfo(req, res) {
    var body = req.body
    var { msg, valid } = verify(validationSchemas.infoUpdateSchema, body)
    if (!valid) return rtnJson(
        res,
        failRtn.accountDataInvalid,
        msg
    )
    userModel.findOne({ username: body.username }).then((data, err) => {
        if (err) return rtnJson(
            res,
            failRtn.dbOperationError
        )
        if (data !== null && data.username !== body.username) return rtnJson(
            res,
            failRtn.duplicatedUsername,
            body.username
        )
        userModel.findOneAndUpdate({ email: body.email }, {
            username: body.username,
            address: body.address,
            postcode: body.postcode,
            description: body.description
        }).then((data, err) => {
            if (err) return rtnJson(
                res,
                failRtn.dbOperationError
            )
            if (data === null) return rtnJson(
                res,
                failRtn.invalidEmail,
                body.email
            )
            return rtnJson(
                res,
                successRtn.update
            )
        })
    })
    
}

function updatePwd(req, res) {
    var body = req.body
    var { msg, valid } = verify(validationSchemas.pwdUpdateSchema, body)
    if (!valid) return rtnJson(
        res, 
        failRtn.accountDataInvalid,
        msg
    )
    if (body.oldPwd === body.newPwd) return rtnJson(
        res,
        failRtn.duplicatedPwd
    )
    userModel.findOneAndUpdate({ email: body.email }, { password: body.newPwd })
    .then((data, err) => {
        if (err) return rtnJson(
            res,
            failRtn.dbOperationError
        )
        if (data === null) return rtnJson(
            res,
            failRtn.invalidEmail,
            body.email
        )
        return rtnJson(
            res,
            successRtn.update
        )
    })
    
}

module.exports = {
    customerRegister: customerRegister,
    providerRegister: providerRegister,
    login: login,
    getUserInfo: getUserInfo,
    updateUserInfo: updateUserInfo,
    updatePwd: updatePwd
}
