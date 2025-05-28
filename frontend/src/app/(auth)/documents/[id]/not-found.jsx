import Link from "next/link";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function NotFound() {
  return (
    <>

      <section className="min-h-[calc(100vh-120px)] w-full bg-[#141D30] flex flex-col items-center justify-center">
        <div className="container mx-auto flex flex-col items-center justify-center text-white">
          <h2 className="font-bold text-3xl">Documento não encontrado!</h2>
          <Link href={"/documents"}>
            <p className="text-xl">Clique aqui para voltar</p>
          </Link>
        </div>
      </section>

    </>
  );
}
