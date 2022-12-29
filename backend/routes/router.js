const router = require("express").Router();

// Service router 
const serviceRouter = require("./services");
router.use("/", serviceRouter);

// Party router 
const partyRouter = require("./party");
router.use("/", partyRouter);

module.exports = router;