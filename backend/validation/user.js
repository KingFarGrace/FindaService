const joi = require('joi')

// TODO: validation for admin and sp, password validate
const customerRegisterSchema = joi.object({
    username: joi.string().alphanum().min(1).max(16).required(),
    email: joi.string().email().required(),
    role: joi.string().required(),
    password: joi.string().pattern(new RegExp('^(?=.*?[a-z])(?=.*?[A-Z])(?=.*\\d)(?=.*?[$@$!%*?&])[A-Za-z\\d$@$!%*?&]{6,16}$')).required(),
    repeatPwd: joi.ref('password')
})

const providerRegisterSchema = joi.object({
    username: joi.string().alphanum().min(1).max(16).required(),
    email: joi.string().email().required(),
    role: joi.string().required(),
    password: joi.string().pattern(new RegExp('^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\\d)(?=.*?[$@$!%*?&])[A-Za-z\\d$@$!%*?&]{6,16}$')).required(),
    repeatPwd: joi.ref('password'),
    description: joi.string().required(),
    address: joi.string().required(),
    postcode: joi.string().alphanum().required()
})

const loginSchema = joi.object({
    username: joi.string().alphanum().min(1).max(16),
    email: joi.string().email(),
    password: joi.string().pattern(new RegExp('^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\\d)(?=.*?[$@$!%*?&])[A-Za-z\\d$@$!%*?&]{6,16}$')).required()
})
    .xor('username', 'email')

const infoUpdateSchema = joi.object({
    email: joi.string().email().required(),
    username: joi.string().alphanum().min(1).max(16).required(),
    description: joi.string().required(),
    address: joi.string().required(),
    postcode: joi.string().alphanum().required()
})

const pwdUpdateSchema = joi.object({
    email: joi.string().email().required(),
    oldPwd: joi.string().pattern(new RegExp('^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\\d)(?=.*?[$@$!%*?&])[A-Za-z\\d$@$!%*?&]{6,16}$')).required(),
    newPwd: joi.string().pattern(new RegExp('^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\\d)(?=.*?[$@$!%*?&])[A-Za-z\\d$@$!%*?&]{6,16}$')).required(),
    repeatPwd: joi.ref('password')
})

module.exports = {
    customerRegisterSchema: customerRegisterSchema,
    providerRegisterSchema: providerRegisterSchema,
    loginSchema: loginSchema,
    infoUpdateSchema: infoUpdateSchema,
    pwdUpdateSchema: pwdUpdateSchema
}