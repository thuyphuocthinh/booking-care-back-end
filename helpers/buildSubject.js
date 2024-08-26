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

module.exports.buildSubjectForAttachment = (language) => {
  let subject;
  if (language === languages.VI) {
    subject = "THÔNG TIN KẾT QUẢ KHÁM BỆNH";
  } else {
    subject = "TREATMENT'S RESULT FROM BOOKINGCARE";
  }
  return subject;
};
