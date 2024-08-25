const { MAX_NUMBER } = require("../config/constants");
const db = require("../models");
const _ = require("lodash");
const moment = require("moment");

const createNewScheduleService = async (info) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!info.arrSchedule || !info.doctorId || !info.date) {
        resolve({
          errCode: 1,
          errMsg: "Missing required parameter",
        });
      } else {
        // prepare schedule and existing
        let schedule = info.arrSchedule;
        let doctorId = info.doctorId;
        let date = moment(info.date).format("YYYY-MM-DD");
        if (schedule && schedule.length > 0) {
          schedule = schedule.map((item) => {
            item.maxNumber = MAX_NUMBER;
            item.currentNumber = 0;
            item.date = moment(info.date).format("YYYY-MM-DD");
            return item;
          });
        }

        let existing = await db.Schedule.findAll({
          where: { doctorId: doctorId, date: date },
          attributes: ["timeType", "date", "doctorId", "maxNumber"],
          raw: true,
        });

        // compare the difference between two arrays by criterias
        const toCreate = _.differenceWith(schedule, existing, (a, b) => {
          return a.timeType === b.timeType && a.date === b.date;
        });

        // only store difference
        if (toCreate && toCreate.length > 0) {
          await db.Schedule.bulkCreate(toCreate);
        }

        resolve({
          errCode: 0,
          msg: "Created schedule successfully",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getScheduleDoctorByDateService = async (doctorId, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await db.Schedule.findAll({
        where: {
          doctorId: doctorId,
          date: date,
        },
        include: [
          {
            model: db.AllCode,
            as: "timeTypeData",
            attributes: ["valueEn", "valueVI"],
          },
          {
            model: db.User,
            as: "doctorInfo",
            attributes: ["firstName", "lastName"],
          },
        ],
      });
      if (data) {
        resolve({
          errCode: 0,
          msg: "Success",
          data: data,
        });
      } else {
        resolve({
          errCode: 0,
          data: [],
          msg: "Data does not exist",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createNewScheduleService,
  getScheduleDoctorByDateService,
};
