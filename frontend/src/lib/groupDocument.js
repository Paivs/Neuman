// lib/groupDocuments.js
import { api } from "./api";

// Buscar todos os grupos de documentos
export async function fetchGroupDocuments() {
  try {
    const groupDocuments = await api.get("group-documents");
    return groupDocuments; // espera que retorne um array
  } catch (error) {
    throw new Error(error.message || "Erro ao buscar grupos de documentos");
  }
}

// Buscar documento específico por ID
export async function fetchGroupDocumentById(id) {
  try {
    const groupDocument = await api.get(`group-documents/${id}`);
    return groupDocument;
  } catch (error) {
    throw new Error(error.message || "Erro ao buscar grupo de documento");
  }
}

// Criar novo grupo de documento
export async function createGroupDocument(
  title,
  description,
  case_id,
  client_ids
) {
  try {
    const newDocument = await api.post("group-document", {
      title,
      description,
      case_id,
      client_ids,
    });
    return newDocument;
  } catch (error) {
    throw new Error(error.message || "Erro ao criar documento");
  }
}

// Atualizar documento existente
export async function updateGroupDocument(id, data) {
  try {
    const updatedDocument = await api.put(`group-documents/${id}`, data);
    return updatedDocument;
  } catch (error) {
    throw new Error(error.message || "Erro ao atualizar documento");
  }
}

// Deletar documento
export async function deleteGroupDocument(id) {
  try {
    await api.del(`group-documents/${id}`);
    return true;
  } catch (error) {
    throw new Error(error.message || "Erro ao deletar documento");
  }
}