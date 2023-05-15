/* Some encapsulated functions for joi verification */
function verify(schema, data) {
    var { error, value } = schema.validate(data)
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

function exists(arg) {
    if (arg !== '' && arg !== undefined && arg !== null) return true
    return false
}

module.exports = {
    verify: verify,
    exists: exists
}