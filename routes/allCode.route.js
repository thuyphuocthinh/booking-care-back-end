const express = require("express");
const controller = require("../controllers/allCode.controller");
const router = express.Router();

router.get("/", controller.getAllCode);

module.exports = router;

/*
  RestAPI
*/
