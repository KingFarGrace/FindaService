// const bcrypt = require('bcryptjs')
const userModel = require('../db/userModel').userModel
const verify = require('../utils/validateUtil').verify
const userRegisterSchema = require('../validation/user').userRegisterSchema
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
    var { msg, valid } = verify(userRegisterSchema, body)
    if (!valid) return rtnJson(
        res, 
        failRtn.accountDataInvalid
    )
    // Is username duplicated?
    userModel.find({ username: body.username })
        .then((data, err) => {
            if (err) return rtnJson(
                res, 
                failRtn.dbOperationError 
            )
            if (data.length !== 0) return rtnJson(
                res, 
                failRtn.duplicatedField
            )
            // Is userModel duplicated?
            userModel.find({ email: body.email })
                .then((data, err) => {
                    if (err) return rtnJson(
                        res, 
                        failRtn.dbOperationError
                    )
                    if (data.length !== 0) return rtnJson(
                        res, 
                        failRtn.duplicatedField 
                    )
                    // Insert user data into db
                    var userData = new userModel(body)
                    userData.save().then((data, err) => {
                        if (err) return rtnJson(
                            res, 
                            failRtn.dbOperationError
                        )
                    })
                })
        })
    // All done
    // Q: find in db or just write hear?
    return rtnJson(
        res, 
        successRtn.register,
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

function providerRegister(req, res) {

}

function login(req, res) {
    // console.log(req.body)
    var body = req.body
    var { msg, valid } = verify(loginSchema, body)
    if (!valid) return rtnJson(
        res,
        failRtn.accountDataInvalid
    )
    userModel.findOne({ email: body.email }).then((data, err) => {
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

module.exports.customerRegister = customerRegister;
module.exports.providerRegister = providerRegister;
module.exports.login = login;
