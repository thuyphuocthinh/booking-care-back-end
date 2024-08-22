const db = require("../models/index");

const getAllCodeService = async (typeInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = {};
      if (typeInput) {
        const result = await db.AllCode.findAll({
          where: { type: typeInput },
        });
        res.errCode = 0;
        res.data = result;
      } else {
        res.errCode = -1;
        res.message = "Missing type parameter";
      }
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getAllCodeService,
};
