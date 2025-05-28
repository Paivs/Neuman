"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { UserPlus } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/client";

export function AddClient({onAddClient}) {
  const [open, setOpen] = useState(false);
  const [isCompany, setIsCompany] = useState(false); // false = PF, true = PJ
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    document: "", // CPF ou CNPJ
    caseCode: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {

      formData

      const data = await createClient({ type: isCompany ? "pj" : "pf", name: formData.name, email: formData.email, phone: formData.phone, document: formData.document, case_code: formData.caseCode })

      toast.success("Cliente cadastrado com sucesso!");

      setFormData({ name: "", email: "", phone: "", document: "", caseCode: "" });
      onAddClient();
      setOpen(false);
    } catch (err) {
      toast.error("Erro ao cadastrar cliente.");
      console.error(err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white">
          <UserPlus size={20} className="mr-2" />
          Novo Cliente
        </Button>
      </DialogTrigger>

      <DialogContent
        className="sm:max-w-lg border-none"
        style={{ backgroundColor: "#141E30", color: "white" }}
      >
        <DialogHeader>
          <DialogTitle className="text-white">Novo Cliente</DialogTitle>
          <DialogDescription className="text-gray-300">
            Preencha os dados do cliente abaixo.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-center justify-between">
            <Label className="text-white">Pessoa Jurídica?</Label>
            <Switch
              checked={isCompany}
              onCheckedChange={setIsCompany}
              className="bg-white"
            />
          </div>

          <div>
            <Label htmlFor="name" className="text-white">
              {isCompany ? "Razão Social" : "Nome Completo"}
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={isCompany ? "Ex: Empresa XYZ Ltda" : "Ex: João da Silva"}
              className="bg-white text-black"
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-white">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="cliente@email.com"
              className="bg-white text-black"
            />
          </div>

          <div>
            <Label htmlFor="phone" className="text-white">Telefone</Label>
            <Input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(11) 99999-9999"
              className="bg-white text-black"
            />
          </div>

          <div>
            <Label htmlFor="document" className="text-white">
              {isCompany ? "CNPJ" : "CPF"}
            </Label>
            <Input
              id="document"
              name="document"
              value={formData.document}
              onChange={handleChange}
              placeholder={isCompany ? "00.000.000/0001-00" : "000.000.000-00"}
              className="bg-white text-black"
            />
          </div>

          <div>
            <Label htmlFor="caseCode" className="text-white">Código do caso (opcional)</Label>
            <Input
              id="caseCode"
              name="caseCode"
              value={formData.caseCode}
              onChange={handleChange}
              placeholder="Ex: CX001"
              className="bg-white text-black"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="border-white hover:bg-white text-black"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Cadastrar Cliente
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
