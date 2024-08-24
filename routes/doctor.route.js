const express = require("express");
const controller = require("../controllers/doctor.controller");
const router = express.Router();

router.get("/get-all-doctors", controller.getAllDoctors);
router.get("/get-top-doctors/:limit", controller.getTopDoctorsHome);
router.post("/save-info-doctor", controller.saveInfoDoctor);
router.get("/get-detail-doctor/:doctorId", controller.getDoctorDetail);
router.patch("/update-detail-doctor", controller.updateDetailDoctor);
router.get("/get-extra-info-doctor/:doctorId", controller.getExtraInfoDoctor);
router.get("/get-profile-doctor/:doctorId", controller.getProfileDoctor);

module.exports = router;

/*
  RestAPI
*/
