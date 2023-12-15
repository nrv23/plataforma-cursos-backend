const { User } = require("../models");
const ResponseBody = require("../DTO/response.body");
const ResponseUser = require("../DTO/response-user");
const { encriptPassword, comparePass } = require("../utils/encriptPass");
const JwtBody = require("../DTO/jwt-body");
const { createToken } = require("../utils/jwt");
const logger = require("../config/logger");


const register = async (req, res) => {

    try {

        let response = null;
        const {
            role,
            name,
            surname,
            email,
            password
        } = req.body;

        const hashed = await encriptPassword(password);

        const newUser = await User.create({
            role,
            name,
            surname,
            email,
            password: hashed
        });

        if (!newUser) {
            response = new ResponseBody(
                500,
                "No se pudo registrar el usuario",
                null
            );
        } else {

            delete newUser.password;

            response = new ResponseBody(
                201,
                "Usuario registrado con éxito",
                new ResponseUser(
                    newUser.name,
                    newUser.surname,
                    newUser.email
                )
            );
        }

        return res.status(+response.code).json(response);

    } catch (error) {

        console.log(error);
        logger.error('Error en la consulta a la base de datos', { error });
        const response = new ResponseBody(
            500,
            "Hubo un error",
            null
        );

        return res.status(500).json(response);
    }
}

const login = async (req, res) => {

    try {

        const {
            body: {
                email, password = ""
            }
        } = req;
        let response;

        const user = await User.findOne({
            email,
            state: 1
        });

        if (!user) {
            response = new ResponseBody(
                404,
                "Credenciales incorrectos"
            );

            return res.status(+response.code).json(response);
        }

        if ((await comparePass(password, user.password))) {

            response = new ResponseBody(
                200,
                "",
                {
                    token: createToken(new JwtBody(user._id, user.role, user.email)),
                    user: new ResponseUser(
                        user.name,
                        user.surname,
                        user.email,
                        user.avatar || ""
                    )
                });
            return res.status(+response.code).json(response);

        } else {

            response = new ResponseBody(
                400,
                "Credenciales incorrectos"
            );
            return res.status(+response.code).json(response);
        }


    } catch (error) {

        console.log(error);
        logger.error('Error en la consulta a la base de datos', { error });
        const response = new ResponseBody(
            500,
            "Hubo un error",
            null
        );

        return res.status(500).json(response);
    }
}

// ----- login para la parte admin 

const login_admin = async (req, res) => {

    try {

        const {
            body: {
                email, password = ""
            }
        } = req;
        let response;

        const user = await User.findOne({
            email,
            state: 1,
            role: "admin"
        });

        if (!user) {
            response = new ResponseBody(
                404,
                "Credenciales incorrectos"
            );

            return res.status(+response.code).json(response);
        }

        if ((await comparePass(password, user.password))) {

            response = new ResponseBody(
                200,
                "",
                {
                    token: createToken(new JwtBody(user._id, user.role, user.email)),
                    user: new ResponseUser(
                        user.name,
                        user.surname,
                        user.email,
                        user.avatar || ""
                    )
                });
            return res.status(+response.code).json(response);

        } else {

            response = new ResponseBody(
                400,
                "Credenciales incorrectos"
            );
            return res.status(+response.code).json(response);
        }


    } catch (error) {

        console.log(error);
        logger.error("error al registrar un usuario");
        const response = new ResponseBody(
            500,
            "Hubo un error",
            null
        );



        return res.status(500).json(response);
    }
}

module.exports = {
    register,
    login,
    login_admin
}