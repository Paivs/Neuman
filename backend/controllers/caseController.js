const { Case, Client, CaseClient } = require("../models");
const logActivity = require("../utils/activityLogger");

// Criar um caso
exports.create = async (req, res) => {
  try {
    const { name, description, client_ids } = req.body;
    const createdCase = await Case.create({ name, description });

    // Associar clientes (se houver)
    if (Array.isArray(client_ids) && client_ids.length > 0) {
      const clientsToAdd = client_ids.map((client_id) => ({
        case_id: createdCase.id,
        client_id,
      }));
      await CaseClient.bulkCreate(clientsToAdd);
    }

    // Log criação
    await logActivity({
      userId: req.user.id,
      action: "create_case",
      description: `Caso "${name}" criado pelo usuário ${req.user.id}`,
      caseId: createdCase.id,
    });

    res.status(201).json(createdCase);
  } catch (error) {
    console.error("Erro ao criar caso:", error);
    res.status(500).json({ message: "Erro ao criar caso" });
  }
};

// Buscar caso por ID (com clientes)
exports.findOne = async (req, res) => {
  try {
    const foundCase = await Case.findByPk(req.params.id, {
      include: [
        {
          model: Client,
          as: "clients",
          through: { attributes: [] },
        },
      ],
    });

    if (!foundCase) {
      return res.status(404).json({ message: "Caso não encontrado" });
    }

    res.json(foundCase);
  } catch (error) {
    console.error("Erro ao buscar caso:", error);
    res.status(500).json({ message: "Erro ao buscar caso" });
  }
};

// Atualizar caso
exports.update = async (req, res) => {
  try {
    const { name, description, client_ids } = req.body;
    const { id } = req.params;

    const foundCase = await Case.findByPk(id);
    if (!foundCase) {
      return res.status(404).json({ message: "Caso não encontrado" });
    }

    foundCase.name = name || foundCase.name;
    foundCase.description = description || foundCase.description;
    await foundCase.save();

    if (Array.isArray(client_ids)) {
      // Remove associações antigas
      await CaseClient.destroy({ where: { case_id: id } });
      // Adiciona as novas
      const clientsToAdd = client_ids.map((client_id) => ({
        case_id: id,
        client_id,
      }));
      await CaseClient.bulkCreate(clientsToAdd);
    }

    res.json(foundCase);
  } catch (error) {
    console.error("Erro ao atualizar caso:", error);
    res.status(500).json({ message: "Erro ao atualizar caso" });
  }
};

// Deletar caso (hard delete)
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    const foundCase = await Case.findByPk(id);
    if (!foundCase) {
      return res.status(404).json({ message: "Caso não encontrado" });
    }

    await Case.destroy({ where: { id } });

    res.json({ message: "Caso deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar caso:", error);
    res.status(500).json({ message: "Erro ao deletar caso" });
  }
};

// Listar todos os casos
exports.findAll = async (req, res) => {
  try {
    const cases = await Case.findAll({
      include: [
        {
          model: Client,
          as: "clients",
          through: { attributes: [] },
        },
      ],
      order: [["created_at", "DESC"]],
    });

    res.json(cases);
  } catch (error) {
    console.error("Erro ao listar casos:", error);
    res.status(500).json({ message: "Erro ao listar casos" });
  }
};
