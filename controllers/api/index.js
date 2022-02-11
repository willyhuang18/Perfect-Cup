const router = require("express").Router();
const coffeeRoutes = require("./coffee-routes");
const beanRoutes = require("./bean-routes");
const userRoutes = require("./user-routes");
const roastRoutes = require("./roast-routes");
const sweetenerRoutes = require("./sweetener-routes");

//Prefix all routes
router.use("/coffee", coffeeRoutes);
router.use("/beans", beanRoutes);
router.use("/roasts", roastRoutes);
router.use("/sweeteners", sweetenerRoutes);
router.use("/users", userRoutes);

module.exports = router;