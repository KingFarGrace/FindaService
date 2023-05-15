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
const retrieveSuccess = new ResBody(2, _suci, 'Successfully retrieve the data.')
const invalidUsername = new ResBody(2, 1, 'Username not exists.')
const invalidEmail = new ResBody(2, 2, 'Email not exists.')
const noMatchedService = new ResBody(2, 3, 'No matched services.')
const noServicesFound = new ResBody(2, 4, 'No services found.')
const noMatchedReview = new ResBody(2, 5, 'No matched reviews.')
const noReviewsFound = new ResBody(2, 6, 'No reviews found.')
const noMatchedRequest = new ResBody(2, 7, 'No matched requests.')
const noRequestsFound = new ResBody(2, 8, 'No requests found.')

/**
 * Return group: update
 * Group code: 3
 */
const updateSuccess = new ResBody(3, _suci, 'Successfully update the document.')
const duplicatedPwd = new ResBody(3, 1, 'The new password is the same as the old one, please change.')
const alreadyActivated = new ResBody(3, 2, 'The service / account has already been activated.')

/** 
 * Return group: create
 * Group code: 4
 */
const createSuccess = new ResBody(4, _suci, 'Successfully create the document.')

/**
 * Return group: delete
 * Group code: 5
 */
const deleteSuccess = new ResBody(5, _suci, 'Successfully deleted document.')

/**
 * Return group: common
 * Group code: 6
 */
const dbOperationError = new ResBody(6, 1, 'Unable to connect to the data server, please try later or contact administrators.')

module.exports.success = {
    login: loginSuccess,
    register: registerSuccess,
    retrieve: retrieveSuccess,
    update: updateSuccess,
    create: createSuccess,
    delete: deleteSuccess
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
    noMatchedService: noMatchedService,
    noServicesFound: noServicesFound,
    noMatchedReview: noMatchedReview,
    noReviewsFound: noReviewsFound,
    noMatchedRequest: noMatchedRequest,
    noRequestsFound: noRequestsFound,
    /* Group 3 */
    duplicatedPwd: duplicatedPwd,
    alreadyActivated: alreadyActivated,
    /* Group 4 */

    /* Group 5 */

    /* Group 6 */
    dbOperationError: dbOperationError,
}