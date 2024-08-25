const db = require("../models");

const saveSpecialtyInfoService = async (info) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !info.name ||
        !info.image ||
        !info.contentMarkdown ||
        !info.contentHTML
      ) {
        resolve({
          errCode: -1,
          errMsg: "Missing parameters",
        });
      } else {
        await db.Specialty.create({
          image: info.image,
          name: info.name,
          contentHTML: info.contentHTML,
          contentMarkdown: info.contentMarkdown,
        });
        resolve({
          errCode: 0,
          msg: "Created specialty successfully",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getTopSpecialtyService = async (limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await db.Specialty.findAll({
        limit: limit,
      });
      if (data && data.length > 0) {
        for (const item of data) {
          item.image = new Buffer(item.image, "base64").toString("binary");
        }
        resolve({
          errCode: 0,
          data: data,
        });
      } else {
        resolve({
          errCode: 0,
          data: [],
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getAllSpecialtyService = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await db.Specialty.findAll({
        attributes: {
          exclude: ["image"],
        },
      });
      if (data && data.length > 0) {
        resolve({
          errCode: 0,
          data: data,
        });
      } else {
        resolve({
          errCode: 0,
          data: [],
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getDetailSpecialtyService = async (specialtyId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await db.Specialty.findOne({
        where: { id: specialtyId },
      });
      if (data) {
        if (data.image) {
          data.image = new Buffer(data.image, "base64").toString("binary");
        }
        resolve({
          errCode: 0,
          data: data,
        });
      } else {
        resolve({
          errCode: 0,
          data: {},
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  saveSpecialtyInfoService,
  getTopSpecialtyService,
  getAllSpecialtyService,
  getDetailSpecialtyService,
};
