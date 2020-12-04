'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Author extends Sequelize.Model {}
  Author.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    bornDate: {
      type: Sequelize.DATE,
      
    },
    deadDate: {
      type: Sequelize.DATE,
      
    }
  }, { sequelize });

 
  
  Author.associate = (models) => {
    Author.hasMany(models.Quote);    
  };

  return Author;
};