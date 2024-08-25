const {
  saveClinicInfoService,
  getAllClinicService,
  getDetailClinicService,
} = require("../services/clinicServices");

const saveClinicInfo = async (req, res) => {
  try {
    const resp = await saveClinicInfoService(req.body);
    return res.status(200).json(resp);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      errCode: -1,
      errMsg: "Error server",
    });
  }
};

const getAllClinic = async (req, res) => {
  try {
    const resp = await getAllClinicService();
    return res.status(200).json(resp);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      errCode: -1,
      errMsg: "Error server",
    });
  }
};

const getDetailClinic = async (req, res) => {
  try {
    if (req.params.clinicId) {
      const { clinicId } = req.params;
      const resp = await getDetailClinicService(parseInt(clinicId));
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
  saveClinicInfo,
  getAllClinic,
  getDetailClinic,
};
