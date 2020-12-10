'use strict';
const Sequelize = require('sequelize');

module.exports = sequelize => {
  class Tag extends Sequelize.Model {}
  Tag.init(
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
    },
    { sequelize }
  );

  Tag.associate = models => {
    Tag.belongsToMany(models.Quote, {
      through: 'QuoteTags',
    });
  };

  return Tag;
};
