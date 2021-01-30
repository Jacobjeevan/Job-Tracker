const { Model, DataTypes } = require("sequelize");
const dbConnection = require("../../db/connection");

class Users extends Model {}

Users.init(
  {
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
  },
  {
    sequelize: dbConnection,
    modelName: "Users",
  }
);

module.exports = Users;
