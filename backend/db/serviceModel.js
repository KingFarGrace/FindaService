const mongoose = require('./index')

const serviceSchema = mongoose.Schema({
    provider: String,
    service: String,
    catagory: String,
    description: String,
    area: String,
    availability: {
        type: String,
        default: "Please contact the service provider for specific availability."
    },
    price: String,
    favrate: {
        type: Number,
        default: 0
    },
    available: {
        type: Boolean,
        default: false
    }
})

module.exports.serviceModel = mongoose.model('service', serviceSchema, 'service')