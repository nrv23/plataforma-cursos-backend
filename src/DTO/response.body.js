

class ResponseBody {

    constructor(code = 200, message = "", data = null) {
        this.code = code;
        this.message = message;
        this.data = data;
    }
}


module.exports = ResponseBody;