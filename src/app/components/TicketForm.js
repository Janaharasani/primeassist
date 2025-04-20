"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaTicketAlt,
  FaSearch,
  FaCheckCircle,
  FaExclamationCircle,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaDoorOpen,
  FaLayerGroup,
  FaChair,
  FaDirections,
} from "react-icons/fa";
import Image from "next/image";
import SeatGuide from "./SeatGuide";

const TicketForm = () => {
  const [ticketNumber, setTicketNumber] = useState("");
  const [validationResult, setValidationResult] = useState(null);
  const [isValid, setIsValid] = useState(false);
  const [ticketDetails, setTicketDetails] = useState(null);
  const [isValidating, setIsValidating] = useState(false);
  const [showSeatGuide, setShowSeatGuide] = useState(false);

  const validateTicket = (ticket) => {
    // Regular expression for the ticket format
    const ticketRegex =
      /^([NSWE]\d)-([SBFC])-([A-Z]{3})-(\d{6})-(\d{2})-([A-Z]\d{2})-(\d)-(\d{2})-(\d{2})$/;

    // Check if the ticket matches the format
    const match = ticket.match(ticketRegex);

    if (!match) {
      return {
        isValid: false,
        message: "Invalid ticket format. Please check your ticket number.",
        details: null,
      };
    }

    // Extract ticket components
    const [
      _,
      parkingZone,
      eventType,
      venueCode,
      eventDate,
      gateNumber,
      zone,
      level,
      rowNumber,
      columnNumber,
    ] = match;

    // Validate date format (DDMMYY)
    const day = Number.parseInt(eventDate.substring(0, 2));
    const month = Number.parseInt(eventDate.substring(2, 4));
    const year = Number.parseInt(eventDate.substring(4, 6));

    if (day < 1 || day > 31 || month < 1 || month > 12) {
      return {
        isValid: false,
        message: "Invalid date in ticket number.",
        details: null,
      };
    }

    // Map event types to full names
    const eventTypes = {
      S: "Soccer",
      B: "Basketball",
      F: "Football",
      C: "Concert",
      H: "Hockey",
      T: "Tennis",
      P: "Performance",
    };

    // Map venue codes to full names
    const venues = {
      MAD: "Madison Square Garden",
      STL: "St. Louis Arena",
      BAR: "Barclays Center",
      LAL: "Los Angeles Lakers Arena",
      BOS: "Boston Garden",
      CHI: "Chicago Stadium",
    };

    // Format date for display
    const formattedDate = `${day}/${month}/20${year}`;

    // Create ticket details object
    const details = {
      parkingZone,
      eventType: eventTypes[eventType] || eventType,
      venueCode: venues[venueCode] || venueCode,
      eventDate: formattedDate,
      gateNumber,
      zone,
      level,
      rowNumber,
      columnNumber,
    };

    return {
      isValid: true,
      message: "Valid ticket! You can proceed to the venue.",
      details,
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsValidating(true);
    setTimeout(() => {
      const result = validateTicket(ticketNumber);
      setValidationResult(result.message);
      setIsValid(result.isValid);
      setTicketDetails(result.details);
      setIsValidating(false);
    }, 800);
  };

  // Reset ticket form and go back to validation
  const handleResetSeatGuide = () => {
    setShowSeatGuide(false);
  };

  // Start the seat guide process
  const handleStartGuide = () => {
    setShowSeatGuide(true);
  };

  // If showing seat guide, render SeatGuide component
  if (showSeatGuide && ticketDetails) {
    return (
      <SeatGuide ticketDetails={ticketDetails} onReset={handleResetSeatGuide} />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className=" max-[500px]:w-[90%] max-w-md bg-[#000F2B]/5 "
    >
      <div className="backdrop-blur-sm bg-[#000F2B]/5 rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 relative">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              <Image
                src="/logo.png"
                alt="PrimeAssista"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">PrimeAssista</h2>
              <p className="text-xs text-white/60">Your Match Day Companion</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-white/60 mt-2">
            <FaTicketAlt className="h-4 w-4" />
            <span>Making Your Football Experience Seamless</span>
          </div>
        </div>

        {/* Form */}
        <div className="px-6 pb-6">
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-6">
              <label className="block text-lg font-medium text-white/90 mb-3">
                Enter Your Ticket Number
              </label>
              <div className="relative group">
                <div className="absolute -inset-[1px]  rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                <input
                  type="text"
                  value={ticketNumber}
                  onChange={(e) => setTicketNumber(e.target.value)}
                  className="relative w-full px-4 py-4 rounded-2xl bg-white/5 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent placeholder-white/30 transition-all duration-200"
                  placeholder="Example: N1-S-MAD-170425-03-B12-2-05-10"
                />
                {/* <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/30 h-5 w-5" /> */}
              </div>
              <p className="mt-2 text-sm text-white/40">
                Format: Zone-EventType-Venue-Date-Gate-Section-Level-Row-Seat
              </p>
            </div>

            <motion.button
              type="submit"
              disabled={isValidating || !ticketNumber}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl font-medium transition-all duration-200
                ${
                  isValidating || !ticketNumber
                    ? "bg-white/10 cursor-not-allowed text-white/60"
                    : " cursor-pointer  bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40"
                }`}
            >
              {isValidating ? (
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 border-2 border-white/80 border-t-transparent rounded-full animate-spin"></div>
                  <span>Verifying...</span>
                </div>
              ) : (
                <span>Verify Ticket</span>
              )}
            </motion.button>
          </form>

          {/* Results */}
          {validationResult && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
              className="mt-6"
            >
              <div
                className={`p-4 rounded-xl flex items-start gap-3 ${
                  isValid
                    ? "bg-white/10 border border-white/20"
                    : "bg-red-500/10 border border-red-500/20"
                }`}
              >
                {isValid ? (
                  <FaCheckCircle className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                ) : (
                  <FaExclamationCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                )}
                <p
                  className={`font-medium ${
                    isValid ? "text-white" : "text-red-400"
                  }`}
                >
                  {validationResult}
                </p>
              </div>
            </motion.div>
          )}

          {/* Find My Seat Button */}
          {isValid && ticketDetails && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-4"
            >
              <button
                onClick={handleStartGuide}
                className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl font-medium transition-all duration-200 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white shadow-lg"
              >
                <FaDirections className="h-5 w-5" />
                <span>Find My Seat</span>
              </button>
            </motion.div>
          )}

          {/* Ticket Details */}
          {ticketDetails && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 rounded-xl border border-white/10 overflow-hidden"
            >
              <div className="p-4 border-b border-white/10">
                <h3 className="font-medium text-white/90">
                  Ticket Information
                </h3>
              </div>

              <div className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <DetailItem
                    icon={<FaTicketAlt />}
                    label="Event"
                    value={ticketDetails.eventType}
                  />
                  <DetailItem
                    icon={<FaMapMarkerAlt />}
                    label="Venue"
                    value={ticketDetails.venueCode}
                  />
                  <DetailItem
                    icon={<FaCalendarAlt />}
                    label="Date"
                    value={ticketDetails.eventDate}
                  />
                  <DetailItem
                    icon={<FaDoorOpen />}
                    label="Gate"
                    value={ticketDetails.gateNumber}
                  />
                </div>

                <div className="pt-2 border-t border-white/10">
                  <h4 className="text-sm text-white/60 mb-2">Seating</h4>
                  <div className="grid grid-cols-3 gap-3">
                    <DetailItem
                      icon={<FaLayerGroup />}
                      label="Section"
                      value={ticketDetails.zone}
                    />
                    <DetailItem
                      icon={<FaLayerGroup />}
                      label="Level"
                      value={ticketDetails.level}
                    />
                    <DetailItem
                      icon={<FaChair />}
                      label="Seat"
                      value={`${ticketDetails.rowNumber}-${ticketDetails.columnNumber}`}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const DetailItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-2">
    <div className="mt-0.5 text-indigo-400 flex-shrink-0">{icon}</div>
    <div>
      <p className="text-xs text-white/60">{label}</p>
      <p className="font-medium text-white">{value}</p>
    </div>
  </div>
);

export default TicketForm;
