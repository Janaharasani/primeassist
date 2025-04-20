"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaWalking } from "react-icons/fa";

const WalkingStep = ({ ticketDetails, duration }) => {
  return (
    <div>
      <p className="text-white/80">
        You&apos;re almost there! Look for the digital displays showing Section{" "}
        {ticketDetails?.zone}. Once inside your section, locate the stairway to
        Level {ticketDetails?.level}. Your seat is in Row{" "}
        {ticketDetails?.rowNumber}, Seat {ticketDetails?.columnNumber}.
      </p>
      <p className="text-white/70 text-sm my-2">
        <span className="text-yellow-300">Navigation tip:</span> Rows are
        numbered from bottom to top. Higher row numbers are typically higher up
        in the section.
      </p>
      <div className="flex items-center justify-center my-4">
        <div className="relative w-full max-w-xs h-8 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            transition={{
              duration: duration,
              ease: "linear",
            }}
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-600 to-purple-600"
            style={{ width: "100%" }}
          />
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "100%" }}
            transition={{
              duration: duration,
              ease: "linear",
            }}
            className="absolute top-0 left-0 h-full flex items-center justify-center"
          >
            <FaWalking className="text-white text-xl" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default WalkingStep;
