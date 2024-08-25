const {
  PATIENT_CODE,
  STATUS_NEW,
  STATUS_CONFIRMED,
} = require("../config/constants");
const { buildHtml } = require("../helpers/buildHtml");
const { buildSubject } = require("../helpers/buildSubject");
const { sendMail } = require("../helpers/sendMail");
const { v4: uuidv4 } = require("uuid");
const db = require("../models");
const { buildUrl } = require("../helpers/buildUrl");

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
            firstName: info.fullName,
            email: info.email,
            roleId: PATIENT_CODE,
            gender: info.gender,
            address: info.address,
          },
        });
        if (user) {
          const token = uuidv4();
          // upsert user (patient)
          const [booking, created] = await db.Booking.findOrCreate({
            where: {
              patientId: user.id,
              doctorId: info.doctorId,
              timeType: info.timeType,
              statusId: STATUS_CONFIRMED,
            },
            defaults: {
              doctorId: info.doctorId,
              patientId: user.id,
              statusId: STATUS_NEW,
              timeType: info.timeType,
              date: info.date,
              token: token,
            },
          });
          console.log("finish booking create");
          // send mail
          const url = buildUrl(token, info.doctorId);
          const html = buildHtml(info.language, info, url);
          const subject = buildSubject(info.language);
          sendMail(info.email, subject, html);
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

const verifyBookingService = async (token, doctorId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const existBookingRecord = await db.Booking.findOne({
        where: {
          token: token,
          doctorId: doctorId,
          statusId: STATUS_NEW,
        },
      });
      if (existBookingRecord) {
        await db.Booking.update(
          {
            statusId: STATUS_CONFIRMED,
          },
          {
            where: {
              token: token,
              doctorId: doctorId,
              statusId: STATUS_NEW,
            },
          }
        );
        resolve({
          errCode: 0,
          msg: "Confirmed booking successfully",
        });
      } else {
        resolve({
          errCode: -1,
          msg: "Appointment has been confirmed or does not exist",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  saveBookingInfoService,
  verifyBookingService,
};
