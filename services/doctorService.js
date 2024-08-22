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

module.exports = {
  getTopDoctorsService,
  getAllDoctorsService,
};
