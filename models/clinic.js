"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Clinic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Clinic.hasMany(models.Doctor_Info, {
        foreignKey: "clinicId",
        as: "clinicData",
      });
    }
  }
  Clinic.init(
    {
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      contentHTML: DataTypes.TEXT("long"),
      contentMarkdown: DataTypes.TEXT("long"),
      image: DataTypes.BLOB("long"),
    },
    {
      sequelize,
      modelName: "Clinic",
    }
  );
  return Clinic;
};
