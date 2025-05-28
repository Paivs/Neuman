import Link from "next/link";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function NotFound() {
  return (
    <>
      <Navbar />

      <section className="min-h-[calc(100vh-120px)] w-full bg-[#141D30] flex flex-col items-center justify-center">
        <div className="container mx-auto flex flex-col items-center justify-center text-white">
          <h2 className="font-bold text-3xl">Acho que você se perdeu!</h2>
          <Link href={"/"}>
            <p className="text-xl">Clique aqui para voltar ao início</p>
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
