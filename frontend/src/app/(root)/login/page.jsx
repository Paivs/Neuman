"use client";

import React from "react";

import { motion } from "motion/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

import LoginForm from "./form"

import { Briefcase, UserCheck, LogIn } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-120px)] flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 to-slate-800">
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
              <TabsTrigger
                value="lawyer"
                className="data-[state=active]:bg-sky-500 data-[state=active]:text-white"
              >
                <Briefcase size={16} className="mr-2" /> Advogado
              </TabsTrigger>
              <TabsTrigger
                value="client"
                className="data-[state=active]:bg-sky-500 data-[state=active]:text-white"
              >
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
            Não tem uma conta?{" "}
            <Link href="/register" className="text-sky-400 hover:underline">
              Crie uma agora
            </Link>
          </p>
        </div>
        <div className="mt-6 flex justify-center space-x-4"></div>
      </motion.div>
    </div>
  );
}
