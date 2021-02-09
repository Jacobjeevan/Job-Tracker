"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        "Jobs",
        {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
          },
          createdAt: {
            type: Sequelize.DATE,
          },
          updatedAt: {
            type: Sequelize.DATE,
          },
          title: {
            type: Sequelize.STRING(100),
            allowNull: false,
          },
          employer: {
            type: Sequelize.STRING(100),
            allowNull: false,
          },
          apply_date: {
            type: Sequelize.DATEONLY,
            allowNull: false,
            defaultValue: Sequelize.fn("NOW"),
          },
          description: {
            type: Sequelize.STRING(3500),
            allowNull: false,
          },
          city: {
            type: Sequelize.STRING(100),
            allowNull: false,
          },
          state: {
            type: Sequelize.STRING(3),
            allowNull: false,
          },
          UserId: {
            type: Sequelize.INTEGER,
            references: {
              model: "Users",
              key: "id",
            },
            allowNull: false,
            onUpdate: "cascade",
            onDelete: "cascade",
          },
          LocationId: {
            type: Sequelize.INTEGER,
            references: {
              model: "Locations",
              key: "id",
            },
            allowNull: true,
            onUpdate: "cascade",
            onDelete: "cascade",
          },
        },
        { transaction }
      );
      await queryInterface.addIndex("Jobs", ["UserId"], { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Jobs");
  },
};
