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

function rtnJson(res, resp) {
    return res.json(
        JSON.stringify({
            code: resp.getCode(),
            msg: resp.getMsg()
        })
    )
}

function rtnJson(res, resp, obj) {
    return res.json(
        JSON.stringify({
            code: resp.getCode(),
            msg: resp.getMsg(),
            obj: obj
        })
    )
}

module.exports.rtnJson = rtnJson