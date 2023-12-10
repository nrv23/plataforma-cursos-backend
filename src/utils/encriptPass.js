const bcrypt = require("bcrypt");


async function encriptPassword(passwordText) {

    const saltRounds = 10;
    const salt = await getSalt(saltRounds);
    console.log({ salt, passwordText })
    const password = await hash(passwordText, salt);

    return password;
}

function getSalt(rounds) {

    return new Promise((resolve, rect) => {
        bcrypt.genSalt(rounds, (err, salt) => {

            if (err) throw err;
            return resolve(salt);
        })
    })
}

function hash(plainTextPassword, salt) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(plainTextPassword, salt, (err, pass) => {

            if (err) throw err;
            return resolve(pass);
        })
    })
}

function comparePass(password, hashPass) {

    return new Promise((resolve, reject) => {

        bcrypt.compare(password, hashPass, (err, response) => {
            if (err) throw err;
            return resolve(response);
        })
    })
}



module.exports = {
    encriptPassword,
    comparePass
}