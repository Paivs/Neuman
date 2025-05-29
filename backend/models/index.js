const Sequelize = require("sequelize");
const sequelize = require("../config/database"); // sua instância de conexão

// Importação dos modelos
const User = require("./User");
const Document = require("./Document");
const DocumentVersion = require("./DocumentVersion");
const DocumentPermission = require("./DocumentPermission");
const Comment = require("./Comment");
const Client = require("./Client");
const ActivityLog = require("./ActivityLog");

// Conectando a instância aos modelos
const models = {
  User,
  Client,
  Document,
  DocumentVersion,
  DocumentPermission,
  Comment,
  ActivityLog,
};

// Aplicando relações
User.hasMany(Document, { foreignKey: "owner_id", as: "documents" });
Document.belongsTo(User, { foreignKey: "owner_id", as: "owner" });

Document.hasMany(DocumentVersion, {
  foreignKey: "document_id",
  as: "versions",
});
DocumentVersion.belongsTo(Document, {
  foreignKey: "document_id",
  as: "document",
});

User.hasMany(DocumentVersion, {
  foreignKey: "uploaded_by",
  as: "uploaded_versions",
});
DocumentVersion.belongsTo(User, { foreignKey: "uploaded_by", as: "uploader" });

Document.hasMany(DocumentPermission, {
  foreignKey: "document_id",
  as: "permissions",
});
DocumentPermission.belongsTo(Document, {
  foreignKey: "document_id",
  as: "document",
});

User.hasMany(DocumentPermission, {
  foreignKey: "user_id",
  as: "document_permissions",
});
DocumentPermission.belongsTo(User, { foreignKey: "user_id", as: "user" });

Comment.belongsTo(models.Document, {
  foreignKey: "document_id",
  as: "document",
});
Comment.belongsTo(models.DocumentVersion, {
  foreignKey: "version_id",
  as: "version",
});
Comment.belongsTo(models.User, { foreignKey: "author_id", as: "author" });

ActivityLog.belongsTo(models.User, { foreignKey: "user_id" });
ActivityLog.belongsTo(models.Document, { foreignKey: "document_id" });
ActivityLog.belongsTo(models.DocumentVersion, { foreignKey: "version_id" });
ActivityLog.belongsTo(models.Comment, { foreignKey: "comment_id" });

// Relação 1:1
User.hasOne(Client, { foreignKey: "user_id", as: "client" });
Client.belongsTo(User, { foreignKey: "user_id", as: "user" });

// Exportando
module.exports = {
  sequelize,
  Sequelize,
  ...models,
};
