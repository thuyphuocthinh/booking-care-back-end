const express = require("express");
const controller = require("../controllers/doctor.controller");
const router = express.Router();

router.get("/get-all-doctors", controller.getAllDoctors);
router.get("/get-top-doctors/:limit", controller.getTopDoctorsHome);
router.post("/save-info-doctor", controller.saveInfoDoctor);

module.exports = router;

/*
  RestAPI
*/
