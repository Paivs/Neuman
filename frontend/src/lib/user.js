// lib/user.js
import { api } from "./api";


// Buscar usuário específico por ID
export async function fetchUserById(id) {
  try {
    const user = await api.get(`users/${id}`);
    return user;
  } catch (error) {
    throw new Error(error.message || "Erro ao buscar usuário");
  }
}