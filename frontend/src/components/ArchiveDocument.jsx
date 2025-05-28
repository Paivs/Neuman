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
import { Archive } from "lucide-react";
import { uploadFile } from "@/core/firebase";
import { deleteDocument } from "@/lib/documents"; // novo método que você deve criar no backend

export function ArchiveDocument({ document_id, nomeDocumento }) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleSubmit = async () => {
    try {

      await deleteDocument(document_id);

      toast.success("Documento arquivado com sucesso!");
      toast.warning("Ao recarregar a página este documento não será mais exibido")
      setOpen(false);
    } catch (err) {
      toast.error("Erro ao arquivar o documento.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r w-full from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white">
          <Archive size={20} className="mr-2" />
          Arquivar
        </Button>
      </DialogTrigger>

      <DialogContent
        className="sm:max-w-lg border-none"
        style={{ backgroundColor: "#141E30", color: "white" }}
      >
        <DialogHeader>
          <DialogTitle className="text-white">
            Arquivar documento
          </DialogTitle>
          <DialogDescription className="text-gray-300">
            Ao realizar esta operação o documento não aparecera mais na lista
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <Label htmlFor="file" className="text-white">
            Tem certeza que deseja arquivar '{nomeDocumento}'?
          </Label>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="border-white hover:bg-white text-black"
            disabled={isSubmitting}
          >
            Não
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-purple-600 hover:bg-purple-700 text-white"
            disabled={isSubmitting}
          >
            Sim
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
