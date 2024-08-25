require("dotenv").config();

module.exports.buildUrl = (token, doctorId) => {
  return `${process.env.DOMAIN}/booking/verify?token=${token}&doctorId=${doctorId}`;
};
