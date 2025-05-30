const ActivityLog = require("../models/ActivityLog");

async function logActivity({
  userId,
  action,
  documentId = null,
  groupDocumentId = null,
  versionId = null,
  commentDocumentId = null,
  commentGroupDocumentId = null,
  description,
}) {
  try {
    await ActivityLog.create({
      userId,
      action,
      documentId,
      groupDocumentId,
      versionId,
      commentDocumentId,
      commentGroupDocumentId,
      description,
    });
  } catch (error) {
    console.error("Erro ao registrar atividade:", error);
  }
}

module.exports = logActivity;
