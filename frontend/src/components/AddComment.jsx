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
import { MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { createDocument } from "@/lib/documents";
import { uploadFile } from "@/core/firebase";
import { createComment } from "@/lib/comment";

export function AddComment({ onAddComment, document_id, version_id }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    content: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.content) {
      toast.error("Preenchimento obrigatório.");
      return;
    }

    try {
      const payload = {
        document_id: document_id,
        version_id: version_id,
        content: formData.content,
      };

      createComment(payload);

      toast.success("Comentário salvo com sucesso!");
      setFormData({ content: "" });
      setOpen(false);
      onAddComment();
    } catch (err) {
      toast.error("Erro ao comentar.");
      console.error(err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r w-full from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white">
          <MessageSquare size={20} className="mr-2" />
          Adicionar Comentário
        </Button>
      </DialogTrigger>

      <DialogContent
        className="sm:max-w-lg border-none"
        style={{ backgroundColor: "#141E30", color: "white" }}
      >
        <DialogHeader>
          <DialogTitle className="text-white">Novo Comentário</DialogTitle>
          <DialogDescription className="text-gray-300">
            Adicionar informações, revisões, notas, etc
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            {/* <Label htmlFor="title" className="text-white">
              Título do documento
            </Label> */}
            <Input
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Ex: Necessário rever propostas..."
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
            Enviar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
