const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DocumentPermission = sequelize.define('DocumentPermission', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  document_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  permission: {
    type: DataTypes.ENUM('view', 'edit', 'comment'),
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'document_permissions',
  timestamps: false,
  underscored: true,
  indexes: [
    {
      unique: true,
      fields: ['document_id', 'user_id']
    }
  ]
});

module.exports = DocumentPermission;
