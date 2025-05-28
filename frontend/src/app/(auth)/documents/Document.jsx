"use client";

import React from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";


const DocumentItem = ({ id, name, lastModified, size, delay, fileUrl, type }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay }}
    className="bg-slate-800/70 p-4 rounded-lg shadow-lg border border-slate-700 hover:border-sky-500 transition-colors duration-300 flex justify-between items-center"
  >
    <div className="flex gap-4">
      {/* <DocumentPreview url={fileUrl} type={type} /> */}
      <div className="flex flex-col  justify-center">
        <h3 className="text-lg font-semibold text-sky-400">{name}</h3>
        <p className="text-xs text-slate-400">
          Modificado em: {formatDate(lastModified)} | Tamanho:{" "}
          {formatFileSize(size)}
        </p>
      </div>
    </div>
    <Link href={`/documents/${id}`}>
      <Button variant="ghost" size="sm" className="text-white">
        Ver Detalhes
      </Button>
    </Link>
  </motion.div>
);

function formatFileSize(bytes) {
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "0 B";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + " " + sizes[i];
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function DocumentPreview({ url, type }) {
  if (type.startsWith("image/")) {
    return (
      <div className="w-28 h-28 overflow-hidden rounded border">
        <img src={url} alt="Imagem" className="w-full h-full object-cover" />
      </div>
    );
  }

  if (type === "application/pdf") {
    return (
      <iframe
        src={url}
        width="100%"
        height="110px"
        className="rounded border"
      />
    );
  }

  if (type.includes("word") || type.includes("officedocument")) {
    return (
      <iframe
        src={`https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(
          url
        )}`}
        width="110px"
        height="110px"
        className="rounded border"
      />
    );
  }

  return (
    <div className="text-sm text-gray-400 italic">
      Pré-visualização não disponível para este tipo de arquivo.
    </div>
  );
}

export default DocumentItem;
