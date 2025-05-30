// models/User.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // seu arquivo de conexão Sequelize

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID, // identificador único
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['lawyer', 'client']],
      }
    },
  },
  {
    tableName: "users",
    timestamps: true,
    underscored: true
  }
);

module.exports = User;
