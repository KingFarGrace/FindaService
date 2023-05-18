const ResBody = require("../resp/resBody")

function rtnJson(res, resp, sysMsg, obj) {
    return res.json(
        JSON.stringify({
            code: resp.getCode(),
            msg: resp.getMsg() + sysMsg,
            return_obj: obj
        })
    )
}

module.exports.rtnJson = rtnJson