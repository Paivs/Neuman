"use client";

import React, { useContext, useEffect, useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Users,
  UploadCloud,
  MessageSquare,
  ShieldCheck,
  Scale,
} from "lucide-react";
import Link from "next/link";
import { fetchDashboard, fetchDocsUsersStats } from "@/lib/dashboard";
import { useUser } from "@/core/UserContext";

const iconMap = {
  create_document: FileText,
  update_document: FileText,
  archive_document: ShieldCheck,
  add_version: UploadCloud,
  create_comment: MessageSquare,
  login_user: Users,
  register_user: Users,
};

export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [userDocsStats, setUserDocsStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, isAuthenticated } = useUser();

  async function fetchSummary() {
    try {
      const dataSummary = await fetchDashboard();
      setSummary(dataSummary);

      const dataUserDocsStats = await fetchDocsUsersStats();
      setUserDocsStats(dataUserDocsStats);

      console.log("dataUserDocsStats: " + JSON.stringify(dataUserDocsStats));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSummary();
  }, []);

  if (loading)
    return (
      <section className="min-h-[calc(100vh-120px)] flex items-center justify-center text-white">
        Carregando dashboard...
      </section>
    );

  if (error)
    return (
      <section className="min-h-[calc(100vh-120px)] flex items-center justify-center text-red-500">
        {error}
      </section>
    );

  return (
    <section className="bg-[#141D30] min-h-[calc(100vh-120px)] p-8">
      <div className="text-white container mx-auto">
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <Scale size={64} className="mx-auto mb-6 text-sky-400 opacity-70" />
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
            Bem-vindo, {" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-blue-500">
              {user.name}
            </span>
          </h1>
        </motion.section>

        {/* User Docs Stats Section */}
        <section className="mx-auto mt-16">
          <h2 className="text-3xl font-bold mb-6">Documentos</h2>
          {userDocsStats && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-[#1E2A47] p-6 rounded-lg shadow-lg flex flex-col justify-center items-center">
                <h3 className="text-xl font-semibold">Total</h3>
                <p className="text-2xl font-bold">
                  {userDocsStats.totalDocuments}
                </p>
              </div>
              <div className="bg-[#1E2A47] p-6 rounded-lg shadow-lg flex flex-col justify-center items-center">
                <h3 className="text-xl font-semibold">Arquivados</h3>
                <p className="text-2xl font-bold">
                  {userDocsStats.totalArchivedDocuments}
                </p>
              </div>
              <div className="bg-[#1E2A47] p-6 rounded-lg shadow-lg flex flex-col justify-center items-center">
                <h3 className="text-xl font-semibold">Versões</h3>
                <p className="text-2xl font-bold">
                  {userDocsStats.totalVersions}
                </p>
              </div>
            </div>
          )}

          <h2 className="text-3xl font-bold mb-6 mt-12">
            Recentemente Arquivados
          </h2>
          <ul className="space-y-4 max-h-[400px] overflow-y-auto">
            {userDocsStats &&
              userDocsStats.recentArchivedDocs.map((doc) => (
                <li
                  key={doc.id}
                  className="bg-[#1E2A47] p-4 rounded-lg shadow flex justify-between"
                >
                  <span>{doc.title}</span>
                  <time className="text-slate-400 text-nowrap">
                    {new Date(doc.updatedAt).toLocaleString()}
                  </time>
                </li>
              ))}
          </ul>
        </section>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-center mt-20"
        >
          <Link href="/login">
            <Button
              size="lg"
              className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-semibold px-10 py-4 rounded-lg shadow-lg text-lg"
              asChild
            >
              Comece Agora
            </Button>
          </Link>
        </motion.div>

        {/* Estatísticas de ações e atividades recentes */}
        <div className="flex flex-row gap-4 justify-between items-start">
          <div className="">
            <h2 className="text-3xl font-bold mb-6">Estatísticas de ações</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mx-auto">
              {/* Cards de resumo */}
              {summary &&
                summary.actionsCount.map(({ action, count }) => {
                  const Icon = iconMap[action] || FileText;
                  return (
                    <div
                      key={action}
                      className="bg-[#1E2A47] p-6 rounded-lg shadow-lg flex items-center space-x-4"
                    >
                      <Icon size={48} className="text-sky-400" />
                      <div>
                        <h3 className="text-2xl font-semibold">{count}</h3>
                        <p className="capitalize">
                          {action.replace(/_/g, " ")}
                        </p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          <section className="max-w-2xl mx-auto ">
            <h2 className="text-3xl font-bold mb-6">Atividades Recentes</h2>
            <ul className="space-y-4 max-h-[400px] overflow-y-auto pe-2">
              {summary &&
                summary.recentActivities.map((activity) => (
                  <li
                    key={activity.id}
                    className="bg-[#1E2A47] p-4 rounded-lg shadow flex gap-2 justify-between"
                  >
                    <span>{activity.description}</span>
                    <time className="text-slate-400 text-nowrap">
                      {new Date(activity.created_at).toLocaleString()}
                    </time>
                  </li>
                ))}
            </ul>
          </section>
        </div>
      </div>
    </section>
  );
}
