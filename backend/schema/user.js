const joi = require('joi')

const registerSchema = joi.object({
    username: joi.string().alphanum().min(1).max(16).required(),
    email: joi.string().email().required(),
    role: joi.string().required(),
    // TODO: match special charactors and at least have one uppercase letter, one lowercase letter, one number and one special charactor
    password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,16}$')).required(),
    repeatPwd: joi.ref('password')
})

const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,16}$')).required()
})

module.exports.registerSchema = registerSchema
module.exports.loginSchema = loginSchema