"use client";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { getSeatInfo } from "../lib/mockStadium";
import {
  TicketValidationStep,
  ParkingStep,
  GateStep,
  RouteStep,
  WalkingStep,
  ArrivalStep,
  ProgressBar,
  StepHeader,
  NavigationButtons,
} from "./StepComponents";

/**
 * SeatGuide Component - Guides users through the process of finding their stadium seat
 *
 * @param {Object} props - Component props
 * @param {Object} props.ticketDetails - Details of the user's ticket
 * @param {string} props.ticketDetails.zone - Seating zone/section identifier
 * @param {string} props.ticketDetails.level - Level number in the stadium
 * @param {string} props.ticketDetails.rowNumber - Row number of the seat
 * @param {string} props.ticketDetails.columnNumber - Column/seat number
 * @param {Function} props.onReset - Callback function to reset the process
 */
const SeatGuide = ({ ticketDetails, onReset }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [seatInfo, setSeatInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const intervalRef = useRef(null);

  // Define the steps with useMemo to prevent unnecessary re-creation
  const steps = useMemo(
    () => [
      { id: 0, name: "Validating Ticket", duration: 10 },
      { id: 1, name: "Finding Optimal Parking", duration: 30 },
      { id: 2, name: "Locating Nearest Gate", duration: 45 },
      { id: 3, name: "Planning Route to Seat", duration: 60 },
      { id: 4, name: "Walking to Seat", duration: 120 },
      { id: 5, name: "Arrived at Seat", duration: 0 },
    ],
    []
  );

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
  }, [currentStep, steps.length]);

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

    // Cleanup function to clear interval when component unmounts or dependencies change
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentStep, steps]);

  /**
   * Format seconds into MM:SS display format
   * @param {number} seconds - Time in seconds
   * @returns {string} Formatted time string
   */
  const formatTime = useCallback((seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  }, []);

  /**
   * Calculate remaining time for current step
   * @returns {string} Formatted remaining time
   */
  const getRemainingTime = useCallback(() => {
    if (currentStep >= steps.length - 1) return "00:00";
    return formatTime(steps[currentStep].duration - timer);
  }, [currentStep, steps, timer, formatTime]);

  /**
   * Handler to manually advance to the next step
   */
  const handleNextStep = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  }, [currentStep, steps.length]);

  /**
   * Handler to reset the guide
   */
  const handleReset = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsTimerRunning(false);
    setCurrentStep(0);
    setProgress(0);
    setTimer(0);
    onReset();
  }, [onReset]);

  // Memoize the step content rendering logic
  const renderStepContent = useCallback(() => {
    switch (currentStep) {
      case 0:
        return <TicketValidationStep ticketDetails={ticketDetails} />;
      case 1:
        return <ParkingStep seatInfo={seatInfo} />;
      case 2:
        return <GateStep seatInfo={seatInfo} />;
      case 3:
        return <RouteStep seatInfo={seatInfo} ticketDetails={ticketDetails} />;
      case 4:
        return (
          <WalkingStep
            ticketDetails={ticketDetails}
            duration={steps[currentStep].duration}
          />
        );
      case 5:
        return <ArrivalStep ticketDetails={ticketDetails} />;
      default:
        return null;
    }
  }, [currentStep, ticketDetails, seatInfo, steps]);

  // Render loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  // Render error state
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
        <ProgressBar progress={progress} />

        {/* Step display */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          {/* Step header with icon and timer */}
          <StepHeader
            currentStep={currentStep}
            stepName={steps[currentStep].name}
            isTimerRunning={isTimerRunning}
            remainingTime={getRemainingTime()}
          />

          {/* Step content */}
          <div className="p-4 bg-white/5 rounded-xl border border-white/10">
            {renderStepContent()}
          </div>
        </motion.div>

        {/* Navigation buttons */}
        <NavigationButtons
          onReset={handleReset}
          onNext={handleNextStep}
          canProceed={currentStep < steps.length - 1}
        />
      </div>
    </div>
  );
};

export default SeatGuide;
