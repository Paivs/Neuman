import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <footer className="p-6 text-center text-sm text-slate-400 border-t border-slate-700 bg-[#10182A] backdrop-blur-md">
    <p>© {new Date().getFullYear()} Neuman. Todos os direitos reservados.</p>
    <p>Gerenciador de Documentos para Advogados</p>
  </footer>
  );
}
