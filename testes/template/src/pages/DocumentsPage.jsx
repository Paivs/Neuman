import React from 'react';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { PlusCircle, Search, Filter, FileText } from 'lucide-react';

    const DocumentItem = ({ name, lastModified, size, delay }) => (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay }}
        className="bg-slate-800/70 p-4 rounded-lg shadow-lg border border-slate-700 hover:border-sky-500 transition-colors duration-300 flex justify-between items-center"
      >
        <div>
          <h3 className="text-lg font-semibold text-sky-400">{name}</h3>
          <p className="text-xs text-slate-400">Modificado em: {lastModified} | Tamanho: {size}</p>
        </div>
        <Button variant="ghost" size="sm">Ver Detalhes</Button>
      </motion.div>
    );

    const DocumentsPage = () => {
      const documents = [
        { name: "Contrato Cliente A.docx", lastModified: "20/05/2025", size: "2.5 MB" },
        { name: "Petição Inicial Caso B.pdf", lastModified: "18/05/2025", size: "1.2 MB" },
        { name: "Procuração Cliente C.pdf", lastModified: "15/05/2025", size: "500 KB" },
        { name: "Recurso Apelação D.docx", lastModified: "12/05/2025", size: "3.1 MB" },
      ];

      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="py-8"
        >
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-blue-500">
              Meus Documentos
            </h1>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white">
                <PlusCircle size={20} className="mr-2" />
                Novo Documento
              </Button>
            </motion.div>
          </div>

          <div className="mb-8 p-4 bg-slate-800/50 rounded-lg shadow-md border border-slate-700 flex items-center space-x-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="text" 
                placeholder="Buscar documentos..."
                className="w-full bg-slate-700/50 border border-slate-600 rounded-md py-2 pl-10 pr-4 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-colors"
              />
            </div>
            <Button variant="outline" className="border-slate-600 hover:bg-slate-700">
              <Filter size={18} className="mr-2" />
              Filtros
            </Button>
          </div>
          
          <div className="grid gap-6 md:grid-cols-1">
            {documents.map((doc, index) => (
              <DocumentItem 
                key={doc.name}
                name={doc.name}
                lastModified={doc.lastModified}
                size={doc.size}
                delay={index * 0.1}
              />
            ))}
          </div>

          {documents.length === 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center py-16 text-slate-400"
            >
              <FileText size={64} className="mx-auto mb-4 opacity-50" />
              <h2 className="text-2xl font-semibold mb-2">Nenhum documento encontrado.</h2>
              <p>Comece adicionando seus arquivos para gerenciá-los aqui.</p>
            </motion.div>
          )}
        </motion.div>
      );
    };

    export default DocumentsPage;