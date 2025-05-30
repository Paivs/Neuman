const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CommentDocument = sequelize.define('CommentDocument', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  document_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  version_id: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  author_id: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'comment_documents',
  timestamps: false,
  underscored: true,
});

module.exports = CommentDocument;