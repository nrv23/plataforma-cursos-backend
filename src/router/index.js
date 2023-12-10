const { Router } = require("express");
const userRoutes = require("./user.routes");
const statusRoutes = require("./status");

const router = Router();

router.use("/users",userRoutes);
router.use("/status",statusRoutes);

module.exports = router;