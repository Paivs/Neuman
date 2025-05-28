"use client"

import React from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Briefcase} from "lucide-react";

const ClientCard = ({ name, email, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.4, delay }}
    className="bg-slate-800/70 p-6 rounded-lg shadow-xl border border-slate-700 hover:border-teal-500 transition-colors duration-300"
  >
    <h3 className="text-xl font-semibold text-teal-400 mb-2">{name}</h3>
    <p className="text-sm text-slate-300 mb-1">{email}</p>
    <div className="flex items-center text-xs text-slate-400 mt-3">
      
    </div>
    <Button
      variant="link"
      className="text-teal-400 hover:text-teal-300 p-0 h-auto mt-4"
    >
      <Briefcase size={14} className="mr-1 text-teal-500" />
      Ver Detalhes
    </Button>
  </motion.div>
);

export default ClientCard;