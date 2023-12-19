const ResponseBody = require("../DTO/response.body");
const { decodeToken } = require("../utils/jwt");

const getDecodedToken = async (token) => {

    try {
        
        return decodeToken(token)

    } catch (error) {
        
        throw new Error("invalid_token");
    }
}

const auth = async (req, res, next) => {
    
    try {

        //autorizacion por medio del Header
        const authHeader = req.get('Authorization');

        if (!authHeader) { // sino se envia el token0
            const response = new ResponseBody(401,"Missing token");
            return res.status(+response.code).json(response);
        }

        const token = authHeader.split(' ')[1];
        const current = await getDecodedToken(token);
        req.currentUser = current;
        
    } catch (error) { // cae en el catch si el token no es valido
        
        let response;
        
        if (error.message === "invalid_token") {
            response = new ResponseBody(
                401,
                "Token inválido",
                null
            )
        } else {
            response = new ResponseBody(
                500,
                "Hubo un error",
                null
            )
        }

        return res.status(response.code).json(response)
    }

    next();
}

module.exports = auth;