"use client";

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Search, Users } from "lucide-react";
import ClientCard from "./Client";
import { AddClient } from "./AddClient";
import { fetchClients } from "@/lib/client";


const ClientsPage = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchClientsAPI() {
    try {
      const data = await fetchClients();

      console.log("data: " + JSON.stringify(data))

      setClients(data);
      setLoading(false);
    } catch (err) {
      setError(err.message || 'Erro desconhecido');
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchClientsAPI();
  }, []);

  return (
    <section className="bg-[#141E30] min-h-[calc(100vh-120px)]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="py-8 container mx-auto p-2"
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-emerald-500">
            Meus Clientes
          </h1>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <AddClient onAddClient={fetchClientsAPI} />
          </motion.div>
        </div>

        <div className="mb-8 p-4 bg-slate-800/50 rounded-lg shadow-md border border-slate-700 flex items-center space-x-4">
          <div className="relative flex-grow">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Buscar clientes..."
              className="w-full bg-slate-700/50 border border-slate-600 rounded-md py-2 pl-10 pr-4 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors"
              // Aqui você pode adicionar onChange para filtro local
            />
          </div>
        </div>

        {loading && (
          <p className="text-center text-slate-400">Carregando clientes...</p>
        )}

        {error && <p className="text-center text-red-500">Erro: {error}</p>}

        {!loading && !error && clients && clients.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center py-16 text-slate-400"
          >
            <Users size={64} className="mx-auto mb-4 opacity-50" />
            <h2 className="text-2xl font-semibold mb-2">
              Nenhum cliente cadastrado.
            </h2>
            <p>Adicione seus clientes para começar a gerenciar seus casos.</p>
          </motion.div>
        )}

        {!loading && !error && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clients.map((client, index) => (
              <ClientCard
                key={client.id}
                name={client.user.name}
                email={client.user.email}
                delay={index * 0.1}
              />
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default ClientsPage;
