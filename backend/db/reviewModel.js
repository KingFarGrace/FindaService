const mongoose = require('./index')

const reviewSchema = mongoose.Schema({
    provider: String,
    service: String,
    username: String,
    content: String,
    level: {
        type: String,
        default: "good"
    },
    ctime: {
        type: Date,
        default: Date.now
    }
})

module.exports.reviewModel = mongoose.model('review', reviewSchema, 'review')