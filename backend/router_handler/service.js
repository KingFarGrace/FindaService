const rtnJson = require('../utils/respUtil')
const successRtn = require('../resp/resps').success
const failRtn = require('../resp/resps').failure
const serviceModel = require('../db/serviceModel').serviceModel

function makeQuery(catagory, city) {
    var isCatagoryExist = false
    var isCityExist = false
    if (catagory !== '' && catagory !== undefined && catagory !== null) isCatagoryExist = true
    if (city !== '' && city !== undefined && city !== null) isCityExist = true
    if (isCatagoryExist && isCityExist) return { catagory: catagory, city: { $regex: new RegExp(city, 'i') } }
    if (isCatagoryExist && !isCityExist) return { catagory: catagory }
    if (!isCatagoryExist && isCityExist) return { city: { $regex: new RegExp(city, 'i') } }
    if (!isCatagoryExist && !isCityExist) return {  }
}

function getServices(req, res) {
    var query = req.query
    var pageCap = 5
    var serviceQuery = makeQuery(query.catagory, query.city)
    serviceModel.countDocuments({ serviceQuery }).then((err, count) => {
        if (err) return rtnJson(
            res,
            failRtn.dbOperationError
        )
        if (count === 0) return rtnJson(
            res,
            failRtn.noSuchService
        )
        // TODO: return count or Math.ceil(count / pageCap)
        // pageNum: start by 0 or 1?
        serviceModel.find({ serviceQuery }).limit(pageCap).skip(pageCap * query.pageNum)
        .then((data, err) => {
            // data.count = count
            // data.pageCount = Math.ceil(count / query.pageCap)
            if (err) return rtnJson(
                res,
                failRtn.dbOperationError
            )
            return rtnJson(
                res,
                successRtn.retrieve,
                'catagory=' + query.catagory + '&city=' + query.city + '&pageNum=' + query.pageNum,
                data
            )
        })
    })
}

function addService(req, res) {
    var body = req.body
    var doc = new serviceModel(body)
    doc.save().then((data, err) => {
        if (err) return rtnJson(
            res,
            failRtn.dbOperationError
        )
    })
    return rtnJson(
        res,
        successRtn.create,
        ' Waiting for acception from admin...'
    )
}