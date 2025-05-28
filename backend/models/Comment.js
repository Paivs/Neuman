const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Comment = sequelize.define("Comment", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  document_id: {
    type: DataTypes.UUID,
    allowNull: false, // já que é ON DELETE CASCADE
  },
  version_id: {
    type: DataTypes.UUID,
    allowNull: true, // ON DELETE SET NULL
  },
  author_id: {
    type: DataTypes.UUID,
    allowNull: true, // ON DELETE SET NULL
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
  tableName: "comments",
  timestamps: false,
});

module.exports = Comment;