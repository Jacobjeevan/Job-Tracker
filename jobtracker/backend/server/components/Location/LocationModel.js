const { Model, DataTypes } = require("sequelize");
const dbConnection = require("../../db/connection");

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
    sequelize: dbConnection,
    modelName: "Location",
  }
);

module.exports = Location;
