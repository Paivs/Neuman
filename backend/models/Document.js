const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Document = sequelize.define('Document', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  tenant_id: {
    type: DataTypes.UUID,
    allowNull: true
  },
  owner_id: {
    type: DataTypes.UUID,
    allowNull: true
  },
  group_document_id: {
    type: DataTypes.UUID,
    allowNull: true
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  current_version_id: {
    type: DataTypes.UUID,
    allowNull: true
  },
  is_archived: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'documents',
  timestamps: true,       // habilita created_at e updated_at automáticos
  underscored: true      // usa snake_case para colunas
});

module.exports = Document;
