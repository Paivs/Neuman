// models/GroupDocumentClient.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const GroupDocumentClient = sequelize.define(
  "GroupDocumentClient",
  {
    group_document_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    client_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    tableName: "group_document_clients",
    timestamps: true,
    underscored: true,
  }
);

module.exports = GroupDocumentClient;
