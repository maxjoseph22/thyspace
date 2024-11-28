const express = require("express");
const router = express.Router();

const { AllianceController } = require("../controllers/alliances");

router.post("/", AllianceController.requestAlliance)

module.exports = router;