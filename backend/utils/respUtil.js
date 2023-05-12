function rtnJson(res, code, msg) {
    return res.json(
        JSON.stringify(
            {
                code: code,
                msg: msg
            }
        )
    )
}

function rtnJson(res, code, msg, obj) {
    return res.json(
        JSON.stringify(
            {
                code: code,
                msg: msg,
                return_obj: obj
            }
        )
    )
}

module.exports.rtnJson = rtnJson