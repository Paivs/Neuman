import React from 'react';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { FileText, Users, UploadCloud, MessageSquare, ShieldCheck, Scale } from 'lucide-react';
    import { Link } from 'react-router-dom';

    const FeatureCard = ({ icon, title, description, delay }) => (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        className="bg-slate-800/70 p-6 rounded-lg shadow-xl border border-slate-700 hover:border-sky-500 transition-colors duration-300 flex flex-col items-center text-center"
      >
        <div className="p-3 bg-sky-500/20 rounded-full mb-4 border border-sky-500/50">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-sky-400 mb-2">{title}</h3>
        <p className="text-slate-300 text-sm flex-grow">{description}</p>
      </motion.div>
    );

    const HomePage = () => {
      return (
        <div className="py-12">
          <motion.section
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-20 relative"
          >
            <div className="absolute inset-0 -z-10 overflow-hidden">
              <img  
                alt="Fundo abstrato de escritório de advocacia moderno" 
                class="w-full h-full object-cover opacity-10 blur-sm"
               src="https://images.unsplash.com/photo-1622128082634-1f9742839291" />
            </div>
            <Scale size={64} className="mx-auto mb-6 text-sky-400 opacity-70" />
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
              Bem-vindo ao <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-blue-500">Neuman</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-3xl mx-auto">
              A solução definitiva para gerenciamento de documentos, projetada para advogados autônomos. Simplifique seu fluxo de trabalho, colabore com eficiência e mantenha seus dados seguros.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="lg" className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-semibold px-10 py-4 rounded-lg shadow-lg text-lg" asChild>
                <Link to="/login">Comece Agora</Link>
              </Button>
            </motion.div>
          </motion.section>

          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            transition={{ staggerChildren: 0.15 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
          >
            <FeatureCard
              icon={<ShieldCheck className="w-10 h-10 text-sky-400" />}
              title="Armazenamento Seguro"
              description="Guarde seus documentos com criptografia de ponta e backups automáticos, garantindo total confidencialidade."
              delay={0.1}
            />
            <FeatureCard
              icon={<FileText className="w-10 h-10 text-sky-400" />}
              title="Controle de Versão Inteligente"
              description="Acompanhe todas as alterações e reverta para versões anteriores facilmente, com histórico detalhado."
              delay={0.25}
            />
            <FeatureCard
              icon={<Users className="w-10 h-10 text-sky-400" />}
              title="Colaboração Eficaz"
              description="Compartilhe documentos de forma segura com clientes e colegas, com permissões granulares."
              delay={0.4}
            />
            <FeatureCard
              icon={<MessageSquare className="w-10 h-10 text-sky-400" />}
              title="Comentários Contextuais"
              description="Adicione notas, discuta e trabalhe em conjunto diretamente nos documentos, em tempo real."
              delay={0.55}
            />
             <FeatureCard
              icon={<UploadCloud className="w-10 h-10 text-sky-400" />}
              title="Acesso Universal"
              description="Acesse seus arquivos de qualquer lugar, a qualquer hora, em qualquer dispositivo, com total segurança."
              delay={0.7}
            />
             <FeatureCard
              icon={<Scale className="w-10 h-10 text-sky-400" />}
              title="Foco na Advocacia"
              description="Ferramentas pensadas para as necessidades específicas de advogados, otimizando sua prática jurídica."
              delay={0.85}
            />
          </motion.section>
          
          <section className="text-center py-16 bg-slate-800/50 rounded-xl shadow-2xl border border-slate-700 relative overflow-hidden">
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-sky-500/10 rounded-full blur-2xl -z-10"></div>
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-blue-500/10 rounded-full blur-2xl -z-10"></div>
            
            <img  alt="Advogado trabalhando em um laptop" class="w-1/3 max-w-xs mx-auto mb-8 rounded-lg shadow-lg opacity-80" src="https://images.unsplash.com/photo-1528747008803-f9f5cc8f1a64" />
            
            <h2 className="text-4xl font-bold mb-6 text-sky-300">Pronto para otimizar sua prática jurídica?</h2>
            <p className="text-slate-300 mb-10 max-w-2xl mx-auto">
              Neuman oferece as ferramentas que você precisa para focar no que realmente importa: seus clientes e seus casos. Experimente a diferença.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="outline" size="lg" className="border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-white transition-colors duration-300 px-10 py-4 text-lg">
                Saiba Mais Sobre os Recursos
              </Button>
            </motion.div>
          </section>
        </div>
      );
    };

    export default HomePage;