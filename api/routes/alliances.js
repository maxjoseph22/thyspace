const express = require("express");
const router = express.Router();

const { AllianceController } = require("../controllers/alliances");

router.post("/:id", AllianceController.requestAlliance)
router.post("/:id/cancel", AllianceController.withdrawAllianceRequest)
router.post("/:id/forge", AllianceController.acceptAlliance)
router.post("/:id/reject", AllianceController.rejectAlliance)
router.get("/:id/receivedRequestsAdmin", AllianceController.viewReceivedRequestsAdmin)
router.get("/viewReceivedRequests", AllianceController.viewReceivedRequests)

module.exports = router;