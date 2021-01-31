const { Sequelize, Model, DataTypes } = require("sequelize");
const dbConnection = require("../../db/connection"),
  Location = require("../Location/LocationModel"),
  Users = require("../User/UserModel");

class Job extends Model {}

Job.init(
  {
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    employer: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    apply_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: Sequelize.fn("NOW"),
    },
    description: {
      type: DataTypes.STRING(3500),
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING(3),
      allowNull: false,
    },
  },
  {
    sequelize: dbConnection,
    modelName: "Job",
  }
);

Job.belongsTo(Location, {
  as: "Location",
});
Users.hasMany(Job);
Job.belongsTo(Users, {
  foreignKey: "UserId",
  as: "Author",
});

module.exports = Job;
