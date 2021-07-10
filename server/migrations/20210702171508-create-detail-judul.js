'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('DetailJuduls', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      judulId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Juduls',
          key: 'id',
        },
        onUpdate: 'Cascade',
        onDelete: 'Cascade',
      },
      value: {
        type: Sequelize.STRING,
      },
      score: {
        type: Sequelize.FLOAT,
      },
      dospemStatus: {
        type: Sequelize.STRING,
      },
      kaprodiStatus: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('DetailJuduls')
  },
}
