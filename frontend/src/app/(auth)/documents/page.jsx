"use client";

import React, { useEffect, useState } from "react";
import DocumentItem from "./Document";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { PlusCircle, Search, Filter, FileText } from "lucide-react";
import { AddDocument } from "../../../components/AddDocument";
import { fetchDocuments } from "@/lib/documents";

const DocumentsPage = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchAllDocs() {
    const data = await fetchDocuments();
    setDocuments(data);
    setLoading(false)
  }

  useEffect(() => {
    fetchAllDocs();
  }, []);

  return (
    <div className="bg-[#141D30] min-h-[calc(100vh-120px)]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="py-8 mx-auto container"
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-blue-500">
            Meus Documentos
          </h1>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <AddDocument onAddDocument={() => {fetchAllDocs()}}/>
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
              placeholder="Buscar documentos..."
              className="w-full bg-slate-700/50 border border-slate-600 rounded-md py-2 pl-10 pr-4 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-colors"
            />
          </div>
          <Button
            variant="outline"
            className="border-slate-600 hover:bg-slate-700"
          >
            <Filter size={18} className="mr-2" />
            Filtros
          </Button>
        </div>

        {loading && (
          <p className="text-center text-slate-400">Carregando documentos...</p>
        )}

        {error && <p className="text-center text-red-500">Erro: {error}</p>}

        {!loading && !error && documents && documents.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center py-16 text-slate-400"
          >
            <FileText size={64} className="mx-auto mb-4 opacity-50" />
            <h2 className="text-2xl font-semibold mb-2">
              Nenhum documento encontrado.
            </h2>
            <p>Comece adicionando seus arquivos para gerenciá-los aqui.</p>
          </motion.div>
        )}

        {!loading && !error && documents && (
          <div className="grid gap-6 md:grid-cols-1">
            {documents.map((doc, index) => (
              <DocumentItem
                key={index}
                id={doc.id}
                name={doc.title}
                lastModified={doc.versions[doc.versions.length - 1].last_modified}
                size={doc.versions[doc.versions.length - 1].size}
                type={doc.versions[doc.versions.length - 1].type}
                fileUrl={doc.versions[doc.versions.length - 1].file_url}
                delay={index * 0.1}
              />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default DocumentsPage;
