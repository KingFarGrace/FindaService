const mongoose = require('./index')

const requestSchema = mongoose.Schema({
    sender: String,
    receiver: String,
    service: {
        name: {
            type: String,
            default: ''
        },
        cost: {
            type: Number,
            default: 0
        }
    },
    content: {
        type: String,
        default: 'No content.'
    },
    status: {
        type: String,
        default: 'pending'
    },
    ctime: {
        type: Date,
        default: Date.now
    }
})

module.exports.requestModel = mongoose.model('request', requestSchema, 'request')