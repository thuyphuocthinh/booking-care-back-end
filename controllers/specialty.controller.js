const {
  saveSpecialtyInfoService,
  getTopSpecialtyService,
  getAllSpecialtyService,
  getDetailSpecialtyService,
} = require("../services/specialtyServices");

const saveSpecialtyInfo = async (req, res) => {
  try {
    const resp = await saveSpecialtyInfoService(req.body);
    if (resp) {
      res.status(200).json(resp);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      errCode: -1,
      errMsg: "Error server...",
    });
  }
};

const getTopSpecialty = async (req, res) => {
  try {
    if (req.params.limit) {
      const { limit } = req.params;
      const resp = await getTopSpecialtyService(parseInt(limit));
      return res.status(200).json(resp);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      errCode: -1,
      errMsg: "Error server",
    });
  }
};

const getAllSpecialty = async (req, res) => {
  try {
    const resp = await getAllSpecialtyService();
    return res.status(200).json(resp);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      errCode: -1,
      errMsg: "Error server",
    });
  }
};

const getDetailSpecialty = async (req, res) => {
  try {
    if (req.params.specialtyId) {
      const { specialtyId } = req.params;
      const resp = await getDetailSpecialtyService(parseInt(specialtyId));
      return res.status(200).json(resp);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      errCode: -1,
      errMsg: "Error server",
    });
  }
};

module.exports = {
  saveSpecialtyInfo,
  getTopSpecialty,
  getAllSpecialty,
  getDetailSpecialty,
};
