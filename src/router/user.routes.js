const { Router } = require("express");
const router = Router();
const {  register, login,status } = require("../controllers/user.controller");

router.post("/register",register);
router.post("/login",login);
router.get("/status",status);


module.exports = router;