// models/GroupDocumentPermission.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const GroupDocumentPermission = sequelize.define('GroupDocumentPermission', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  group_document_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  permission: {
    type: DataTypes.ENUM('view', 'edit', 'comment'),
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  tableName: 'group_document_permissions',
  timestamps: true,
  underscored: true,
});

module.exports = GroupDocumentPermission;
