'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Quote extends Sequelize.Model {}
  Quote.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    verse: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    author: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    sourceText: {
      type: Sequelize.STRING,
      
    },
    date: {
      type: Sequelize.DATE,
      
    }
  }, { sequelize });

 
  Quote.associate = (models) => {
    Quote.belongsTo(models.Topic, {
        as: 'topic',
        foreignKey: {
          fieldName: 'topicId'
        },
      });    
  };

  return Quote;
};
