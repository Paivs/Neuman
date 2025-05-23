import React from 'react';
    import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
    import { Toaster } from '@/components/ui/toaster';
    import HomePage from '@/pages/HomePage';
    import DocumentsPage from '@/pages/DocumentsPage';
    import ClientsPage from '@/pages/ClientsPage';
    import SettingsPage from '@/pages/SettingsPage';
    import LoginPage from '@/pages/LoginPage';
    import { Home, FileText, Users, Settings, LogIn } from 'lucide-react';

    const NavLink = ({ to, icon, children, className }) => (
      <Link
        to={to}
        className={`flex items-center px-3 py-2 text-slate-300 hover:text-sky-400 hover:bg-slate-700/50 rounded-md transition-colors duration-200 ${className}`}
      >
        {icon}
        <span className="ml-2">{children}</span>
      </Link>
    );

    function App() {
      return (
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-slate-50 flex flex-col">
            <header className="p-4 shadow-md bg-slate-900/70 backdrop-blur-md sticky top-0 z-50">
              <nav className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-blue-500">
                  Neuman
                </Link>
                <div className="flex items-center space-x-2">
                  <NavLink to="/" icon={<Home size={18} />}>Início</NavLink>
                  <NavLink to="/documents" icon={<FileText size={18} />}>Documentos</NavLink>
                  <NavLink to="/clients" icon={<Users size={18} />}>Clientes</NavLink>
                  <NavLink to="/settings" icon={<Settings size={18} />}>Configurações</NavLink>
                  <NavLink to="/login" icon={<LogIn size={18} />} className="bg-sky-600/30 hover:bg-sky-500/50 text-sky-300 hover:text-sky-100">Login</NavLink>
                </div>
              </nav>
            </header>
            <main className="flex-grow container mx-auto p-6">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/documents" element={<DocumentsPage />} />
                <Route path="/clients" element={<ClientsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/login" element={<LoginPage />} />
              </Routes>
            </main>
            <footer className="p-6 text-center text-sm text-slate-400 border-t border-slate-700 bg-slate-900/50 backdrop-blur-md">
              <p>© {new Date().getFullYear()} Neuman. Todos os direitos reservados.</p>
              <p>Gerenciador de Documentos para Advogados</p>
            </footer>
          </div>
          <Toaster />
        </Router>
      );
    }

    export default App;