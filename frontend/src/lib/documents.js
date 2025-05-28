// lib/documents.js
import { api } from "./api";

// Buscar todos os documentos (exemplo de listagem)
export async function fetchDocuments() {
  try {
    const documents = await api.get("documents");
    return documents; // espera que retorne um array
  } catch (error) {
    throw new Error(error.message || "Erro ao buscar documentos");
  }
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
export async function createDocument(data) {
  try {
    const newDocument = await api.post("documents", data);
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

// Deletar documento
export async function deleteDocument(id) {
  try {
    await api.del(`documents/${id}`);
    return true;
  } catch (error) {
    throw new Error(error.message || "Erro ao deletar documento");
  }
}

export async function createDocumentVersion(id, data){
  try {
    const newVersion = await api.post(`documents/version/${id}`, data);
    return newVersion;
  } catch (error) {
    throw new Error(error.message || "Erro ao enviar nova versão do documento");
  }
}