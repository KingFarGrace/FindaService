var mongoose = require('./index')

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    role: String,
    password: String,
    address: {
        type: String,
        default: 'Fill out this blank to benefit your searching.'
    },
    postcode: {
        type: String,
        default: 'Postcode should be valid and match your address.'
    }
})

module.exports.userModel = mongoose.model('user', userSchema, 'user')