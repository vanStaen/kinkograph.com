const { sequelize, DataTypes } = require('../lib/sequelizedb');

const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    field: "id",
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
    validate: {
      isEmail: true
    },
  },
  pwd: {
    type: DataTypes.STRING,
    required: true,
  },
  access_code: {
    type: DataTypes.STRING,
    required: false,
  },
  avatar: {
    type: DataTypes.STRING,
    required: false,
  },
  emailSettings: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "{}",
  },
  profilSettings: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "{}",
  },
  language: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "en",
  },
  gender: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 3,
  },
  verifiedEmail: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  archived: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  last_login: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  is_admin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  nb_picture_at_last_login: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  favorites: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    defaultValue: [],
  },
});


User.belongsToMany(User, { 
  as: 'friends',
  foreignKey: 'user_id',
  through: UsersFriends
});
User.belongsToMany(User, { 
  as: 'userFriends',
  foreignKey: 'friend_id',
  through: UsersFriends
});

User.belongsToMany(User, { 
  as: 'followers',
  foreignKey: 'follower_id',
  through: UsersFollowers
});
User.belongsToMany(User, { 
  as: 'followed',
  foreignKey: 'followed_id',
  through: UsersFollowers
});

module.exports = {
  User
};
