// models/CaseClient.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CaseClient = sequelize.define('CaseClient', {
  case_id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
  },
  client_id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
  }
}, {
  tableName: 'case_clients',
  timestamps: false,
  underscored: true
});

module.exports = CaseClient;
