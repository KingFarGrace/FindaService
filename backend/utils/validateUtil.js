/* Some encapsulated functions for joi verification */
const joi = require('joi')

function verify(schema, data) {
    const { error, value } = schema.validate(data)
    if (error) {
        var message = ''
        for (i = 0, length = error.details.length; i < length; i++) {
            message = message + error.details[i].message
        }
        return {
            msg: message,
            valid: false
        }
    }
    return {
        msg: 'Data verified.',
        valid: true
    }
}

module.exports.verify = verify