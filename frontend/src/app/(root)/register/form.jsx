"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/auth"; // Ajuste o import do seu serviço de registro

export default function RegisterForm({ userType }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [caseCode, setCaseCode] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem.");
      return;
    }

    const payload = {
      name,
      email,
      password,
      role: userType,
      ...(userType === "client" && { caseCode }),
    };

    try {
      await registerUser(payload);
      toast.success("Conta criada com sucesso! Faça login para continuar.");
      router.push("/login");
    } catch (err) {
      toast.error("Erro ao criar conta. Verifique os dados e tente novamente.");
      console.error(err);
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div>
        <Label htmlFor={`${userType}-name`} className="text-slate-300">
          Nome Completo
        </Label>
        <Input
          type="text"
          id={`${userType}-name`}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Seu nome completo"
          className="mt-1 bg-slate-700/50 border-slate-600 text-white"
          required
        />
      </div>
      <div>
        <Label htmlFor={`${userType}-email`} className="text-slate-300">
          Email
        </Label>
        <Input
          type="email"
          id={`${userType}-email`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seuemail@example.com"
          className="mt-1 bg-slate-700/50 border-slate-600 text-white"
          required
        />
      </div>
      <div>
        <Label htmlFor={`${userType}-password`} className="text-slate-300">
          Senha
        </Label>
        <Input
          type="password"
          id={`${userType}-password`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="********"
          className="mt-1 bg-slate-700/50 border-slate-600 text-white"
          required
        />
      </div>
      <div>
        <Label htmlFor={`${userType}-confirm-password`} className="text-slate-300">
          Confirmar Senha
        </Label>
        <Input
          type="password"
          id={`${userType}-confirm-password`}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="********"
          className="mt-1 bg-slate-700/50 border-slate-600 text-white"
          required
        />
      </div>
      {userType === "client" && (
        <div>
          <Label htmlFor="case-code" className="text-slate-300">
            Código do Caso (Opcional)
          </Label>
          <Input
            type="text"
            id="case-code"
            value={caseCode}
            onChange={(e) => setCaseCode(e.target.value)}
            placeholder="Ex: CX12345"
            className="mt-1 bg-slate-700/50 border-slate-600 text-white"
          />
        </div>
      )}
      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-semibold"
      >
        Cadastrar como {userType === "lawyer" ? "Advogado" : "Cliente"}
      </Button>
    </motion.form>
  );
}