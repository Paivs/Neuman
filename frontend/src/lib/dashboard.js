// lib/user.js
import { api } from "./api";


export async function fetchDashboard() {
  try {
    const data = await api.get("dashboard/summary");
    return data; // espera que retorne um array
  } catch (error) {
    throw new Error(error.message || "Erro ao buscar os clientes");
  }
}

export async function fetchDocsUsersStats() {
  try {
    const data = await api.get("dashboard/user-docs-stats");
    return data; // espera que retorne um array
  } catch (error) {
    throw new Error(error.message || "Erro ao buscar os clientes");
  }
}