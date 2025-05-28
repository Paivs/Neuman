// lib/user.js
import { api } from "./api";


export async function fetchClients() {
  try {
    const clients = await api.get("clients");
    return clients; // espera que retorne um array
  } catch (error) {
    throw new Error(error.message || "Erro ao buscar os clientes");
  }
}

export async function fetchClientsById(id) {
  try {
    const clients = await api.get(`clients/${id}`);
    return clients;
  } catch (error) {
    throw new Error(error.message || "Erro ao buscar usuário");
  }
}


export async function createClient(data) {
  try {
    const newClient = await api.post("clients", data);
    console.log("newClient: ", newClient)
    return newClient;
  } catch (error) {
    throw new Error(error.message || "Erro ao criar usuário");
  }
}

