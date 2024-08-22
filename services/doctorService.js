const db = require("../models/index");

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
      } else {
        reject({
          errCode: -1,
          msg: "All fields cannot be empty",
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
};
