// models/Client.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Client = sequelize.define('Client', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  client_type: {
    type: DataTypes.ENUM('pf', 'pj'),
    allowNull: false,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  name: DataTypes.STRING,
  cpf: {
    type: DataTypes.STRING,
    unique: true,
  },
  company_name: DataTypes.STRING,
  cnpj: {
    type: DataTypes.STRING,
    unique: true,
  },
  phone: DataTypes.STRING,
  case_code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'clients',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
});

module.exports = Client;
