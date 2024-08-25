const express = require("express");
const controller = require("../controllers/specialty.controller");
const router = express.Router();

router.post("/save-specialty-info", controller.saveSpecialtyInfo);
router.get("/get-top-specialty/:limit", controller.getTopSpecialty);
router.get("/get-all-specialty", controller.getAllSpecialty);
router.get("/get-detail-specialty/:specialtyId", controller.getDetailSpecialty);

module.exports = router;

/*
  RestAPI
*/
