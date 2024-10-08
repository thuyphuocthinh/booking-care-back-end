const moment = require("moment/moment");
const { STATUS_CONFIRMED, STATUS_DONE } = require("../config/constants");
const db = require("../models");
const { buildHtmlForAttachment } = require("../helpers/buildHtml");
const { buildSubjectForAttachment } = require("../helpers/buildSubject");
const { sendAttachment } = require("../helpers/sendMail");

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
        await db.Doctor_Info.create({
          specialtyId: info.specialtyId,
          clinicId: info.clinicId,
          doctorId: info.doctorId,
          priceId: info.priceId,
          paymentId: info.paymentId,
          provinceId: info.provinceId,
          note: info.note,
          nameClinic: info.nameClinic,
          addressClinic: info.addressClinic,
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
          {
            model: db.Doctor_Info,
            as: "doctorInfoData",
            attributes: {
              exclude: ["id", "doctorId"],
            },
            include: [
              {
                model: db.AllCode,
                as: "priceType",
                attributes: ["valueEn", "valueVi"],
              },
              {
                model: db.AllCode,
                as: "paymentType",
                attributes: ["valueEn", "valueVi"],
              },
              {
                model: db.AllCode,
                as: "provinceType",
                attributes: ["valueEn", "valueVi"],
              },
              {
                model: db.Specialty,
                as: "specialtyData",
                attributes: ["id", "name"],
              },
              {
                model: db.Clinic,
                as: "clinicData",
                attributes: ["id", "name"],
              },
            ],
          },
        ],
      });
      if (!doctor) {
        resolve({
          errCode: -1,
          msg: "Doctor does not exist",
          data: [],
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
        const markdownUpdate = {
          description: doctorInfo.description,
          contentHTML: doctorInfo.contentHTML,
          contentMarkdown: doctorInfo.contentMarkdown,
        };
        const doctorInfoUpdate = {
          specialtyId: doctorInfo.specialtyId,
          clinicId: doctorInfo.clinicId,
          priceId: doctorInfo.priceId,
          paymentId: doctorInfo.paymentId,
          provinceId: doctorInfo.provinceId,
          note: doctorInfo.note,
          nameClinic: doctorInfo.nameClinic,
          addressClinic: doctorInfo.addressClinic,
        };
        await db.Markdown.update(markdownUpdate, {
          where: { doctorId: doctorInfo.doctorId },
        });
        const findDoctorId = await db.Doctor_Info.findOne({
          where: { doctorId: doctorInfo.doctorId },
        });
        if (!findDoctorId) {
          await db.Doctor_Info.create({
            doctorId: doctorInfo.doctorId,
            priceId: doctorInfo.priceId,
            paymentId: doctorInfo.paymentId,
            provinceId: doctorInfo.provinceId,
            note: doctorInfo.note,
            nameClinic: doctorInfo.nameClinic,
            addressClinic: doctorInfo.addressClinic,
          });
        } else {
          await db.Doctor_Info.update(doctorInfoUpdate, {
            where: { doctorId: doctorInfo.doctorId },
          });
        }
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

const getExtraInfoDoctorService = async (doctorId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const doctor = await db.Doctor_Info.findOne({
        where: { doctorId: doctorId },
        attributes: {
          exclude: ["id", "doctorId"],
        },
        include: [
          {
            model: db.AllCode,
            as: "priceType",
            attributes: ["valueEn", "valueVi"],
          },
          {
            model: db.AllCode,
            as: "paymentType",
            attributes: ["valueEn", "valueVi"],
          },
          {
            model: db.AllCode,
            as: "provinceType",
            attributes: ["valueEn", "valueVi"],
          },
        ],
      });
      if (doctor) {
        resolve({
          errCode: 0,
          data: doctor,
        });
      } else {
        resolve({
          errCode: 0,
          msg: "Does not exist",
          data: [],
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getProfileDoctorService = async (doctorId) => {
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
            model: db.Markdown,
            as: "doctorData",
            attributes: ["contentHTML", "contentMarkdown", "description"],
          },
          {
            model: db.Doctor_Info,
            as: "doctorInfoData",
            attributes: {
              exclude: ["id", "doctorId"],
            },
            include: [
              {
                model: db.AllCode,
                as: "priceType",
                attributes: ["valueEn", "valueVi"],
              },
              {
                model: db.AllCode,
                as: "paymentType",
                attributes: ["valueEn", "valueVi"],
              },
              {
                model: db.AllCode,
                as: "provinceType",
                attributes: ["valueEn", "valueVi"],
              },
            ],
          },
        ],
      });
      if (doctor) {
        if (doctor.image) {
          doctor.image = new Buffer(doctor.image, "base64").toString("binary");
        }
        resolve({
          errCode: 0,
          data: doctor,
        });
      } else {
        resolve({
          errCode: -1,
          data: {},
          msg: "No data",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getDoctorIdBySpecialtyService = async (specialtyId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Doctor_Info.findAll({
        where: { specialtyId: specialtyId },
        attributes: ["doctorId"],
      });
      if (data) {
        data = data.map((item) => item.doctorId);
        resolve({
          errCode: 0,
          data: data,
        });
      } else {
        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getDoctorIdByProvinceService = async (provinceId, specialtyId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Doctor_Info.findAll({
        where: { provinceId: provinceId, specialtyId: specialtyId },
        attributes: ["doctorId"],
      });
      if (data) {
        data = data.map((item) => item.doctorId);
        resolve({
          errCode: 0,
          data: data,
        });
      } else {
        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getDoctorIdByClinicService = async (clinicId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Doctor_Info.findAll({
        where: { clinicId: clinicId },
        attributes: ["doctorId"],
      });
      if (data) {
        data = data.map((item) => item.doctorId);
        resolve({
          errCode: 0,
          data: data,
        });
      } else {
        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getListPatientsService = async (doctorId, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      const dateTimeStamp = moment(date).format("YYYY-MM-DD");
      let data = await db.Booking.findAll({
        where: {
          doctorId: doctorId,
          date: dateTimeStamp,
          statusId: STATUS_CONFIRMED,
        },
        include: [
          {
            model: db.User,
            as: "patientData",
            attributes: ["firstName", "gender", "email", "address"],
            include: {
              model: db.AllCode,
              as: "genderData",
              attributes: ["valueVi", "valueEn"],
            },
          },
          {
            model: db.AllCode,
            as: "timeTypeBooking",
            attributes: ["valueEn", "valueVi"],
          },
        ],
      });
      if (data && data.length > 0) {
        resolve({
          errCode: 0,
          data: data,
        });
      } else {
        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const sendRemedyService = async (info) => {
  return new Promise(async (resolve, reject) => {
    try {
      const record = await db.Booking.findOne({
        where: {
          patientId: info.patientId,
          doctorId: info.doctorId,
          statusId: STATUS_CONFIRMED,
          timeType: info.timeType,
        },
      });
      if (record) {
        await db.Booking.update(
          {
            statusId: STATUS_DONE,
          },
          {
            where: {
              patientId: info.patientId,
              doctorId: info.doctorId,
              statusId: STATUS_CONFIRMED,
              timeType: info.timeType,
            },
          }
        );

        const html = buildHtmlForAttachment(info.language);
        const subject = buildSubjectForAttachment(info.language);
        sendAttachment(info.email, subject, html, info.image, resolve);
      } else {
        resolve({
          errCode: -1,
          msg: "Booking does not exist",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getDoctorIdByProvinceService,
  getTopDoctorsService,
  getAllDoctorsService,
  saveInfoDoctorService,
  getDoctorDetailService,
  updateDetailDoctorService,
  getExtraInfoDoctorService,
  getProfileDoctorService,
  getDoctorIdByClinicService,
  getDoctorIdBySpecialtyService,
  getListPatientsService,
  sendRemedyService,
};
