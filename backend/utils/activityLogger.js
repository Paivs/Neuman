const ActivityLog = require('../models/ActivityLog');

async function logActivity({ userId, action, documentId = null, versionId = null, commentId = null, description }) {
  try {
    await ActivityLog.create({
      user_id: userId,
      action,
      document_id: documentId,
      version_id: versionId,
      comment_id: commentId,
      description,
    });
  } catch (error) {
    console.error('Erro ao registrar atividade:', error);
    // Opcional: envie erro para serviço de log externo ou monitore aqui
  }
}

module.exports = logActivity;
