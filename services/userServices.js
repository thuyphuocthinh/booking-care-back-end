const db = require("../models");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);

const handleLogin = async (username, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let isExist = await checkEmail(username);
      if (isExist) {
        const user = await db.User.findOne({
          where: { email: username },
        });
        const checkPassword = bcrypt.compareSync(password, user.password);
        if (checkPassword) {
          resolve({
            successMsg: "Login successfully",
            email: user.email,
            roleId: user.roleId,
            firstName: user.firstName,
            lastName: user.lastName,
          });
        } else {
          resolve({
            errCode: -1,
            errMsg: "Password incorrect",
          });
        }
      } else {
        resolve({
          errCode: -1,
          errMsg: "Email does not exist",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const checkEmail = async (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
      });
      if (!user) {
        resolve(false);
      } else {
        resolve(true);
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getAllUsers = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await db.User.findAll({
        raw: true,
      });
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

const createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const check = await checkEmail(data.email);
      if (check) {
        resolve({ msg: "Email already exist" });
        return;
      }
      let hashPassword = await hashUserPassword(data.password);
      await db.User.create({
        email: data.email,
        password: hashPassword,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phoneNumber: data.phoneNumber,
        gender: data.gender,
        image: data.image,
        roleId: data.roleId,
        positionId: data.positionId,
      });
      resolve({ msg: "Success! Created a new user successfully" });
    } catch (error) {
      reject(error);
    }
  });
};

const hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (error) {
      reject(error);
    }
  });
};

const deleteUserById = async (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: { id: userId },
      });
      if (!user) {
        resolve({ errCode: -1, msg: "User does not exist" });
      } else {
        await user.destroy();
        resolve({ errCode: 0, msg: "Deleted successfully" });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getUserById = async (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: { id: userId },
      });
      console.log(user.image);
      resolve({
        msg: "success",
        data: user,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const updateUserById = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      //
      const user = await db.User.findOne({
        where: { id: data.id },
        raw: true,
      });

      if (user) {
        await db.User.update(data, {
          where: { id: data.id },
        });
        resolve({
          errCode: 0,
          msg: "Update successfully",
        });
      } else {
        resolve({
          errCode: -1,
          msg: "Update failed",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  handleLogin,
  getAllUsers,
  createNewUser,
  deleteUserById,
  getUserById,
  updateUserById,
};
