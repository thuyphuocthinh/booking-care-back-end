const { PATIENT_CODE, STATUS_NEW } = require("../config/constants");
const db = require("../models");

const saveBookingInfoService = async (info) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!info.email) {
        resolve({
          errCode: -1,
          errMsg: "Missing email parameter",
        });
      } else {
        // find or create patient
        const [user, created] = await db.User.findOrCreate({
          where: { email: info.email },
          defaults: {
            email: info.email,
            roleId: PATIENT_CODE,
          },
        });
        if (user) {
          await db.Booking.findOrCreate({
            where: { patientId: user.id },
            defaults: {
              doctorId: info.doctorId,
              patientId: user.id,
              statusId: STATUS_NEW,
              timeType: info.timeType,
              date: info.date,
            },
          });
          resolve({
            errCode: 0,
            msg: "Created booking appointment successfully",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  saveBookingInfoService,
};
