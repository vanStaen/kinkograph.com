const { sequelize, DataTypes } = require('../helpers/sequelizedb');

const Picture = sequelize.define("picture", {
  id: {
    type: DataTypes.INTEGER,
    field: "id",
    autoIncrement: true,
    primaryKey: true,
  },
  url_original: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url_thumb: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url_med: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tags: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  original_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  original_type: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  tags_missing: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  adult_content: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  key: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = {
  Picture
};
