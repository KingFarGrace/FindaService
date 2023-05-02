const joi = require('joi')

// TODO: validation for admin and sp, password validate
const userRegisterSchema = joi.object({
    username: joi.string().alphanum().min(1).max(16).required(),
    email: joi.string().email().required(),
    role: joi.string().required(),
    password: joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,16}')).min(6).max(16).required(),
    repeatPwd: joi.ref('password')
})

const loginSchema = joi.object({
    username: joi.string().alphanum().min(1).max(16).required(),
    email: joi.string().email().required(),
    password: joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,16}')).min(6).max(16).required()
})
    .xor('username', 'email')

module.exports.userRegisterSchema = userRegisterSchema
module.exports.loginSchema = loginSchema