const requestModel = require('../db/requestModel').requestModel
const rtnJson = require('../utils/respUtil').rtnJson
const successRtn = require('../resp/resps').success
const failRtn = require('../resp/resps').failure

function sendRequest(req, res) {
    var body = req.body
    var doc = new requestModel(body)
    doc.save().then((data, err) => {
        if (err) return rtnJson(
            res,
            failRtn.dbOperationError
        )
        return rtnJson(
            res,
            successRtn.create,
            ':Request'
        )
    })
}

function updateRequest(req, res) {
    var body = req.body
    requestModel.findOneAndUpdate({ _id: body._id }, 
        { content: body.content, status: body.status }
    ).then((data, err) => {
        if (err) return rtnJson(
            res,
            failRtn.dbOperationError
        )
        if (data === null) return rtnJson(
            res,
            failRtn.noMatchedRequest,
            '_id: ' + body._id
        )
        return rtnJson(
            res,
            successRtn.update
        )
    })
}

function getRequests(req, res) {
    var subject = req.params.subject
    if (subject === 'sender') return getRequests2Others(req, res)
    if (subject === 'receiver') return getRequests2Me(req, res)
    if (subject === 'history') return getHistoryRequests(req, res)
}

// Sender's
function getRequests2Others(req, res) {
    var query = req.query
    requestModel.find({ 
        sender: query.email, 
        status: { $ne: 'rejected' }, 
        status: { $ne: 'completed' } 
    }).then((data, err) => {
        if (err) return rtnJson(
            res, 
            failRtn.dbOperationError
        )
        if (data.length === 0) return rtnJson(
            res,
            failRtn.noRequestsFound
        )
        return rtnJson(
            res,
            successRtn.retrieve,
            ': Request.',
            data
        )
    })
}

// Receiver's
function getRequests2Me(req, res) {
    var query = req.query
    requestModel.find({ 
        receiver: query.email, 
        status: { $ne: 'rejected' }, 
        status: { $ne: 'completed' }
    }).then((data, err) => {
        if (err) return rtnJson(
            res, 
            failRtn.dbOperationError
        )
        if (data.length === 0) return rtnJson(
            res,
            failRtn.noRequestsFound
        )
        return rtnJson(
            res,
            successRtn.retrieve,
            ': Request.',
            data
        )
    })
}

// History
function getHistoryRequests(req, res) {
    var query = req.query
    requestModel.find({ 
        receiver: query.email,
        $or: [
            { status: 'rejected' },
            { status: 'completed' }
        ]
    }).then((data, err) => {
        if (err) return rtnJson(
            res, 
            failRtn.dbOperationError
        )
        if (data.length === 0) return rtnJson(
            res,
            failRtn.noRequestsFound
        )
        return rtnJson(
            res,
            successRtn.retrieve,
            ': Request.',
            data
        )
    })
}

module.exports = {
    sendRequest: sendRequest,
    updateRequest: updateRequest,
    getRequests: getRequests
}