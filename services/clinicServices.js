const db = require("../models");

const saveClinicInfoService = async (info) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !info.name ||
        !info.contentHTML ||
        !info.contentMarkdown ||
        !info.address ||
        !info.image
      ) {
        resolve({
          errCode: -1,
          errMsg: "Missing parameters",
        });
      } else {
        await db.Clinic.create({
          image: info.image,
          name: info.name,
          contentHTML: info.contentHTML,
          contentMarkdown: info.contentMarkdown,
          address: info.address,
        });
        resolve({
          errCode: 0,
          msg: "Created clinic successfully",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getAllClinicService = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await db.Clinic.findAll();
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
          errCode: -1,
          data: [],
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getDetailClinicService = async (clinicId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await db.Clinic.findOne({
        where: { id: clinicId },
      });
      if (data) {
        resolve({
          errCode: 0,
          data: data,
        });
      } else {
        resolve({
          errCode: -1,
          data: [],
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  saveClinicInfoService,
  getAllClinicService,
  getDetailClinicService,
};
