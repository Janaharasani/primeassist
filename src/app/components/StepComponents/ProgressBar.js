"use client";
import React from "react";
import { motion } from "framer-motion";

const ProgressBar = ({ progress }) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-white/60">Progress</span>
        <span className="text-sm text-white/60">{Math.round(progress)}%</span>
      </div>
      <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
          className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"
        />
      </div>
    </div>
  );
};

export default ProgressBar;
