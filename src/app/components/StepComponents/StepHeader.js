"use client";
import React from "react";
import {
  FaDirections,
  FaMapMarkerAlt,
  FaCar,
  FaWalking,
  FaCheckCircle,
  FaStopwatch,
} from "react-icons/fa";

const StepHeader = ({
  currentStep,
  stepName,
  isTimerRunning,
  remainingTime,
}) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        {currentStep === 0 && (
          <FaDirections className="text-xl text-indigo-400" />
        )}
        {currentStep === 1 && <FaCar className="text-xl text-indigo-400" />}
        {currentStep === 2 && (
          <FaMapMarkerAlt className="text-xl text-indigo-400" />
        )}
        {currentStep === 3 && (
          <FaDirections className="text-xl text-indigo-400" />
        )}
        {currentStep === 4 && <FaWalking className="text-xl text-indigo-400" />}
        {currentStep === 5 && (
          <FaCheckCircle className="text-xl text-green-400" />
        )}
        <h3 className="text-xl font-semibold text-white">{stepName}</h3>
      </div>

      {isTimerRunning && (
        <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
          <FaStopwatch className="text-indigo-300" />
          <span className="text-white">{remainingTime}</span>
        </div>
      )}
    </div>
  );
};

export default StepHeader;
