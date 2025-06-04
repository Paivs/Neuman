const Sequelize = require("sequelize");
const sequelize = require("../config/database");

// Importação dos modelos
const User = require("./User");
const Client = require("./Client");
const Document = require("./Document");
const DocumentVersion = require("./DocumentVersion");
const DocumentPermission = require("./DocumentPermission");
const CommentDocument = require("./CommentDocument");
const CommentGroupDocument = require("./CommentGroupDocument");
const GroupDocument = require("./GroupDocument");
const GroupDocumentClient = require("./GroupDocumentClient");
const GroupDocumentPermission = require("./GroupDocumentPermission");
const Case = require("./Case");
const CaseClient = require("./CaseClient");
const ActivityLog = require("./ActivityLog");

// Conectando a instância aos modelos
const models = {
  User,
  Client,
  Document,
  DocumentVersion,
  DocumentPermission,
  CommentDocument,
  CommentGroupDocument,
  GroupDocument,
  GroupDocumentClient,
  GroupDocumentPermission,
  Case,
  CaseClient,
  ActivityLog,
};

// Relações Usuário ↔ Documentos
User.hasMany(Document, { foreignKey: "owner_id", as: "documents" });
Document.belongsTo(User, { foreignKey: "owner_id", as: "owner" });

// Documentos ↔ Versões
Document.hasMany(DocumentVersion, {
  foreignKey: "document_id",
  as: "versions",
});
DocumentVersion.belongsTo(Document, {
  foreignKey: "document_id",
  as: "document",
});

// Usuário (upload) ↔ Versões
User.hasMany(DocumentVersion, {
  foreignKey: "uploaded_by",
  as: "uploaded_versions",
});
DocumentVersion.belongsTo(User, { foreignKey: "uploaded_by", as: "uploader" });

// Documentos ↔ Permissões
Document.hasMany(DocumentPermission, {
  foreignKey: "document_id",
  as: "permissions",
});
DocumentPermission.belongsTo(Document, {
  foreignKey: "document_id",
  as: "document",
});

// Usuário ↔ Permissões
User.hasMany(DocumentPermission, {
  foreignKey: "user_id",
  as: "document_permissions",
});
DocumentPermission.belongsTo(User, { foreignKey: "user_id", as: "user" });

// Comentários em documentos
CommentDocument.belongsTo(Document, {
  foreignKey: "document_id",
  as: "document",
});
CommentDocument.belongsTo(DocumentVersion, {
  foreignKey: "version_id",
  as: "version",
});
CommentDocument.belongsTo(User, { foreignKey: "author_id", as: "author" });
Document.hasMany(CommentDocument, {
  foreignKey: "document_id",
  as: "comments",
});

// Comentários em grupos de documentos
CommentGroupDocument.belongsTo(GroupDocument, {
  foreignKey: "group_document_id",
  as: "group_document",
});
CommentGroupDocument.belongsTo(User, { foreignKey: "author_id", as: "author" });
GroupDocument.hasMany(CommentGroupDocument, {
  foreignKey: "group_document_id",
  as: "comments",
});

// Logs de atividade
ActivityLog.belongsTo(User, { foreignKey: "user_id", as: "user" });
ActivityLog.belongsTo(Document, { foreignKey: "document_id", as: "document" });
ActivityLog.belongsTo(DocumentVersion, { foreignKey: "version_id", as: "version" });

ActivityLog.belongsTo(CommentDocument, {
  foreignKey: "comment_document_id",  // coluna correta no banco
  as: "comment_document",
});

ActivityLog.belongsTo(CommentGroupDocument, {
  foreignKey: "comment_group_document_id",  // coluna correta no banco
  as: "comment_group_document",
});

// Usuário ↔ Cliente (1:1)
User.hasOne(Client, { foreignKey: "user_id", as: "client" });
Client.belongsTo(User, { foreignKey: "user_id", as: "user" });

// Grupo de documentos ↔ Usuário (dono)
User.hasMany(GroupDocument, { foreignKey: "owner_id", as: "group_documents" });
GroupDocument.belongsTo(User, { foreignKey: "owner_id", as: "owner" });

// Grupo de documentos ↔ Caso
Case.hasMany(GroupDocument, { foreignKey: "case_id", as: "group_documents" });
GroupDocument.belongsTo(Case, { foreignKey: "case_id", as: "case" });

// Grupo de documentos ↔ Clientes (N:N)
GroupDocument.belongsToMany(Client, {
  through: GroupDocumentClient,
  foreignKey: "group_document_id",
  otherKey: "client_id",
  as: "clients",
});
Client.belongsToMany(GroupDocument, {
  through: GroupDocumentClient,
  foreignKey: "client_id",
  otherKey: "group_document_id",
  as: "group_documents",
});

// Grupo de documentos ↔ Permissões
GroupDocument.hasMany(GroupDocumentPermission, {
  foreignKey: "group_document_id",
  as: "permissions",
});
GroupDocumentPermission.belongsTo(GroupDocument, {
  foreignKey: "group_document_id",
  as: "group_document",
});

// Document ↔ GroupDocument (um documento pertence a um grupo)
GroupDocument.hasMany(Document, {
  foreignKey: "group_document_id",
  as: "documents",
});
Document.belongsTo(GroupDocument, {
  foreignKey: "group_document_id",
  as: "group_document",
});

// Usuário ↔ Permissões em grupos de documentos
User.hasMany(GroupDocumentPermission, {
  foreignKey: "user_id",
  as: "group_document_permissions",
});
GroupDocumentPermission.belongsTo(User, { foreignKey: "user_id", as: "user" });

// Caso ↔ Clientes (N:N)
Case.belongsToMany(Client, {
  through: CaseClient,
  foreignKey: "case_id",
  otherKey: "client_id",
  as: "clients",
});
Client.belongsToMany(Case, {
  through: CaseClient,
  foreignKey: "client_id",
  otherKey: "case_id",
  as: "cases",
});

module.exports = {
  sequelize,
  Sequelize,
  ...models,
};
