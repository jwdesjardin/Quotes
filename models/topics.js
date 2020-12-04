'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Topic extends Sequelize.Model {}
  Topic.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    }
  }, { sequelize });

 
  Topic.associate = (models) => {
    Topic.hasMany(models.Quote, {
        as: 'topic',
        foreignKey: {
          fieldName: 'topicId'
        },
      });    
  };

  return Topic;
};