// const bcrypt = require('bcryptjs')
const userModel = require('../db/userModel').userModel
const verify = require('../utils/validateUtil').verify
const customerRegisterSchema = require('../validation/user').customerRegisterSchema
const providerRegisterSchema = require('../validation/user').providerRegisterSchema
const loginSchema = require('../validation/user').loginSchema
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
    var { msg, valid } = verify(customerRegisterSchema, body)
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
            })
        })
    })
    // All done
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
    
}

function providerRegister(req, res) {
    var body = req.body

    const roleArr = ['customer', 'admin', 'serviceProvider']
    if (roleArr.indexOf(body.role) === -1) return rtnJson(
        res,
        failRtn.accessInvalid
    )
    
    var { msg, valid } = verify(providerRegisterSchema, body)
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
            })
        })
    })
    return rtnJson(
        res,
        successRtn.register
    )
}

function login(req, res) {
    // console.log(req.body)
    var body = req.body
    var { msg, valid } = verify(loginSchema, body)
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
                role: data.email,
                description: data.description,
                address: data.address,
                postcode: data.postcode,
                available: data.available,
                ctime: data.ctime
            }
        )
    })
}

module.exports.customerRegister = customerRegister;
module.exports.providerRegister = providerRegister;
module.exports.login = login;
