const { languages } = require("../config/constants");

module.exports.buildHtml = (language, data, url) => {
  let html = "";
  if (language === languages.VI) {
    html = `
      <div>
        <h3>Xin chào ${data.fullName}</h3>
        <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên BookingCare</p>
        <p>Thông tin đặt lịch khám bệnh</p>
        <p><b>Thời gian: ${data.dateTimeFormat}</b></p>
        <p><b>Bác sĩ: ${data.doctorLastName} ${data.doctorFirstName}</b></p>
        <p>
          Nếu các thông tin trên là đúng sự thật, vui lòng click vào đường link dưới đây
          để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh.
        </p>
        <p>
          <a href=${url} target="_blank">
            Click here
          </a>
        </p>
      </div>
      `;
  } else {
    html = `
      <div>
        <h3>Dear, ${data.fullName},</h3>
        <p>Thanks for booking an appointment on BookingCare,</p>
        <p>Appointment's information,</p>
        <p><b>Time: ${data.dateTimeFormat}</b></p>
        <p><b>Doctor: ${data.doctorFirstName}, ${data.doctorLastName}</b></p>
        <p>
          Please, click on the link below if the above information is true
          to verify and complete the process.
        </p>
        <p>
          <a href=${url} target="_blank">
            Click here
          </a>
        </p>
        <p>Best regards.</p>
      </div>
      `;
  }
  return html;
};

module.exports.buildHtmlForAttachment = (language) => {
  let html = "";
  if (language === languages.VI) {
    html = `
      <div>
        <p>Bạn nhận được email này vì đã sử dụng dịch vụ của BookingCare</p>
        <p>THông tin đơn thuốc / hóa đơn được gửi trong file đính kèm</p>
        <p>Xin chân thành cảm ơn</p>
      </div>
      `;
  } else {
    html = `
      <div>
        <p>Thanks for using BookingCare's services,</p>
        <p>Your remedy / bill was attached in the file below</p>
        <p>Best regards.</p>
      </div>
      `;
  }
  return html;
};
