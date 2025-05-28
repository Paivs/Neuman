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
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { FilePlus } from "lucide-react";
import { toast } from "sonner";
import { createDocument } from "@/lib/documents";
import { uploadFile } from "@/core/firebase";

export function AddDocument({onAddDocument}) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    file: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      file: e.target.files?.[0] || null,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.file) {
      toast.error("Título e arquivo são obrigatórios.");
      return;
    }

    try {
      toast.message("Por favor aguarde", {
        description: "Salvando arquivo... ",
      });
      const { fileUrl } = await uploadFile(formData.file);

      const payload = {
        title: formData.title,
        description: formData.description,
        file_url: fileUrl,
        type: formData.file.type,
        size: formData.file.size,
      };

      createDocument(payload);

      toast.success("Documento enviado com sucesso!");
      setFormData({ title: "", description: "", file: null });
      setOpen(false);
      onAddDocument();
    } catch (err) {
      toast.error("Erro ao enviar documento.");
      console.error(err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white">
          <FilePlus size={20} className="mr-2" />
          Adicionar Documento
        </Button>
      </DialogTrigger>

      <DialogContent
        className="sm:max-w-lg border-none"
        style={{ backgroundColor: "#141E30", color: "white" }}
      >
        <DialogHeader>
          <DialogTitle className="text-white">Novo Documento</DialogTitle>
          <DialogDescription className="text-gray-300">
            Envie um arquivo relacionado ao cliente.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <Label htmlFor="title" className="text-white">
              Título do documento
            </Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Ex: Contrato Assinado"
              className="bg-white text-black"
            />
          </div>

          <div>
            <Label htmlFor="description" className="text-white">
              Descrição (opcional)
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Descrição breve do documento..."
              className="bg-white text-black"
            />
          </div>

          <div>
            <Label htmlFor="file" className="text-white">
              Arquivo
            </Label>
            <Input
              id="file"
              type="file"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              onChange={handleFileChange}
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
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Enviar Documento
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
