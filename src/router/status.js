const { Router } = require("express");
const alive = require("../controllers/status.controller");

const router = Router(); 
router.get("/",alive);

module.exports = router;