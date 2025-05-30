const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CommentGroupDocument = sequelize.define('CommentGroupDocument', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  group_document_id: {
    type: DataTypes.UUID,
    allowNull: false,
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
  tableName: 'comment_group_documents',
  timestamps: true,
  underscored: true,
});

module.exports = CommentGroupDocument;
