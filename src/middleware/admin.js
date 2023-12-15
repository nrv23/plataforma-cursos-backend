const { roles } = require("../config/constants");
const ResponseBody = require("../DTO/response.body");

const isAdmin = (req, res, next) => {

    try {

        // preguntar si el role es admin 
        const { currentUser } = req;

        if (currentUser.role === roles.admin) return next();

        else {

            const response = new ResponseBody(401, "No está autorizado");
            return res.status(response.code).json(response);

        }

    } catch (error) { // cae en el catch si el token no es valido

        const response = new ResponseBody(
            500,
            "Hubo un error",
            null
        )

        return res.status(response.code).json(response)
    }
}

module.exports = {
    isAdmin
}