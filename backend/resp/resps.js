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
 * Return group: retrieve
 * Group code: 2
 */
const retrieveSuccess = new ResBody(2, _suci, 'Successfully retrieve data.')
const invalidUsername = new ResBody(2, 1, 'Username not exists.')
const invalidEmail = new ResBody(2, 2, 'Email not exists.')

/**
 * Return group: update
 * Group code: 3
 */
const updateSuccess = new ResBody(3, _suci, 'Successfully update data.')
const duplicatedPwd = new ResBody(3, 1, 'The new password is the same as the old one, please change.')

/**
 * Return group: common
 * Group code: 5
 */
const dbOperationError = new ResBody(1, 1, 'Unable to connect to the data server, please try later or contact administrators.')

module.exports.success = {
    login: loginSuccess,
    register: registerSuccess,
    retrieve: retrieveSuccess,
    update: updateSuccess
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
    invalidUsername: invalidUsername,
    invalidEmail: invalidEmail,
    /* Group 3 */
    duplicatedPwd: duplicatedPwd,
    /* Group 4 */

    /* Group 5 */
    dbOperationError: dbOperationError,
}