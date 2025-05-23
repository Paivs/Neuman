import React from 'react';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
    import { Briefcase, UserCheck, LogIn } from 'lucide-react';

    const LoginForm = ({ userType }) => (
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div>
          <Label htmlFor={`${userType}-email`} className="text-slate-300">Email</Label>
          <Input type="email" id={`${userType}-email`} placeholder="seuemail@example.com" className="mt-1 bg-slate-700/50 border-slate-600 focus:ring-sky-500 focus:border-sky-500" />
        </div>
        <div>
          <Label htmlFor={`${userType}-password`} className="text-slate-300">Senha</Label>
          <Input type="password" id={`${userType}-password`} placeholder="********" className="mt-1 bg-slate-700/50 border-slate-600 focus:ring-sky-500 focus:border-sky-500" />
        </div>
        {userType === 'client' && (
          <div>
            <Label htmlFor="case-code" className="text-slate-300">Código do Caso (Opcional)</Label>
            <Input type="text" id="case-code" placeholder="Ex: CX12345" className="mt-1 bg-slate-700/50 border-slate-600 focus:ring-sky-500 focus:border-sky-500" />
          </div>
        )}
        <Button type="submit" className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-semibold">
          <LogIn size={18} className="mr-2" />
          Entrar como {userType === 'lawyer' ? 'Advogado' : 'Cliente'}
        </Button>
        <p className="text-xs text-center text-slate-400">
          Esqueceu sua senha? <a href="#" className="text-sky-400 hover:underline">Recuperar senha</a>
        </p>
      </motion.form>
    );

    const LoginPage = () => {
      return (
        <div className="min-h-[calc(100vh-180px)] flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 to-slate-800">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            <div className="relative bg-slate-800/70 p-8 rounded-xl shadow-2xl border border-slate-700 backdrop-blur-lg">
              <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                <div className="w-20 h-20 bg-gradient-to-br from-sky-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                  <Briefcase size={40} className="text-white" />
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-center mb-2 mt-10 bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-blue-500">
                Acessar Neuman
              </h1>
              <p className="text-center text-slate-400 mb-8">
                Gerencie seus documentos e casos de forma eficiente.
              </p>

              <Tabs defaultValue="lawyer" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-slate-700/50 border border-slate-600">
                  <TabsTrigger value="lawyer" className="data-[state=active]:bg-sky-500 data-[state=active]:text-white">
                    <Briefcase size={16} className="mr-2" /> Advogado
                  </TabsTrigger>
                  <TabsTrigger value="client" className="data-[state=active]:bg-sky-500 data-[state=active]:text-white">
                    <UserCheck size={16} className="mr-2" /> Cliente
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="lawyer" className="mt-6">
                  <LoginForm userType="lawyer" />
                </TabsContent>
                <TabsContent value="client" className="mt-6">
                  <LoginForm userType="client" />
                </TabsContent>
              </Tabs>

              <p className="text-sm text-center text-slate-400 mt-8">
                Não tem uma conta? <a href="#" className="text-sky-400 hover:underline">Crie uma agora</a>
              </p>
            </div>
            <div className="mt-6 flex justify-center space-x-4">
              <img  alt="Símbolo da justiça minimalista" class="h-16 opacity-30 hover:opacity-60 transition-opacity duration-300" src="https://images.unsplash.com/photo-1589994965851-a8f479c573a9" />
              <img  alt="Documento digital seguro" class="h-16 opacity-30 hover:opacity-60 transition-opacity duration-300" src="https://images.unsplash.com/photo-1560961922-40d183c5babf" />
              <img  alt="Caneta de advogado moderna" class="h-16 opacity-30 hover:opacity-60 transition-opacity duration-300" src="https://images.unsplash.com/photo-1691601853718-8572bde78175" />
            </div>
          </motion.div>
        </div>
      );
    };

    export default LoginPage;