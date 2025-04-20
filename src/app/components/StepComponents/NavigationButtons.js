"use client";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

const NavigationButtons = ({ onReset, onNext, canProceed }) => {
  return (
    <div className="flex justify-between">
      <button
        onClick={onReset}
        className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors duration-200"
      >
        Reset Guide
      </button>

      {canProceed && (
        <button
          onClick={onNext}
          className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-lg text-white flex items-center gap-2 transition-colors duration-200"
        >
          <span>Next Step</span>
          <FaArrowRight />
        </button>
      )}
    </div>
  );
};

export default NavigationButtons;
