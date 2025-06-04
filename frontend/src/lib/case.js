// lib/casos.js
import { api } from "./api";

export async function fetchCases() {
  try {
    const casos = await api.get("cases");
    return casos;
  } catch (error) {
    throw new Error(error.message || "Erro ao listar casos");
  }
}

// Buscar caso específico por ID
export async function fetchCaseById(id) {
  try {
    const caso = await api.get(`cases/${id}`);
    return caso;
  } catch (error) {
    throw new Error(error.message || "Erro ao buscar caso");
  }
}

// Criar novo casoo
export async function createCase(name, description, client_ids) {
  try {
    const newCase = await api.post("casos", {
      name,
      description,
      client_ids,
    });
    return newCase;
  } catch (error) {
    throw new Error(error.message || "Erro ao criar caso");
  }
}

// Atualizar casoo existente
export async function updateCase(id, data) {
  try {
    const updatedCase = await api.put(`cases/${id}`, data);
    return updatedCase;
  } catch (error) {
    throw new Error(error.message || "Erro ao atualizar casoo");
  }
}

// Arquivar um casoo
export async function deleteCase(id) {
  try {
    await api.del(`cases/${id}`);
    return true;
  } catch (error) {
    throw new Error(error.message || "Erro ao deletar casoo");
  }
}
