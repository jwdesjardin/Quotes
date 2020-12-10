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
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    location: {
      type: Sequelize.STRING,
    },
    bornYear: {
      type: Sequelize.STRING,
      
    },
    deadYear: {
      type: Sequelize.STRING,
      
    }
  }, { sequelize });

 
  
  Author.associate = (models) => {
    Author.hasMany(models.Quote);    
  };

  return Author;
};