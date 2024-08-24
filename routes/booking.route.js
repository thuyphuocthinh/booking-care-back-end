const express = require("express");
const controller = require("../controllers/booking.controller");
const router = express.Router();

router.post("/save-booking-info", controller.saveBookingInfo);

module.exports = router;

/*
  RestAPI
*/
