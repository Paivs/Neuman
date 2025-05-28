// lib/comment.js
import { api } from "./api";

// Buscar documento específico por ID
export async function fetchCommentsByDocumentVersionId(id) {
  try {
    const comments = await api.get(`comments/version/${id}`);
    return comments;
  } catch (error) {
    throw new Error(error.message || "Erro ao buscar comentarios");
  }
}

// Criar novo documento
export async function createComment(data) {
  try {
    const newComment = await api.post("comments", data);
    return newComment;
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
    await api.delete(`documents/${id}`);
    return true;
  } catch (error) {
    throw new Error(error.message || "Erro ao deletar documento");
  }
}
