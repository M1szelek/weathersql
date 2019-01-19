'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Snapshots', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      time: {
        type: Sequelize.INTEGER
      },
      summary: {
        type: Sequelize.STRING
      },
      icon: {
        type: Sequelize.STRING
      },
      precipIntensity: {
        type: Sequelize.FLOAT
      },
      precipProbability: {
        type: Sequelize.FLOAT
      },
      temperature: {
        type: Sequelize.FLOAT
      },
      apparentTemperature: {
        type: Sequelize.FLOAT
      },
      dewPoint: {
        type: Sequelize.FLOAT
      },
      humidity: {
        type: Sequelize.FLOAT
      },
      pressure: {
        type: Sequelize.FLOAT
      },
      windSpeed: {
        type: Sequelize.FLOAT
      },
      windGust: {
        type: Sequelize.FLOAT
      },
      windBearing: {
        type: Sequelize.INTEGER
      },
      cloudCover: {
        type: Sequelize.FLOAT
      },
      uvIndex: {
        type: Sequelize.TINYINT
      },
      visibility: {
        type: Sequelize.FLOAT
      },
      ozone: {
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Snapshots');
  }
};