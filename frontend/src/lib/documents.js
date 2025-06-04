// lib/documents.js
import { api } from "./api";

export async function fetchDocuments() {
  //nao faz mais sentido
}

// Buscar documento específico por ID
export async function fetchDocumentById(id) {
  try {
    const document = await api.get(`documents/${id}`);
    return document;
  } catch (error) {
    throw new Error(error.message || "Erro ao buscar documento");
  }
}

// Criar novo documento
export async function createDocument(
  title,
  description,
  file_url,
  size,
  type,
  group_document_id
) {
  try {
    const newDocument = await api.post("documents", {
      title,
      description,
      file_url,
      size,
      type,
      group_document_id,
    });
    return newDocument;
  } catch (error) {
    throw new Error(error.message || "Erro ao criar documento");
  }
}

// Atualizar documento existente
export async function updateDocument(id, data) {
  try {
    const updatedDocument = await api.put(`documents/${id}`, data);
    return updatedDocument;
  } catch (error) {
    throw new Error(error.message || "Erro ao atualizar documento");
  }
}

// Arquivar um documento
export async function deleteDocument(id) {
  try {
    await api.del(`documents/${id}`);
    return true;
  } catch (error) {
    throw new Error(error.message || "Erro ao deletar documento");
  }
}

export async function createDocumentVersion(
  id,
  file_url, size, type, comment
) {
  try {
    const newVersion = await api.post(`documents/version/${id}`, {file_url, size, type, comment});
    return newVersion;
  } catch (error) {
    throw new Error(error.message || "Erro ao enviar nova versão do documento");
  }
}
