const { Model, DataTypes } = require("sequelize");
const dbConnection = require("../../db/connection"),
  Job = require("../Job/JobModel");

class Location extends Model {}

Location.init(
  {
    city: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING(3),
      allowNull: false,
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0,
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0,
    },
  },
  {
    dbConnection,
    modelName: "Location",
  }
);

Location.hasMany(Job, {
  foreignKey: "location",
});

module.exports = Location;
