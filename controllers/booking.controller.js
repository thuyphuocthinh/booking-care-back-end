const { saveBookingInfoService } = require("../services/bookingServices");

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

module.exports = {
  saveBookingInfo,
};
