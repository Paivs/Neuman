"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { useUser } from "@/core/UserContext"; // certifique-se que o path está correto
import { loginUser } from "@/lib/auth";

export default function LoginForm({ userType }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [caseCode, setCaseCode] = useState("");
  const router = useRouter();
  const { login } = useUser();

  async function handleSubmit(event) {
    event.preventDefault();

    const payload = {
      email,
      password,
      userType,
      ...(userType === "client" && { caseCode }),
    };

    try {
      const { user } = await loginUser(email, password, userType, caseCode);

      toast.success(`Bem-vindo, ${user.name}!`, {
        description: "Login realizado com sucesso.",
        duration: 1900,
      });

      // Redirecionar para o dashboard
      setTimeout(() => {
        login(user)
        router.push("/dashboard");
      }, 2000);
    } catch (error) {
      toast.error("Email ou senha incorretos.", {
        description: "Verifique suas credenciais e tente novamente.",
      });
      console.error(error);
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
      onSubmit={handleSubmit}
    >
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
          className="mt-1 bg-slate-700/50 border-slate-600  text-white text-white"
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
          className="mt-1 bg-slate-700/50 border-slate-600  text-white"
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
            className="mt-1 bg-slate-700/50 border-slate-600  text-white"
          />
        </div>
      )}
      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-semibold"
      >
        <LogIn size={18} className="mr-2" />
        Entrar como {userType === "lawyer" ? "Advogado" : "Cliente"}
      </Button>
      <p className="text-xs text-center text-slate-400">
        Esqueceu sua senha?{" "}
        <a href="#" className="text-sky-400 hover:underline">
          Recuperar senha
        </a>
      </p>
    </motion.form>
  );
}
