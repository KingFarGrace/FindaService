var mongoose = require('./index')

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    role: String,
    password: String,
    description: {
        type: String,
        default: 'Nothing here.'
    },
    address: {
        type: String,
        default: 'Fill out this blank to benefit your searching.'
    },
    postcode: {
        type: String,
        default: 'Postcode should be valid and match your address.'
    },
    available: {
        type: Boolean,
        default: false
    },
    ctime: {
        type: Date,
        default: Date.now
    }
})

module.exports.userModel = mongoose.model('user', userSchema, 'user')