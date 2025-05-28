"use client";

import { fetchDocumentById } from "@/lib/documents";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchUserById } from "@/lib/user";
import { AddComment } from "@/components/AddComment";
import { CommentList } from "@/components/CommentList";
import { AddNewRevDocument } from "@/components/AddNewRevDocument";
import { useRouter } from "next/navigation";
import { ArrowBigRight, ArrowBigLeft, Signature } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ArchiveDocument } from "@/components/ArchiveDocument";

const formatSize = (bytes) => {
  if (!bytes) return "-";
  if (typeof bytes === "string") bytes = parseInt(bytes, 10);
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

export default function DocumentPage() {
  const { id } = useParams();
  const [document, setDocument] = useState(null);
  const [latestVersion, setLatestVersion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reloadComments, setReloadComments] = useState(0);
  const router = useRouter();

  useEffect(() => {
    async function fetchDoc() {
      try {
        const documentFetched = await fetchDocumentById(id);
        setDocument(documentFetched);

        if (
          documentFetched &&
          documentFetched.versions &&
          documentFetched.versions.length > 0
        ) {
          const currentVersion =
            documentFetched.versions.find(
              (v) => v.id === documentFetched.current_version_id
            ) || documentFetched.versions[documentFetched.versions.length - 1];
          setLatestVersion(currentVersion);
        } else {
          setLatestVersion(null);
        }
      } catch (error) {
        console.error("Erro ao buscar documento:", error);
        setDocument(null);
        setLatestVersion(null);
      } finally {
        setLoading(false);
      }
    }

    fetchDoc();
  }, [id]);

  const handleSign = () => {
    toast.warning("Função em desenvolvimento!");
  };

  const handleReloadComments = () => {
    setReloadComments((prev) => prev + 1);
  };

  const handleChangeVersion = (direction) => {
    if (!document || !document.versions || !latestVersion) return;

    const currentIndex = document.versions.findIndex(
      (v) => v.id === latestVersion.id
    );

    let targetVersion = null;

    if (direction === "next") {
      if (currentIndex < document.versions.length - 1) {
        targetVersion = document.versions[currentIndex + 1];
        handleReloadComments();
      } else {
        toast.warning("Esta já é a versão mais recente.");
        return;
      }
    }

    if (direction === "prev") {
      if (currentIndex > 0) {
        targetVersion = document.versions[currentIndex - 1];
        handleReloadComments();
      } else {
        toast.warning("Esta já é a versão mais antiga.");
        return;
      }
    }

    setLatestVersion(targetVersion);
    toast.success(`Alterado para a versão #${targetVersion.version_number}`);
  };

  if (loading) {
    return (
      <div className="text-white p-6 max-w-3xl mx-auto">Carregando...</div>
    );
  }

  if (!document) {
    return (
      <div className="bg-[#141D30] min-h-[calc(100vh-120px)] flex items-center justify-center">
        <div className="text-white p-6 max-w-3xl mx-auto text-center">
          <p className="mb-4 text-lg font-semibold">
            Documento não encontrado.
          </p>
          <Link href="/" className="text-blue-400 hover:underline">
            ← Voltar para a lista
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#141D30] min-h-[calc(100vh-70px)] py-8">
      <div className="container mx-auto flex gap-6 items-start">
        {/* Painel principal */}
        <div className="w-full p-6 bg-[#1f2937] rounded-lg shadow-lg text-white h-fit">
          <h1 className="text-3xl font-bold mb-3">{document.title}</h1>
          {document.description && (
            <p className="mb-4 text-gray-300 italic">{document.description}</p>
          )}

          <div className="flex flex-wrap gap-4 text-sm mb-6">
            <div>
              <strong>Status:</strong>{" "}
              {document.is_archived ? (
                <span className="text-red-400">Arquivado</span>
              ) : (
                <span className="text-green-400">Ativo</span>
              )}
            </div>
            <div>
              <strong>Criado em:</strong>{" "}
              {new Date(document.created_at).toLocaleString("pt-BR")}
            </div>
            <div>
              <strong>Versões:</strong> {document.versions.length}
            </div>
            <div>
              <strong>Permissões:</strong>{" "}
              {document.permissions.length > 0
                ? document.permissions
                    .map((p) => `${p.permission} (user: ${p.user.name})`)
                    .join(", ")
                : "Nenhuma"}
            </div>
          </div>

          {latestVersion ? (
            <section className="bg-[#111827] p-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-3">
                Versão Atual (#{latestVersion.version_number})
              </h2>
              <div className="mb-4 text-sm space-y-1">
                <p>
                  <strong>Tipo:</strong> {latestVersion.type}
                </p>
                <p>
                  <strong>Tamanho:</strong> {formatSize(latestVersion.size)}
                </p>
                <p>
                  <strong>Última modificação:</strong>{" "}
                  {new Date(latestVersion.last_modified).toLocaleString(
                    "pt-BR"
                  )}
                </p>
                <p>
                  <strong>Enviado por:</strong> {latestVersion.uploader.name}
                </p>
              </div>

              <div className="mt-4 flex justify-center">
                {latestVersion.type.startsWith("image/") ? (
                  <img
                    src={latestVersion.file_url}
                    alt={`Preview da versão #${latestVersion.version_number}`}
                    width={300}
                    height={300}
                    className="object-cover rounded"
                  />
                ) : latestVersion.type === "application/pdf" ? (
                  <iframe
                    src={latestVersion.file_url}
                    className="w-full h-[600px] rounded"
                    title="Visualizador PDF"
                  />
                ) : (
                  <a
                    href={latestVersion.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline"
                  >
                    Visualizar arquivo (não suportado para preview)
                  </a>
                )}
              </div>

              <a
                href={latestVersion.file_url}
                download
                className="block mt-4 text-center text-green-400 hover:underline"
              >
                ⬇️ Baixar arquivo
              </a>
            </section>
          ) : (
            <p className="text-center text-gray-400 mt-8">
              Nenhuma versão disponível para este documento.
            </p>
          )}

          {document.versions.length > 1 && (
            <section className="mt-8">
              <h3 className="text-lg font-semibold mb-2">Outras versões</h3>
              <ul className="list-disc list-inside space-y-1 max-h-48 overflow-y-auto text-sm text-gray-300">
                {document.versions
                  .filter((v) => v.id !== latestVersion?.id)
                  .map((version) => (
                    <li key={version.id}>
                      Versão #{version.version_number} -{" "}
                      {new Date(version.last_modified).toLocaleDateString(
                        "pt-BR"
                      )}
                    </li>
                  ))}
              </ul>
            </section>
          )}

          <div className="py-4 flex flex-col gap-2">
            <h2>Comentários</h2>
            {latestVersion && (
              <CommentList
                versionId={latestVersion.id}
                trigger={reloadComments}
              />
            )}
          </div>

          <Link
            href="/documents"
            className="inline-block mt-10 text-blue-400 hover:underline"
          >
            ← Voltar para a lista
          </Link>
        </div>

        {/* Menu lateral */}
        {document && latestVersion && (
          <div className="w-80 p-4 bg-[#1f2937] rounded-lg shadow-lg text-white h-fit sticky">
            <h2 className="text-lg font-semibold mb-4">Ações</h2>
            <div className="space-y-3">
              <div className="flex flex-row gap-2">
                <Button
                  className="bg-gradient-to-r w-full from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white"
                  onClick={() => {
                    handleChangeVersion("prev");
                  }}
                >
                  <ArrowBigLeft size={20} className="mr-2" />
                  Anterior
                </Button>
                <Button
                  className="bg-gradient-to-r w-full from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white"
                  onClick={() => {
                    handleChangeVersion("next");
                  }}
                >
                  <ArrowBigRight size={20} className="mr-2" />
                  Próxima
                </Button>
              </div>

              <AddNewRevDocument
                document_id={id}
                onAddVersion={() => {
                  toast.warning("Para ver a nova versão...", {
                    description: "Por favor, recarregue a página!",
                    duration: 3500,
                  });
                }}
              />

              <AddComment
                onAddComment={handleReloadComments}
                document_id={id}
                version_id={latestVersion.id}
              />

              <Button
                className="bg-gradient-to-r w-full from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white"
                onClick={handleSign}
              >
                <Signature size={20} className="mr-2" />
                Assinar documento
              </Button>

              <ArchiveDocument
                document_id={id}
                nomeDocumento={document.title}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
