const userModel = require('../db/userModel').userModel
const serviceModel = require('../db/serviceModel').serviceModel
const reviewModel = require('../db/reviewModel').reviewModel
const rtnJson = require('../utils/respUtil').rtnJson
const successRtn = require('../resp/resps').success
const failRtn = require('../resp/resps').failure

function setUserStatus(req, res, available) {
    var body = req.body
    userModel.findOne({ role: 'admin', password: body.adminKey }).then((data, err) => {
        if (err) return rtnJson(
            res,
            failRtn.dbOperationError
        )
        if (data === null) return rtnJson(
            res,
            failRtn.incorrectPwd
        )
        userModel.findOneAndUpdate({ email: body.email }, { available: available })
        .then((data, err) => {
            if (err) return rtnJson(
                res,
                failRtn.dbOperationError
            )
            if (data === null) return rtnJson(
                res,
                failRtn.invalidEmail
            )
            return rtnJson(
                res,
                successRtn.update
            )
        })
    })
}

function activateUser(req, res) {
    setUserStatus(req, res, true)
}

function rmUser(req, res) {
    setUserStatus(req, res, false)
}

function activateService(req, res) {
    var body = req.body
    userModel.findOne({ role: 'admin', password: body.adminKey }).then((data, err) => {
        if (err) return rtnJson(
            res,
            failRtn.dbOperationError
        )
        if (data === null) return rtnJson(
            res,
            failRtn.incorrectPwd
        )
        serviceModel.findOneAndUpdate(
            { provider: body.provider, service: body.service }, 
            { available: true }
        ).then((data, err) => {
            if (err) return rtnJson(
                res,
                failRtn.dbOperationError
            )
            if (data === null) return rtnJson(
                res,
                failRtn.noMatchedService
            )
            if (data.available === true) return rtnJson(
                res,
                failRtn.alreadyActivated
            ) 
            return rtnJson(
                res, 
                successRtn.update,
                ' provider: ' + body.provider + ' service: ' + body.service
            )
        })
    })
}

function getUnavailableServices(req, res) {
    serviceModel.find({ available: false }).then((data, err) => {
        if (err) return rtnJson(
            res,
            failRtn.dbOperationError
        )
        return rtnJson(
            res,
            successRtn.retrieve,
            ':unavailable service',
            data
        )
    })
}

function rmReviews(req, res) {
    var body = req.body
    userModel.findOne({ role: 'admin', password: body.adminKey }).then((data, err) => {
        if (err) return rtnJson(
            res,
            failRtn.dbOperationError
        )
        if (data === null) return rtnJson(
            res,
            failRtn.incorrectPwd
        )
        reviewModel.findOneAndDelete({ provider: body.provider, service: body.service, username: body.username })
        .then((data, err) => {
            if (err) return rtnJson(
                res,
                failRtn.dbOperationError
            )
            if (data === null) return rtnJson(
                res,
                failRtn.noMatchedReview
            )
            return rtnJson(
                res,
                successRtn.delete
            )
        })
    })
}

function getUnavailableUsers(req, res) {
    userModel.find({ available: false }).then((data, err) => {
        if (err) return rtnJson(
            res,
            failRtn.dbOperationError
        )
        return rtnJson(
            res,
            successRtn.retrieve,
            ':unavailable user',
            data
        )
    })
}

function getLowLevelProviders(req, res) {
    userModel.aggregate([
        {
            $match: { role: 'serviceProvider' }
        },
        {
            $lookup: {
                from: 'service',
                localField: 'username',
                foreignField: 'provider',
                as: 'services'
            }
        },
        {
            $lookup: {
                from: 'review',
                localField: 'services',
                foreignField: 'service',
                as: 'reviews'
            }
        }
    ]).then((data, err) => {
        if (err) return rtnJson(
            res,
            failRtn.dbOperationError
        )
        var avgProviderRate = []
        for (i = 0; i < data.length; i++) {
            var provider = data[i].username
            var services = data[i].services
            var sumrate = 0
            for (j = 0; j < services.length; j++) {
                var service = services[j]
                sumrate += service.favrate
            }
            var avgrate = sumrate / services.length
            if (avgrate < 0.9) avgProviderRate.push({ 
                provider: provider, 
                avgrate: avgrate 
            })
        }
        return rtnJson(
            res,
            successRtn.retrieve,
            'Low level providers.',
            avgProviderRate
        )
    })
}

module.exports = {
    activateUser: activateUser,
    rmUser: rmUser,
    activateService: activateService,
    getUnavailableServices: getUnavailableServices,
    rmReviews: rmReviews,
    getUnavailableUsers: getUnavailableUsers,
    getLowLevelProviders: getLowLevelProviders
}