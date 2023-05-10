// const bcrypt = require('bcryptjs')
const userModel = require('../db/user_model').userModel
const verify = require('../utils/validateUtil').verify
const userRegisterSchema = require('../schema/user').userRegisterSchema
const loginSchema = require('../schema/user').loginSchema
const rtnJson = require('../utils/respUtil').rtnJson
const successRtn = require('./code_msg').success
const failRtn = require('./code_msg').failure

function register(req, res) {
    var body = req.body
    // Check field: role
    const roleArr = ['customer', 'admin', 'serviceProvider']
    if (roleArr.indexOf(body.role) === -1) return rtnJson(
        res, 
        failRtn.accessInvalid.code, 
        failRtn.accessInvalid.msg
    )
    // Data validation
    var { msg, valid } = verify(userRegisterSchema, body)
    if (!valid) return rtnJson(
        res, 
        failRtn.accountDataInvalid.code, 
        failRtn.accountDataInvalid.msg + msg
    )
    // Is username duplicated?
    userModel.find({ username: body.username })
        .then((data, err) => {
            if (err) return rtnJson(
                res, 
                failRtn.dbOperationError.code, 
                failRtn.dbOperationError.msg + err
            )
            if (data.length !== 0) return rtnJson(
                res, 
                failRtn.duplicatedField.code, 
                failRtn.duplicatedField.msg + 'username'
            )
            // Is userModel duplicated?
            userModel.find({ email: body.email })
                .then((data, err) => {
                    if (err) return rtnJson(
                        res, 
                        failRtn.dbOperationError.code, 
                        failRtn.dbOperationError.msg + err
                    )
                    if (data.length !== 0) return rtnJson(
                        res, 
                        failRtn.duplicatedField.code, 
                        failRtn.duplicatedField.msg + 'email'
                    )
                    // Insert user data into db
                    var userData = new userModel(body)
                    userData.save().then((data, err) => {
                        if (err) return rtnJson(
                            res, 
                            failRtn.dbOperationError.code, 
                            failRtn.dbOperationError.msg + err
                        )
                    })
                })
        })
    // All done
    // Q: find in db or just write hear?
    return rtnJson(
        res, 
        successRtn.register.code, 
        successRtn.register.msg,
        {
            userInfo: {
                username: body.username,
                email: body.email,
                role: body.role,
                address: 'Fill out this blank to benefit your searching.',
                postcode: 'Postcode should be valid and match your address.'
            }
        }
    )
}

function login(req, res) {
    // console.log(req.body)
    var body = req.body
    var { msg, valid } = verify(loginSchema, body)
    if (!valid) return rtnJson(
        res,
        failRtn.accountDataInvalid.code,
        failRtn.accountDataInvalid.msg + msg
    )
    userModel.findOne({ email: body.email }).then((data, err) => {
        if (err) return rtnJson(
            res,
            failRtn.dbOperationError.code,
            failRtn.dbOperationError.msg + err
        )
        if (data === null) return rtnJson(
            res,
            failRtn.noSuchUser.code,
            failRtn.noSuchUser.msg + body.email
        )
        if (body.password !== data.password) return rtnJson(
            res,
            failRtn.incorrectPwd.code,
            failRtn.incorrectPwd.msg
        )
        return rtnJson(
            res,
            successRtn.login.code,
            successRtn.login.msg,
            {
                username: data.username,
                email: data.email,
                role: data.email,
                address: data.address,
                postcode: data.postcode
            }
        )
    })
}

module.exports.register = register;
module.exports.login = login;
