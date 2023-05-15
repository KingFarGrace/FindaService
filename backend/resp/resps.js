/**
 * this file stored return code and messages in objs.
 */
const ResBody = require('./resBody')
const _suci = 0

/**
 * Return group: login
 * Group code: 1
 */
const loginSuccess = new ResBody(1, _suci, 'Login successfully.')
const accessInvalid = new ResBody(1, 1, 'Invalid access (unknown role of visitor).')
const noSuchUser = new ResBody(1, 2, 'Email address or username not exists.')
const incorrectPwd = new ResBody(1, 3, 'Incorrect password.')

/**
 * Return group: register
 * Group code: 1
 */
const registerSuccess = new ResBody(1, 10, 'Register successfully.')
const accountDataInvalid = new ResBody(1, 11, 'Failed to validate the data.')
const duplicatedEmail = new ResBody(1, 12, 'Email has been used, please change.')
const duplicatedUsername = new ResBody(1, 13, 'Username has been used, please change.')

/**
 * Return group: common
 * Group code: 5
 */
const dbOperationError = new ResBody(1, 1, 'Unable to connect to the data server, please try later or contact administrators.')

module.exports.success = {
    login: loginSuccess,
    register: registerSuccess
}

module.exports.failure = {
    /* Group 1 */
    accessInvalid: accessInvalid,
    noSuchUser: noSuchUser,
    accountDataInvalid: accountDataInvalid,
    duplicatedEmail: duplicatedEmail,
    duplicatedUsername: duplicatedUsername,
    incorrectPwd: incorrectPwd,
    /* Group 2 */

    /* Group 3 */

    /* Group 4 */

    /* Group 5 */
    dbOperationError: dbOperationError,
}