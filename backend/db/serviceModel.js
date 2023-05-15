const mongoose = require('./index')

const serviceSchema = mongoose.Schema({
    provider: String,
    service: String,
    catagory: String,
    description: String,
    area: String,
    availability: String,
    price: String,
    available: {
        type: Boolean,
        default: false
    }
})

module.exports.serviceModel = mongoose.model('service', serviceSchema, 'service')