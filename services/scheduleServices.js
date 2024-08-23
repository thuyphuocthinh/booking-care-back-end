const { MAX_NUMBER } = require("../config/constants");
const db = require("../models");
const _ = require("lodash");

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
        let doctorId, date;
        if (schedule && schedule.length > 0) {
          doctorId = info.doctorId;
          date = info.date;
          schedule = schedule.map((item) => {
            item.maxNumber = MAX_NUMBER;
            item.currentNumber = 0;
            return item;
          });
        }
        let existing = await db.Schedule.findAll({
          where: { doctorId: doctorId, date: date },
          attributes: ["timeType", "date", "doctorId", "maxNumber"],
        });
        if (existing && existing.length > 0) {
          existing = existing.map((item) => {
            item.date = new Date(item.date).getTime();
            return item;
          });
        }
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
