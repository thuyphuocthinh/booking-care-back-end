const userServices = require("../services/userServices");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    // validate
    if (!username || !password) {
      return res.status(404).json({
        msg: "Username or password is empty",
      });
    }
    // check
    const exist = await userServices.handleLogin(username, password);
    // return
    res.status(200).json(exist);
  } catch (error) {
    console.log(error);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userServices.getAllUsers();
    res.status(200).json({
      data: users,
    });
  } catch (error) {
    console.log(error);
  }
};

const createNewUser = async (req, res) => {
  try {
    const message = await userServices.createNewUser(req.body);
    return res.status(200).json(message);
  } catch (error) {
    console.log(error);
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const result = await userServices.getUserById(userId);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

const updateUserById = async (req, res) => {
  const msg = await userServices.updateUserById(req.body);
  res.status(200).json(msg);
};

const deleteUserById = async (req, res) => {
  try {
    const message = await userServices.deleteUserById(req.params.userId);
    res.status(200).json(message);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  login,
  getAllUsers,
  createNewUser,
  getUserById,
  updateUserById,
  deleteUserById,
};
