const express = require("express");
const controller = require("../controllers/user.controller");
const router = express.Router();

router.post("/login", controller.login);
router.get("/get-all-users", controller.getAllUsers);
router.get("/get-user-by-id/:userId", controller.getUserById);
router.get("/delete/:userId", controller.deleteUserById);
router.post("/create-new-user", controller.createNewUser);
router.patch("/update-user", controller.updateUserById);

module.exports = router;

/*
  RestAPI
*/
