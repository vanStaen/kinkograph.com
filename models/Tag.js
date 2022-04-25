const { sequelize, DataTypes } = require('../helpers/sequelizedb');

const Tag = sequelize.define("tag", {
  id: {
    type: DataTypes.INTEGER,
    field: "id",
    autoIncrement: true,
    primaryKey: true,
  },
  tag_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = {
  Tag
};
