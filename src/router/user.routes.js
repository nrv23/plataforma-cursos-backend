const { Router } = require("express");
const router = Router();
const {  register, login, login_admin } = require("../controllers/user.controller");

router.post("/register",register);
router.post("/login",login);
router.post("/admin/login",login_admin);


module.exports = router;