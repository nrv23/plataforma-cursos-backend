const ResponseBody = require("../DTO/response.body");

const notFound = (_,res) => { //comentario01
    const response = new ResponseBody(
        404,
        'Recurso no encontrado' 
    )
    return res.status(+response.code).json(response);
}

module.exports = notFound;