const ResponseBody = require("../DTO/response.body");

const alive = (_,res) => { //comentario01
    const response = new ResponseBody(
        200,
        'API is Online',
        {
            status: "Alive",
            date: new Date().toUTCString()
        } 
    )
    return res.status(+response.code).json(response);
}
module.exports = alive;