class ResBody {

    constructor(groupCode, idx, msg) {
        this.groupCode = groupCode
        this.idx = idx
        this.msg = msg
    }

    getCode() {
        return this.groupCode * 100 + this.idx
    }

    getMsg() {
        return this.msg
    }

}

module.exports = ResBody