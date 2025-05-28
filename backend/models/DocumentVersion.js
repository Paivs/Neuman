const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DocumentVersion = sequelize.define('DocumentVersion', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  document_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  version_number: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  file_url: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  size: {
    type: DataTypes.BIGINT, // tamanho do arquivo em bytes
    allowNull: true
  },
  type: {
    type: DataTypes.TEXT, // tipo MIME, ex: application/pdf
    allowNull: true
  },
  last_modified: {
    type: DataTypes.DATE, // data de última modificação
    allowNull: true
  },
  uploaded_by: {
    type: DataTypes.UUID,
    allowNull: true
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'document_versions',
  timestamps: false,
  underscored: true
});

module.exports = DocumentVersion;