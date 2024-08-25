const { sendMail } = require("../helpers/sendMail");
const {
  saveBookingInfoService,
  verifyBookingService,
} = require("../services/bookingServices");
const db = require("../models");

const saveBookingInfo = async (req, res) => {
  try {
    const resp = await saveBookingInfoService(req.body);
    return res.status(200).json(resp);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      errCode: -1,
      errMsg: "Error server",
    });
  }
};

const verifyToken = async (req, res) => {
  try {
    if (req.query.token && req.query.doctorId) {
      const { token, doctorId } = req.query;
      const resp = await verifyBookingService(token, doctorId);
      console.log(resp);
      res.status(200).json(resp);
    } else {
      res.status(400).json({
        errCode: -1,
        errMsg: "Missing parameters",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      msg: "error",
    });
  }
};

module.exports = {
  saveBookingInfo,
  verifyToken,
};
