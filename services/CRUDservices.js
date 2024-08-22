const db = require("../models");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);

const createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await hashUserPassword(data.password);
      await db.User.create({
        email: data.email,
        password: hashPassword,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phoneNumber: data.phoneNumber,
        gender: data.gender === "1" ? true : false,
        image: data.image,
        roleId: data.roleId,
        positionId: data.positionId,
      });
      resolve("Success! Created a new user successfully");
    } catch (error) {
      reject(error);
    }
  });
};

const hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const hashPassword = await bcrypt.hashSync("B4co//", salt);
      resolve(hashPassword);
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

const getUserById = async (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await db.User.findOne({
        where: { id: userId },
        raw: true,
      });
      if (data) {
        resolve(data);
      } else {
        resolve({});
      }
    } catch (error) {
      console.log(error);
    }
  });
};

const updateUserById = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userId = data.userId;
      // await db.User.update({
      //     where
      // })
    } catch (error) {
      console.log(error);
    }
  });
};

const deleteUserById = async (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await db.User.delete({
        where: { id: userId },
      });
      resolve("Deleted successfully");
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createNewUser,
  getAllUsers,
  getUserById,
};
