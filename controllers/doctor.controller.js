const {
  getTopDoctorsService,
  getAllDoctorsService,
  saveInfoDoctorService,
  getDoctorDetailService,
  updateDetailDoctorService,
  getExtraInfoDoctorService,
  getProfileDoctorService,
  getDoctorIdBySpecialtyService,
  getDoctorIdByProvinceService,
  getDoctorIdByClinicService,
  getListPatientsService,
} = require("../services/doctorService");

const getTopDoctorsHome = async (req, res) => {
  try {
    const limit = parseInt(req.params.limit) || 10;
    const resp = await getTopDoctorsService(limit);
    return res.status(200).json(resp);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server...",
    });
  }
};

const getAllDoctors = async (req, res) => {
  try {
    const resp = await getAllDoctorsService();
    return res.status(200).json(resp);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server...",
    });
  }
};

const saveInfoDoctor = async (req, res) => {
  try {
    const resp = await saveInfoDoctorService(req.body);
    return res.status(200).json(resp);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server...",
    });
  }
};

const getDoctorDetail = async (req, res) => {
  try {
    if (!req.params.doctorId) {
      return res.status(400).json({
        errCode: -1,
        msg: "Doctor ID is required",
      });
    } else {
      const resp = await getDoctorDetailService(req.params.doctorId);
      return res.status(200).json(resp);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      errCode: -1,
      msg: "Error server",
    });
  }
};

const updateDetailDoctor = async (req, res) => {
  try {
    const resp = await updateDetailDoctorService(req.body);
    return res.status(200).json(resp);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server...",
    });
  }
};

const getExtraInfoDoctor = async (req, res) => {
  try {
    if (!req.params.doctorId) {
      return res.status(400).json({
        errCode: -1,
        msg: "Doctor ID is required",
      });
    } else {
      const resp = await getExtraInfoDoctorService(req.params.doctorId);
      return res.status(200).json(resp);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      errCode: -1,
      msg: "Error server",
    });
  }
};

const getProfileDoctor = async (req, res) => {
  try {
    if (!req.params.doctorId) {
      return res.status(400).json({
        errCode: -1,
        msg: "Doctor ID is required",
      });
    } else {
      const resp = await getProfileDoctorService(req.params.doctorId);
      return res.status(200).json(resp);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      errCode: -1,
      msg: "Error server",
    });
  }
};

const getDoctorIdBySpecialty = async (req, res) => {
  try {
    if (req.params.specialtyId) {
      const resp = await getDoctorIdBySpecialtyService(
        parseInt(req.params.specialtyId)
      );
      return res.status(200).json(resp);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      errCode: -1,
      errMsg: "Error server...",
    });
  }
};

const getDoctorIdByProvince = async (req, res) => {
  try {
    if (req.params.provinceId && req.params.specialtyId) {
      const resp = await getDoctorIdByProvinceService(
        req.params.provinceId,
        parseInt(req.params.specialtyId)
      );
      return res.status(200).json(resp);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      errCode: -1,
      errMsg: "Error server...",
    });
  }
};

const getDoctorIdByClinic = async (req, res) => {
  try {
    if (req.params.clinicId) {
      const resp = await getDoctorIdByClinicService(
        parseInt(req.params.clinicId)
      );
      return res.status(200).json(resp);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      errCode: -1,
      errMsg: "Error server...",
    });
  }
};

const getListPatients = async (req, res) => {
  try {
    if (req.params.doctorId && req.params.date) {
      const resp = await getListPatientsService(
        parseInt(req.params.doctorId),
        Number(req.params.date)
      );
      return res.status(200).json(resp);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      errCode: -1,
      errMsg: "Error server...",
    });
  }
};

module.exports = {
  getDoctorIdByProvince,
  getTopDoctorsHome,
  getAllDoctors,
  saveInfoDoctor,
  getDoctorDetail,
  updateDetailDoctor,
  getExtraInfoDoctor,
  getDoctorIdByClinic,
  getProfileDoctor,
  getDoctorIdBySpecialty,
  getListPatients,
};
