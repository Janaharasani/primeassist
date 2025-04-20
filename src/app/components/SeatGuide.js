"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  FaDirections,
  FaMapMarkerAlt,
  FaCar,
  FaWalking,
  FaCheckCircle,
  FaArrowRight,
  FaHourglassHalf,
  FaStopwatch,
} from "react-icons/fa";
import { getSeatInfo } from "../lib/mockStadium";

const SeatGuide = ({ ticketDetails, onReset }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [seatInfo, setSeatInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const intervalRef = useRef(null);

  // Define the steps
  const steps = [
    { id: 0, name: "Validating Ticket", duration: 10 },
    { id: 1, name: "Finding Optimal Parking", duration: 30 },
    { id: 2, name: "Locating Nearest Gate", duration: 45 },
    { id: 3, name: "Planning Route to Seat", duration: 60 },
    { id: 4, name: "Walking to Seat", duration: 120 },
    { id: 5, name: "Arrived at Seat", duration: 0 },
  ];

  // Effect to fetch seat info when the component mounts
  useEffect(() => {
    if (ticketDetails && ticketDetails.zone) {
      // Use the ticket's section (zone) to lookup the seat info
      // From ticket format like 'N1-S-MAD-170425-03-B12-2-05-10'
      // B12 is the section we need to match
      const seatNumber = ticketDetails.zone;
      console.log("Looking up seat section:", seatNumber);

      const result = getSeatInfo(seatNumber);

      if (result.error) {
        setError(result.error);
        console.error("Error finding seat:", result.error);
      } else {
        setSeatInfo(result);
        console.log("Found seat info:", result);
      }
      setLoading(false);
    }
  }, [ticketDetails]);

  // Effect to update progress based on current step
  useEffect(() => {
    const progressPercentage = (currentStep / (steps.length - 1)) * 100;
    setProgress(progressPercentage);
  }, [currentStep]);

  // Timer effect - start/stop the timer based on the current step
  useEffect(() => {
    if (currentStep === steps.length - 1) {
      // Stop timer at the last step
      clearInterval(intervalRef.current);
      setIsTimerRunning(false);
      return;
    }

    if (currentStep > 0 && currentStep < steps.length - 1) {
      // Start the timer
      setTimer(0);
      setIsTimerRunning(true);

      intervalRef.current = setInterval(() => {
        setTimer((prev) => {
          const newTime = prev + 1;
          // If the timer reaches the duration for the current step, move to the next step
          if (newTime >= steps[currentStep].duration) {
            setCurrentStep((prevStep) => prevStep + 1);
            return 0;
          }
          return newTime;
        });
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [currentStep]);

  // Format time for display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Calculate remaining time for current step
  const getRemainingTime = () => {
    if (currentStep >= steps.length - 1) return "00:00";
    return formatTime(steps[currentStep].duration - timer);
  };

  // Handler to manually advance to the next step
  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Handler to reset the guide
  const handleReset = () => {
    clearInterval(intervalRef.current);
    setIsTimerRunning(false);
    setCurrentStep(0);
    setProgress(0);
    setTimer(0);
    onReset();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
        <p className="text-red-400 font-medium">{error}</p>
        <button
          onClick={handleReset}
          className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#000F2B]/10 backdrop-blur-sm rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white">Your Stadium Guide</h2>
          <p className="text-white/60">Follow these steps to reach your seat</p>

          {/* Show a notification if using fallback data */}
          {seatInfo && seatInfo.usedFallbackData && (
            <div className="mt-2 p-2 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
              <p className="text-yellow-300 text-sm">
                Note: Using demo data for this seat. In a production
                environment, we would have precise data for your specific seat.
              </p>
            </div>
          )}
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-white/60">Progress</span>
            <span className="text-sm text-white/60">
              {Math.round(progress)}%
            </span>
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

        {/* Step display */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {currentStep === 0 && (
                <FaDirections className="text-xl text-indigo-400" />
              )}
              {currentStep === 1 && (
                <FaCar className="text-xl text-indigo-400" />
              )}
              {currentStep === 2 && (
                <FaMapMarkerAlt className="text-xl text-indigo-400" />
              )}
              {currentStep === 3 && (
                <FaDirections className="text-xl text-indigo-400" />
              )}
              {currentStep === 4 && (
                <FaWalking className="text-xl text-indigo-400" />
              )}
              {currentStep === 5 && (
                <FaCheckCircle className="text-xl text-green-400" />
              )}
              <h3 className="text-xl font-semibold text-white">
                {steps[currentStep].name}
              </h3>
            </div>

            {isTimerRunning && (
              <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
                <FaStopwatch className="text-indigo-300" />
                <span className="text-white">{getRemainingTime()}</span>
              </div>
            )}
          </div>

          {/* Step content */}
          <div className="p-4 bg-white/5 rounded-xl border border-white/10">
            {currentStep === 0 && (
              <div>
                <p className="text-white/80">
                  Your ticket for seat {ticketDetails?.zone}, Level{" "}
                  {ticketDetails?.level}, Row {ticketDetails?.rowNumber}, Seat{" "}
                  {ticketDetails?.columnNumber} is valid! Preparing your custom
                  stadium guide...
                </p>
              </div>
            )}

            {currentStep === 1 && seatInfo && (
              <div>
                <p className="text-white/80 mb-2">
                  Based on your seat location, we recommend:
                </p>
                <div className="bg-white/10 p-3 rounded-lg mb-2">
                  <h4 className="font-medium text-indigo-300">
                    Parking Zone{" "}
                    {seatInfo.parkingZone
                      ? Object.keys(seatInfo.parkingZone)[0]
                      : "A"}
                  </h4>
                  <p className="text-white/70">
                    {seatInfo.parkingZone
                      ? seatInfo.parkingZone.description
                      : "Closest to Main Entrance"}
                  </p>
                  <p className="text-white/60 text-sm mt-1">
                    Available spots:{" "}
                    {seatInfo.parkingZone
                      ? seatInfo.parkingZone.availableSpots
                      : 10}
                  </p>
                </div>
              </div>
            )}

            {currentStep === 2 && seatInfo && (
              <div>
                <p className="text-white/80 mb-2">
                  We&apos;ve found the optimal entrance gate for your seat:
                </p>
                <div className="bg-white/10 p-3 rounded-lg mb-2">
                  <h4 className="font-medium text-indigo-300">
                    {seatInfo.bestGate?.gate || "Gate 1"}
                  </h4>
                  <div className="flex items-center gap-4 mt-2">
                    <div>
                      <p className="text-xs text-white/60">Distance</p>
                      <p className="text-white">
                        {seatInfo.bestGate?.distance || 50}m
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-white/60">Crowd Level</p>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full ${
                              i < (seatInfo.bestGate?.crowdLevel || 3)
                                ? "bg-yellow-500"
                                : "bg-white/20"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-white/60">Est. Time</p>
                      <p className="text-white">
                        {seatInfo.bestGate?.routeTime || 10} min
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && seatInfo && (
              <div>
                <p className="text-white/80 mb-2">
                  Recommended route to your seat:
                </p>
                <div className="bg-white/10 p-3 rounded-lg mb-2">
                  <h4 className="font-medium text-indigo-300">
                    {seatInfo.bestRoute?.route || "Route 1"}
                  </h4>
                  <p className="text-white/70">
                    {seatInfo.bestRoute?.description || "Through the East Wing"}
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    <div>
                      <p className="text-xs text-white/60">Crowd Level</p>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full ${
                              i < (seatInfo.bestRoute?.crowdLevel || 2)
                                ? "bg-yellow-500"
                                : "bg-white/20"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-white/60">Est. Time</p>
                      <p className="text-white">
                        {seatInfo.bestRoute?.time || 8} min
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div>
                <p className="text-white/80">
                  You&apos;re almost there! Follow the signs to Section{" "}
                  {ticketDetails?.zone}, Level {ticketDetails?.level}, Row{" "}
                  {ticketDetails?.rowNumber}, Seat {ticketDetails?.columnNumber}
                  .
                </p>
                <div className="flex items-center justify-center my-4">
                  <div className="relative w-full max-w-xs h-8 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ x: "-100%" }}
                      animate={{ x: 0 }}
                      transition={{
                        duration: steps[currentStep].duration,
                        ease: "linear",
                      }}
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-600 to-purple-600"
                      style={{ width: "100%" }}
                    />
                    <motion.div
                      initial={{ x: 0 }}
                      animate={{ x: "100%" }}
                      transition={{
                        duration: steps[currentStep].duration,
                        ease: "linear",
                      }}
                      className="absolute top-0 left-0 h-full flex items-center justify-center"
                    >
                      <FaWalking className="text-white text-xl" />
                    </motion.div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div className="text-center">
                <div className="inline-flex items-center justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                    <FaCheckCircle className="text-3xl text-green-500" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  You&apos;ve Arrived!
                </h3>
                <p className="text-white/80">
                  You have successfully reached your seat in Section{" "}
                  {ticketDetails?.zone}, Level {ticketDetails?.level}, Row{" "}
                  {ticketDetails?.rowNumber}, Seat {ticketDetails?.columnNumber}
                  . Enjoy the event!
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Navigation buttons */}
        <div className="flex justify-between">
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors duration-200"
          >
            Reset Guide
          </button>

          {currentStep < steps.length - 1 && (
            <button
              onClick={handleNextStep}
              className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-lg text-white flex items-center gap-2 transition-colors duration-200"
            >
              <span>Next Step</span>
              <FaArrowRight />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SeatGuide;
