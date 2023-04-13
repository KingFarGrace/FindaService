/**
 * This file stored return code and messages in objs.
 * The code of each return object is Group code * 100 + index. 
 */

/**
 * Return group: login
 * Group code: 1
 */
const loginSuccess = { code: 100, msg: 'Login successfully.' }

const accessInvalid = { code: 101, msg: 'Invalid access (unknown role of visitor). Error: ' }

const noSuchUser = { code: 102, msg: 'Email address not exists. Eamil: ' }

const incorrectPwd = { code: 103, msg: 'Incorrect password.' }

/**
 * Return group: register
 * Group code: 1
 */
const registerSuccess = { code: 110, msg: 'Register successfully.' }

const accountDataInvalid = { code: 111, msg: 'Failed to validate the data. Error: ' }

const duplicatedField = { code: 112, msg: 'Duplicated field: ' }

/**
 * Return group: common
 * Group code: 5
 */
const dbOperationError = { code: 501, msg: 'Unable to connect to the data server, please try later or contact administrators. Error: ' }

module.exports.success = {
    login: loginSuccess,
    register: registerSuccess
}

module.exports.failure = {
    /* Group 1 */
    accessInvalid: accessInvalid,
    noSuchUser: noSuchUser,
    accountDataInvalid: accountDataInvalid,
    duplicatedField: duplicatedField,
    incorrectPwd: incorrectPwd,
    /* Group 2 */

    /* Group 3 */

    /* Group 4 */

    /* Group 5 */
    dbOperationError: dbOperationError,
}