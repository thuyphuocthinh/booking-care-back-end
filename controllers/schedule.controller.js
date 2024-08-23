const { timestampToDate } = require("../helpers/time");
const {
  createNewScheduleService,
  getScheduleDoctorByDateService,
} = require("../services/scheduleServices");
const moment = require("moment");

const createNewSchedule = async (req, res) => {
  try {
    const resp = await createNewScheduleService(req.body);
    return res.status(200).json(resp);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      errCode: -1,
      msg: "Error server...",
    });
  }
};

const getScheduleDoctorByDate = async (req, res) => {
  try {
    if (req.params.doctorId && req.params.date) {
      const doctorId = req.params.doctorId;
      const date = moment(parseInt(req.params.date)).format(
        "YYYY-MM-DD HH:MM:SS"
      );
      const resp = await getScheduleDoctorByDateService(doctorId, date);
      return res.status(200).json(resp);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      errCode: -1,
      msg: "Error server...",
    });
  }
};

module.exports = {
  createNewSchedule,
  getScheduleDoctorByDate,
};
