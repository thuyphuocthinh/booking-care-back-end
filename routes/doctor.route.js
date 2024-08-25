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
router.get(
  "/get-doctorIds-by-specialty/:specialtyId",
  controller.getDoctorIdBySpecialty
);
router.get(
  "/get-doctorIds-by-province/:provinceId/:specialtyId",
  controller.getDoctorIdByProvince
);
router.get(
  "/get-doctorIds-by-clinic/:clinicId",
  controller.getDoctorIdByClinic
);
router.get("/get-list-patients/:doctorId/:date", controller.getListPatients);

module.exports = router;

/*
  RestAPI
*/
