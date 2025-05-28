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
import { useState } from "react";
import { toast } from "sonner";
import { FilePlus } from "lucide-react";
import { uploadFile } from "@/core/firebase";
import { createDocumentVersion } from "@/lib/documents"; // novo método que você deve criar no backend

export function AddNewRevDocument({ document_id, onAddVersion }) {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleSubmit = async () => {
    if (!file) {
      toast.error("Selecione um arquivo.");
      return;
    }

    setIsSubmitting(true);

    try {
      const { fileUrl } = await uploadFile(file);

      const payload = {
        file_url: fileUrl,
        size: file.size,
        type: file.type,
      };

      await createDocumentVersion(document_id, payload);

      toast.success("Nova versão enviada com sucesso!");
      setFile(null);
      setOpen(false);
      if (onAddVersion) onAddVersion(); // recarrega lista
    } catch (err) {
      toast.error("Erro ao enviar nova versão.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r w-full from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white">
          <FilePlus size={20} className="mr-2" />
          Nova Versão
        </Button>
      </DialogTrigger>

      <DialogContent
        className="sm:max-w-lg border-none"
        style={{ backgroundColor: "#141E30", color: "white" }}
      >
        <DialogHeader>
          <DialogTitle className="text-white">
            Adicionar Nova Versão
          </DialogTitle>
          <DialogDescription className="text-gray-300">
            Envie uma nova versão do documento.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <Label htmlFor="file" className="text-white">
            Arquivo
          </Label>
          <Input
            id="file"
            type="file"
            accept="application/pdf,image/*"
            className="bg-white text-black"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="border-white hover:bg-white text-black"
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-purple-600 hover:bg-purple-700 text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Enviando..." : "Enviar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
