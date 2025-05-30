const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ActivityLog = sequelize.define(
  "ActivityLog",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    userId: {                  // camelCase aqui
      type: DataTypes.UUID,
      allowNull: false,
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    documentId: {              // camelCase aqui
      type: DataTypes.UUID,
      allowNull: true,
    },
    groupDocumentId: {         // camelCase aqui
      type: DataTypes.UUID,
      allowNull: true,
    },
    versionId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    commentDocumentId: {       // camelCase aqui
      type: DataTypes.UUID,
      allowNull: true,
    },
    commentGroupDocumentId: {  // camelCase aqui
      type: DataTypes.UUID,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdAt: {               // camelCase aqui
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "activity_logs",
    timestamps: false,
    underscored: true,
  }
);

module.exports = ActivityLog;
