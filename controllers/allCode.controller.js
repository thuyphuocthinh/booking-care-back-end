const { getAllCodeService } = require("../services/allCodeServices");

const getAllCode = async (req, res) => {
  try {
    const typeInput = req.query.type;
    let result = await getAllCodeService(typeInput);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

module.exports = {
  getAllCode,
};
