import React from 'react';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { UserPlus, Search, Briefcase, Users } from 'lucide-react';

    const ClientCard = ({ name, email, caseCount, delay }) => (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay }}
        className="bg-slate-800/70 p-6 rounded-lg shadow-xl border border-slate-700 hover:border-teal-500 transition-colors duration-300"
      >
        <h3 className="text-xl font-semibold text-teal-400 mb-2">{name}</h3>
        <p className="text-sm text-slate-300 mb-1">{email}</p>
        <div className="flex items-center text-xs text-slate-400 mt-3">
          <Briefcase size={14} className="mr-1 text-teal-500" />
          <span>{caseCount} caso(s) ativo(s)</span>
        </div>
        <Button variant="link" className="text-teal-400 hover:text-teal-300 p-0 h-auto mt-4">Ver Detalhes</Button>
      </motion.div>
    );

    const ClientsPage = () => {
      const clients = [
        { name: "João Silva", email: "joao.silva@example.com", caseCount: 2 },
        { name: "Maria Oliveira", email: "maria.oliveira@example.com", caseCount: 1 },
        { name: "Carlos Pereira", email: "carlos.pereira@example.com", caseCount: 3 },
        { name: "Ana Costa", email: "ana.costa@example.com", caseCount: 0 },
      ];

      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="py-8"
        >
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-emerald-500">
              Meus Clientes
            </h1>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white">
                <UserPlus size={20} className="mr-2" />
                Novo Cliente
              </Button>
            </motion.div>
          </div>

          <div className="mb-8 p-4 bg-slate-800/50 rounded-lg shadow-md border border-slate-700 flex items-center space-x-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="text" 
                placeholder="Buscar clientes..."
                className="w-full bg-slate-700/50 border border-slate-600 rounded-md py-2 pl-10 pr-4 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clients.map((client, index) => (
              <ClientCard
                key={client.email}
                name={client.name}
                email={client.email}
                caseCount={client.caseCount}
                delay={index * 0.1}
              />
            ))}
          </div>

          {clients.length === 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center py-16 text-slate-400"
            >
              <Users size={64} className="mx-auto mb-4 opacity-50" />
              <h2 className="text-2xl font-semibold mb-2">Nenhum cliente cadastrado.</h2>
              <p>Adicione seus clientes para começar a gerenciar seus casos.</p>
            </motion.div>
          )}
        </motion.div>
      );
    };

    export default ClientsPage;