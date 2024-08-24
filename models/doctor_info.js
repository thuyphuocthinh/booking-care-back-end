"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Doctor_Info extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Doctor_Info.belongsTo(models.User, {
        foreignKey: "doctorId",
      });
      Doctor_Info.belongsTo(models.AllCode, {
        foreignKey: "priceId",
        targetKey: "keyMap",
        as: "priceType",
      });
      Doctor_Info.belongsTo(models.AllCode, {
        foreignKey: "paymentId",
        targetKey: "keyMap",
        as: "paymentType",
      });
      Doctor_Info.belongsTo(models.AllCode, {
        foreignKey: "provinceId",
        targetKey: "keyMap",
        as: "provinceType",
      });
    }
  }
  Doctor_Info.init(
    {
      doctorId: DataTypes.INTEGER,
      paymentId: DataTypes.STRING,
      priceId: DataTypes.STRING,
      provinceId: DataTypes.STRING,
      addressClinic: DataTypes.STRING,
      nameClinic: DataTypes.STRING,
      note: DataTypes.STRING,
      count: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Doctor_Info",
    }
  );
  return Doctor_Info;
};
