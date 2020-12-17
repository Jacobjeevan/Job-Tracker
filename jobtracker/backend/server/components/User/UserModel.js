const { Model, DataTypes } = require("sequelize");
const dbConnection = require("../../db/connection"),
  Job = require("../Job/JobModel");

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
    dbConnection,
    modelName: "User",
  }
);

User.hasMany(Job, {
  foreignKey: "author",
});

module.exports = User;
