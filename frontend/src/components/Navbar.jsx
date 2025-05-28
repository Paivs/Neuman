"use client";

import Link from "next/link";
import { useUser } from "@/core/UserContext"; // ajuste o caminho conforme sua estrutura
import { Button } from "@/components/ui/button";
import { LogIn, House, Settings, Users, Files, LogOut } from "lucide-react";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useUser();
  

  return (
    <header className="shadow-md bg-[#10182A] backdrop-blur-md">
      <nav
        className="max-w-screen-xl mx-auto flex items-center justify-between p-4"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-blue-500 dark:from-sky-300 dark:to-blue-400"
        >
          Neuman
        </Link>

        {/* Links de navegação */}
        <ul className="hidden md:flex flex-row gap-6 text-sm font-medium">
          {isAuthenticated ? (
            <>
              {/* Links para usuário logado */}
              <li>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 px-3 py-2 text-slate-300 hover:text-sky-400 hover:bg-slate-700/50 rounded-md transition-colors duration-200 undefined"
                >
                  <House />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/documents"
                  className="flex items-center gap-2 px-3 py-2 text-slate-300 hover:text-sky-400 hover:bg-slate-700/50 rounded-md transition-colors duration-200 undefined"
                >
                  <Files />
                  Documentos
                </Link>
              </li>
              <li>
                <Link
                  href="/clients"
                  className="flex items-center gap-2 px-3 py-2 text-slate-300 hover:text-sky-400 hover:bg-slate-700/50 rounded-md transition-colors duration-200 undefined"
                >
                  <Users />
                  Clientes
                </Link>
              </li>
              <li>
                <Link
                  href="/settings"
                  className="flex items-center gap-2 px-3 py-2 text-slate-300 hover:text-sky-400 hover:bg-slate-700/50 rounded-md transition-colors duration-200 undefined"
                >
                  <Settings />
                  Configurações
                </Link>
              </li>
              <li>
                <Button onClick={logout} variant="outline" className="flex items-center px-3 py-1 text-slate-300 hover:text-sky-400 hover:bg-slate-700/50 rounded-md transition-colors duration-200 bg-sky-600/30 border-none">
                  <LogOut />
                  Sair
                </Button>
              </li>
            </>
          ) : (
            <>
              {/* Links para visitante */}
              <li className="flex">
                <Link
                  href="/"
                  className="flex items-center px-3 py-2 text-slate-300 hover:text-sky-400 hover:bg-slate-700/50 rounded-md transition-colors duration-200 undefined"
                >
                  Início
                </Link>
              </li>
              <li className="flex">
                <Link
                  href="/about"
                  className="flex items-center px-3 py-2 text-slate-300 hover:text-sky-400 hover:bg-slate-700/50 rounded-md transition-colors duration-200 undefined"
                >
                  Sobre
                </Link>
              </li>
              <li className="flex">
                <Link
                  href="#plans"
                  className="flex items-center px-3 py-2 text-slate-300 hover:text-sky-400 hover:bg-slate-700/50 rounded-md transition-colors duration-200 undefined"
                >
                  Planos
                </Link>
              </li>
              <li className="flex">
                <Link
                  href="#contact"
                  className="flex items-center px-3 py-2 text-slate-300 hover:text-sky-400 hover:bg-slate-700/50 rounded-md transition-colors duration-200 undefined"
                >
                  Contato
                </Link>
              </li>
              <li className="flex">
                <Link
                  href="/login"
                  className="flex items-center px-3 py-1 text-slate-300 hover:text-sky-400 hover:bg-slate-700/50 rounded-md transition-colors duration-200 bg-sky-600/30"
                >
                  <LogIn className="h-6" />
                  <Button variant="primary">Entrar</Button>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
