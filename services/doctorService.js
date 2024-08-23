const db = require("../models");

const getTopDoctorsService = async (limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      const users = await db.User.findAll({
        limit: limit,
        where: { roleId: "R2" },
        order: [["createdAt", "DESC"]],
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: db.AllCode,
            as: "positionData",
            attributes: ["valueEn", "valueVI"],
          },
          {
            model: db.AllCode,
            as: "genderData",
            attributes: ["valueEn", "valueVI"],
          },
        ],
      });
      resolve({
        errCode: 0,
        data: users,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getAllDoctorsService = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const users = await db.User.findAll({
        where: { roleId: "R2" },
        order: [["createdAt", "DESC"]],
        attributes: {
          exclude: ["password", "image"],
        },
        include: [
          {
            model: db.AllCode,
            as: "positionData",
            attributes: ["valueEn", "valueVI"],
          },
          {
            model: db.AllCode,
            as: "genderData",
            attributes: ["valueEn", "valueVI"],
          },
        ],
      });
      resolve({
        errCode: 0,
        data: users,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const saveInfoDoctorService = async (info) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!info.doctorId || !info.contentHTML || !info.contentMarkdown) {
        resolve({
          errCode: -1,
          msg: "All fields cannot be empty",
        });
      } else {
        await db.Markdown.create({
          doctorId: info.doctorId,
          contentMarkdown: info.contentMarkdown,
          contentHTML: info.contentHTML,
          description: info.description,
        });
        resolve({
          errCode: 0,
          msg: "Saved doctor info successfully",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getDoctorDetailService = async (doctorId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const doctor = await db.User.findOne({
        where: { roleId: "R2", id: doctorId },
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: db.AllCode,
            as: "positionData",
            attributes: ["valueEn", "valueVI"],
          },
          {
            model: db.AllCode,
            as: "genderData",
            attributes: ["valueEn", "valueVI"],
          },
          {
            model: db.Markdown,
            as: "doctorData",
            attributes: ["contentHTML", "contentMarkdown", "description"],
          },
        ],
      });
      if (!doctor) {
        resolve({
          errCode: -1,
          msg: "Doctor does not exist",
        });
      } else {
        doctor.image = new Buffer(doctor.image, "base64").toString("binary");
        resolve({
          errCode: 0,
          data: doctor,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const updateDetailDoctorService = async (doctorInfo) => {
  return new Promise(async (resolve, reject) => {
    try {
      const doctorMarkdown = await db.Markdown.findOne({
        where: { doctorId: doctorInfo.doctorId },
      });
      if (doctorMarkdown) {
        await db.Markdown.update(doctorInfo, {
          where: { doctorId: doctorInfo.doctorId },
        });
        resolve({
          errCode: 0,
          msg: "Updated successfully",
        });
      } else {
        reject({
          errCode: -1,
          msg: "Markdown of this doctor does not exist",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getTopDoctorsService,
  getAllDoctorsService,
  saveInfoDoctorService,
  getDoctorDetailService,
  updateDetailDoctorService,
};
