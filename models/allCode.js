"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AllCode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AllCode.hasMany(models.User, {
        foreignKey: "positionId",
        as: "positionData",
      });
      AllCode.hasMany(models.User, { foreignKey: "gender", as: "genderData" });
      AllCode.hasMany(models.Schedule, {
        foreignKey: "timeType",
        as: "timeTypeData",
      });
      AllCode.hasMany(models.Booking, {
        foreignKey: "timeType",
        as: "timeTypeBooking",
      });
      AllCode.hasMany(models.Doctor_Info, {
        foreignKey: "priceId",
        as: "priceType",
      });
      AllCode.hasMany(models.Doctor_Info, {
        foreignKey: "paymentId",
        as: "paymentType",
      });
      AllCode.hasMany(models.Doctor_Info, {
        foreignKey: "provinceId",
        as: "provinceType",
      });
    }
  }
  AllCode.init(
    {
      keyMap: DataTypes.STRING,
      type: DataTypes.STRING,
      valueEn: DataTypes.STRING,
      valueVi: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "AllCode",
    }
  );
  return AllCode;
};
