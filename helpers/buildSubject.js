const { languages } = require("../config/constants");

module.exports.buildSubject = (language) => {
  let subject;
  if (language === languages.VI) {
    subject = "XÁC NHẬN ĐẶT LỊCH KHÁM BỆNH TRÊN BOOKINGCARE";
  } else {
    subject = "APPOINTMENT VERIFICATION FROM BOOKINGCARE";
  }
  return subject;
};
