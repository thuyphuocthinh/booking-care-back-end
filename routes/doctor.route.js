const express = require("express");
const controller = require("../controllers/doctor.controller");
const router = express.Router();

router.get("/get-all-doctors", controller.getAllDoctors);
router.get("/get-top-doctors/:limit", controller.getTopDoctorsHome);

module.exports = router;

/*
  RestAPI
*/
