"use client";

import React from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Users,
  UploadCloud,
  MessageSquare,
  ShieldCheck,
  Scale,
} from "lucide-react";
import Link from "next/link";

export default function dashboard() {
  return (
    <>
    <section className="bg-[#141D30] min-h-[calc(100vh-120px)] flex flex-col items-center justify-center">

    <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-20 relative mx-auto container"
      >
        <Scale size={64} className="mx-auto mb-6 text-sky-400 opacity-70" />
        <h1 className="text-5xl text-white md:text-6xl font-extrabold mb-6 tracking-tight">
          Bem-vindo ao{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-blue-500">
            Neuman
          </span>
        </h1>
        <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-3xl mx-auto">
          A solução definitiva para gerenciamento de documentos, projetada para
          advogados autônomos. Simplifique seu fluxo de trabalho, colabore com
          eficiência e mantenha seus dados seguros.
        </p>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link href="/login">
            <Button
              size="lg"
              className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-semibold px-10 py-4 rounded-lg shadow-lg text-lg"
              asChild
            >
              Comece Agora
            </Button>
          </Link>
        </motion.div>
      </motion.section>
    
    </section>
    </>
  );
}
