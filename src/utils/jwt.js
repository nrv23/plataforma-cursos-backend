const jwt = require("jwt-simple");
const moment = require("moment");
const { tokenSecretKey } = require("../config/enviromentConfig");

const createToken = usuario => {

    return jwt.encode({
        id: usuario._id,
        role: usuario.role,
        email: usuario.email,
        iat: moment().unix(),
        exp: moment().add(1, 'day').unix() // vence un dia despues
    }, tokenSecretKey);

}

const decodeToken = token => {

    try {
        return jwt.decode(token, tokenSecretKey, false);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createToken,
    decodeToken
}