const { Model, DataTypes } = require("sequelize");
const dbConnection = require("../../db/connection");

class User extends Model {}

User.init(
  {
    username: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
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
    modelName: "User",
  }
);

module.exports = User;
