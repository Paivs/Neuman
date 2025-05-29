"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { FileText, Users, UploadCloud, ShieldCheck } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.2 },
  },
};

const plans = [
  {
    id: "basic",
    title: "Plano Básico",
    price: "Grátis",
    features: [
      "Gerenciamento básico de documentos",
      "Compartilhamento limitado",
      "Suporte comunitário",
    ],
    popular: false,
  },
  {
    id: "pro",
    title: "Plano Pro",
    price: "R$49/mês",
    features: [
      "Controle completo de versões",
      "Permissões avançadas",
      "Suporte prioritário",
      "Armazenamento ilimitado",
    ],
    popular: true,
  },
  {
    id: "enterprise",
    title: "Plano Enterprise",
    price: "Personalizado",
    features: [
      "Soluções customizadas",
      "Gerenciamento multi-usuário",
      "Consultoria dedicada",
      "Garantia de SLA",
    ],
    popular: false,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
  hover: { scale: 1.05, boxShadow: "0 20px 30px rgba(14, 165, 233, 0.5)" },
};

export default function HomeMain() {
  return (
    <div className="flex flex-col items-center px-8 md:px-20 py-20 gap-16 bg-gradient-to-b from-slate-900 to-slate-800 text-white min-h-[calc(100vh-120px)]">
      {/* Texto + Call to action */}
      <div className="w-full h-[80vh] flex flex-col justify-end">
        <div className="max-w-2xl space-y-8 mb-44">
          <h1 className="text-5xl font-extrabold leading-tight">
            Gerencie seus documentos <br /> com simplicidade e segurança
          </h1>
          <p className="text-lg text-slate-300">
            Neuman é a plataforma ideal para advogados autônomos controlarem
            versões, colaborarem e compartilharem documentos com facilidade.
          </p>
          <div className="flex gap-6">
            <Link href="/register" passHref>
              <Button
                size="lg"
                className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-semibold px-8"
              >
                Comece Agora
              </Button>
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 underline underline-offset-4 hover:text-sky-400 transition"
            >
              Saiba Mais
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-row gap-4 items-center justify-between w-full">
        {/* Ilustração placeholder */}
        <div className="hidden md:flex flex-1 justify-center">
          <div className="w-96 h-96 bg-gradient-to-tr from-sky-500 to-blue-600 rounded-xl shadow-lg flex items-center justify-center text-4xl font-bold text-white/30 select-none">
            [Imagem]
          </div>
        </div>

        {/* Features */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <Feature icon={FileText} title="Controle Total">
            Controle completo das versões e histórico dos seus documentos.
          </Feature>
          <Feature icon={Users} title="Colaboração">
            Compartilhe e trabalhe em equipe com permissões flexíveis.
          </Feature>
          <Feature icon={UploadCloud} title="Upload Seguro">
            Armazene seus arquivos com segurança e acesso rápido.
          </Feature>
          <Feature icon={ShieldCheck} title="Privacidade">
            Seus dados protegidos com tecnologias modernas e confiáveis.
          </Feature>
        </section>

        
      </div>
        {/* Plans Section */}
        <section id='plans' className="min-h-screen flex flex-col items-center justify-center py-20 px-8 md:px-20 text-white max-w-7xl mx-auto">
          <h2 className="text-4xl font-extrabold text-center mb-12">
            Escolha o plano ideal para você
          </h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-3 gap-10"
          >
            {plans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </motion.div>
        </section>
    </div>
  );
}

function PlanCard({ plan }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      className={`relative rounded-xl p-8 flex flex-col bg-gradient-to-tr from-slate-800 to-slate-700 shadow-lg cursor-pointer transition-transform duration-300
        ${plan.popular ? "border-4 border-sky-500 z-10" : ""}
      `}
    >
      {plan.popular && (
        <span className="absolute top-4 right-4 bg-sky-500 text-slate-900 font-semibold text-sm uppercase px-3 py-1 rounded-full shadow-lg">
          Mais Popular
        </span>
      )}

      <h3 className="text-2xl font-bold mb-4">{plan.title}</h3>
      <p className="text-3xl font-extrabold mb-6">{plan.price}</p>

      <ul className="mb-8 flex-1 space-y-3">
        {plan.features.map((feature, i) => (
          <FeatureItem key={i} text={feature} />
        ))}
      </ul>

      <Button
        size="lg"
        variant={plan.popular ? "default" : "outline"}
        className={`mt-auto ${plan.popular ? "text-white" : "text-black" }`}
      >
        {plan.popular ? "Assinar Agora" : "Escolher Plano"}
      </Button>
    </motion.div>
  );
}

function Feature({ icon: Icon, title, children }) {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-slate-700 rounded-xl shadow-md hover:shadow-xl transition">
      <Icon size={48} className="mb-4 text-sky-400" />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-slate-300">{children}</p>
    </div>
  );
}

function FeatureItem({ text }) {
  return (
    <li className="flex items-center gap-3 text-slate-300">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-sky-400 flex-shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      <span>{text}</span>
    </li>
  );
}
