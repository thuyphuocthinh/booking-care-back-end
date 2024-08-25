const express = require("express");
const controller = require("../controllers/clinic.controller");
const router = express.Router();

router.post("/save-clinic-info", controller.saveClinicInfo);
router.get("/get-all-clinic", controller.getAllClinic);
router.get("/get-detail-clinic/:clinicId", controller.getDetailClinic);

module.exports = router;

/*
  RestAPI
*/
