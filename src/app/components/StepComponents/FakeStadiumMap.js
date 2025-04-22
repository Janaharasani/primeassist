"use client";
import React, { useEffect, useRef } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";

const FakeStadiumMap = ({ currentStep, seatInfo }) => {
  const controls = useAnimation();
  const mapRef = useRef(null);

  // Map configurations for different steps
  const mapConfigs = {
    0: { level: "entry", path: [], position: "entrance" },
    1: { level: "parking", path: ["P3"], position: "parking" },
    2: { level: "concourse", path: ["Gate B"], position: "gate" },
    3: { level: "seating", path: ["Section B12"], position: "route" },
    4: { level: "seating", path: ["Row 5"], position: "walking" },
    5: { level: "seating", path: ["Seat 10"], position: "seat" },
  };

  // Current map configuration
  const config = mapConfigs[currentStep] || mapConfigs[0];

  // Animation sequences for different steps
  useEffect(() => {
    const animatePath = async () => {
      if (currentStep === 1) {
        // Parking animation
        await controls.start({
          x: [0, 100, 200],
          y: [0, 50, 0],
          transition: { duration: 2 },
        });
      } else if (currentStep === 3) {
        // Route animation
        await controls.start({
          x: [0, 50, 100, 150, 200],
          y: [0, -30, 20, -10, 0],
          transition: { duration: 3 },
        });
      } else if (currentStep === 4) {
        // Walking animation
        await controls.start({
          x: [0, 50, 100, 150, 200, 250],
          y: [0, -20, 10, -15, 5, 0],
          transition: { duration: 4 },
        });
      }
    };

    animatePath();
  }, [currentStep, controls]);

  return (
    <div
      className="relative w-full h-full bg-gray-900 rounded-xl overflow-hidden"
      ref={mapRef}
    >
      {/* Base map with different levels */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-indigo-900/20">
        {/* Level indicator */}
        <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm z-10">
          {config.level === "parking" && "Level 1: Parking"}
          {config.level === "concourse" && "Level 2: Concourse"}
          {config.level === "seating" && "Level 3: Seating"}
        </div>

        {/* Fake stadium structure */}
        <div className="absolute inset-0 opacity-20">
          {config.level === "parking" && (
            <div className="grid grid-cols-4 gap-4 p-4 h-full">
              {["P1", "P2", "P3", "P4"].map((lot) => (
                <div
                  key={lot}
                  className={`border ${
                    lot === "P3" ? "border-yellow-500" : "border-white/20"
                  } rounded-lg flex items-center justify-center`}
                >
                  <span className="text-white/50">{lot}</span>
                </div>
              ))}
            </div>
          )}

          {config.level === "concourse" && (
            <div className="flex h-full">
              {["Gate A", "Gate B", "Gate C", "Gate D"].map((gate) => (
                <div
                  key={gate}
                  className={`flex-1 border-r ${
                    gate === "Gate B" ? "border-yellow-500" : "border-white/20"
                  } flex items-center justify-center`}
                >
                  <span className="text-white/50">{gate}</span>
                </div>
              ))}
            </div>
          )}

          {config.level === "seating" && (
            <div className="p-4 h-full flex flex-col">
              <div className="flex-1 grid grid-cols-4 gap-4">
                {["A", "B", "C", "D"].map((section) => (
                  <div
                    key={section}
                    className={`border ${
                      section === "B" ? "border-yellow-500" : "border-white/20"
                    } rounded-lg flex items-center justify-center`}
                  >
                    <span className="text-white/50">Section {section}12</span>
                  </div>
                ))}
              </div>
              <div className="h-8 flex items-center justify-center text-white/50 mt-4">
                Field View
              </div>
            </div>
          )}
        </div>

        {/* Animated user position */}
        <motion.div
          className="absolute bottom-4 left-4 w-8 h-8 bg-yellow-500 rounded-full shadow-lg z-10 flex items-center justify-center"
          animate={controls}
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
            className="absolute inset-0 border-2 border-yellow-300 rounded-full"
          />
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </motion.div>

        {/* Navigation arrows */}
        <AnimatePresence>
          {(currentStep === 1 || currentStep === 3 || currentStep === 4) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-1/2 right-8 -translate-y-1/2"
            >
              <div className="relative">
                <motion.div
                  animate={{
                    x: [0, 10, 0],
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                  className="text-yellow-400 text-2xl"
                >
                  →
                </motion.div>
                <motion.div
                  animate={{
                    x: [0, 10, 0],
                    opacity: [0.6, 0.8, 0.6],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: 0.3,
                  }}
                  className="absolute top-0 left-4 text-yellow-400 text-2xl"
                >
                  →
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Current step indicator */}
        <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
          {config.path.join(" → ")}
        </div>
      </div>
    </div>
  );
};

export default FakeStadiumMap;
