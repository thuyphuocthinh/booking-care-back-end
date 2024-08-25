const express = require("express");
const controller = require("../controllers/booking.controller");
const router = express.Router();

router.post("/save-booking-info", controller.saveBookingInfo);
router.get("/verify", controller.verifyToken);

module.exports = router;

/*
  RestAPI
*/
