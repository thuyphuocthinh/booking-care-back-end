const express = require("express");
const controller = require("../controllers/schedule.controller");
const router = express.Router();

router.post("/create-new-schedule", controller.createNewSchedule);
router.get(
  "/get-schedule-doctor-by-date/:doctorId/:date",
  controller.getScheduleDoctorByDate
);

module.exports = router;

/*
  RestAPI
*/
