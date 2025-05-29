const { ActivityLog, Document, DocumentVersion, DocumentPermission, User, sequelize } = require('../models');
const { Op, fn, col, literal } = require('sequelize');

exports.getSummary = async (req, res) => {
  try {
    const userId = req.user.id;

    // Contagem de ações por tipo
    const actionsCount = await ActivityLog.findAll({
      attributes: [
        'action',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count'],
      ],
      where: { user_id: userId },
      group: ['action'],
    });

    // Últimas 20 atividades
    const recentActivities = await ActivityLog.findAll({
      where: { user_id: userId },
      order: [['created_at', 'DESC']],
      limit: 20,
      include: [
        { model: User, as: 'user', attributes: ['id', 'name'] },
        { model: Document, as: 'document', attributes: ['id', 'title'] },
      ],
    });

    res.json({ actionsCount, recentActivities });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar summary' });
  }
};

exports.getUserDocsStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const totalDocuments = await Document.count({
      where: { owner_id: userId },
    });

    const totalArchivedDocuments = await Document.count({
      where: { owner_id: userId, is_archived: true },
    });

    const totalVersions = await DocumentVersion.count({
      include: [
        {
          model: Document,
          as: 'document',
          where: { owner_id: userId },
        },
      ],
    });

    // const topDocumentsByVersions = await Document.findAll({
    //   where: { owner_id: userId },
    //   attributes: [
    //     'id',
    //     'title',
    //     [fn('COUNT', col('versions.id')), 'version_count'],
    //   ],
    //   include: [
    //     {
    //       model: DocumentVersion,
    //       as: 'versions',
    //       attributes: [],
    //     },
    //   ],
    //   group: ['Document.id'],
    //   order: [[literal('version_count'), 'DESC']],
    //   limit: 5,
    // });

    const sharedDocsCount = await DocumentPermission.count({
      where: { user_id: userId },
      include: [
        {
          model: Document,
          as: 'document',
          where: { owner_id: { [Op.ne]: userId } },
        },
      ],
    });

    const recentArchivedDocs = await Document.findAll({
      where: {
        owner_id: userId,
        is_archived: true,
      },
      order: [['updated_at', 'DESC']],
      limit: 5,
    });

    res.json({
      totalDocuments,
      totalArchivedDocuments,
      totalVersions,
      // topDocumentsByVersions,
      sharedDocsCount,
      recentArchivedDocs,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar estatísticas do usuário' });
  }
};

exports.getAlerts = async (req, res) => {
  // Implementar depois
  res.json({ message: 'Endpoint de alertas em desenvolvimento' });
};
