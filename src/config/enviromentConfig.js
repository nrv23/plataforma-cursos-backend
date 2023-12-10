const dotenv = require("dotenv");


if (process.env.NODE_ENV === 'dev') {

  dotenv.config({ path: '.dev.env' });

} else if (process.env.NODE_ENV === 'prod') {

  dotenv.config({ path: '.prod.env' });

} else {
  throw new Error("NODE_ENV is not defined or is invalid");
}



module.exports = {

  mongoUrlConnect: process.env.DB_CONNECT,
  tokenSecretKey: process.env.TOKEN_SECRET_KEY,
  serverPort: process.env.SERVER_PORT,
  tokenSecretKey: process.env.TOKEN_SECRET_KEY,
};