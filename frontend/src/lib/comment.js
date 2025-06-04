// lib/comment.js
import { api } from "./api";

// Buscar comentário por ID de documento
export async function fetchCommentsByDocumentVersionId(id) {
  try {
    const comments = await api.get(`comments/document/${id}`);
    return comments;
  } catch (error) {
    throw new Error(error.message || "Erro ao buscar comentarios");
  }
}

// Buscar comentário por ID de grupo de documento
export async function fetchCommentsByGroupDocumentVersionId(id) {
  try {
    const comments = await api.get(`comments/group-document/${id}`);
    return comments;
  } catch (error) {
    throw new Error(error.message || "Erro ao buscar comentarios do grupo de documentos");
  }
}

// Criar novo comentário
export async function createComment(data) {
  try {
    const newComment = await api.post("comments", data);
    return newComment;
  } catch (error) {
    throw new Error(error.message || "Erro ao criar documento");
  }
}

// Criar novo comentário para documento
export async function createDocumentComment({
  content,
  document_id,
  version_id,
}) {
  try {
    const newDocumentComment = await api.post("comments", {
      content,
      document_id,
      version_id,
    });
    return newDocumentComment;
  } catch (error) {
    throw new Error(error.message || "Erro ao criar comentário de documento");
  }
}

export async function createGroupDocumentComment({
  content,
  group_document_id
}) {
  try {
    const newGroupDocumentComment = await api.post("comments", {
      content,
      group_document_id
    });
    return newGroupDocumentComment;
  } catch (error) {
    throw new Error(error.message || "Erro ao criar comentário de grupo de documento");
  }
}

// Deletar comentário
export async function deleteDocument(id) {
  try {
    await api.delete(`comments/${id}`);
    return true;
  } catch (error) {
    throw new Error(error.message || "Erro ao deletar comentario");
  }
}
