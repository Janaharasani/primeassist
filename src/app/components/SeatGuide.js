"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTicketAlt,
  FaCar,
  FaCheckCircle,
  FaArrowRight,
  FaWalking,
  FaParking,
  FaMapMarkerAlt,
  FaClock,
  FaDoorOpen,
  FaRoute,
  FaChair,
  FaBan,
  FaExclamationTriangle,
  FaUsers,
} from "react-icons/fa";
import { getSeatInfo as getStadiumSeatInfo } from "../lib/mockStadium";
import Image from "next/image";

// Mock data function
const getSeatInfo = (zone) => {
  // Get data from mockStadium.js
  const stadiumData = getStadiumSeatInfo(zone);
  console.log("Stadium data from mockStadium:", stadiumData);
  
  if (!stadiumData) {
    // Fallback data if needed
  return {
    zone,
    recommendedParking: {
      lot: "P3",
      section: "Blue",
      distance: "250m",
      walkTime: "5min",
        availableSpots: 10,
      directions: [
        { action: "Enter", detail: "Main entrance", icon: "→" },
        { action: "Turn left", detail: "at first intersection", icon: "↰" },
        { action: "Continue", detail: "200m to Lot P3", icon: "→" },
        { action: "Park", detail: "Blue section", icon: "P" },
      ],
    },
    bestGate: {
      gate: "Gate B",
      distance: "150m",
      routeTime: "3min",
      crowdLevel: 3,
    },
    bestRoute: {
      route: "VIP Corridor",
      description: "Through the VIP lounge area",
      time: "5min",
      crowdLevel: 2,
    },
    usedFallbackData: true,
    };
  }
  
  // Extract data from stadiumData more directly
  const {
    seatNumber,
    gates,
    bestGate,
    routes,
    bestRoute,
    parkingZone,
    usedFallbackData
  } = stadiumData;
  
  // Determine available spots from parkingZone
  const availableSpots = typeof parkingZone === 'object' && parkingZone.availableSpots
    ? parkingZone.availableSpots
    : 10;
  
  // Get parking zone description
  const parkingDescription = typeof parkingZone === 'object' && parkingZone.description
    ? parkingZone.description
    : typeof parkingZone === 'string'
      ? `Zone ${parkingZone}`
      : 'Unknown Zone';
  
  // Determine lot name
  const lotName = parkingDescription.includes("Closest") ? "P1" :
                  parkingDescription.includes("Near") ? "P2" : "P3";
  
  // Handle distance and time calculations based on accurate data
  const estimatedDistance = bestGate?.distance || "150m";
  const estimatedTime = bestGate?.routeTime || "5 min";
  
  // Format directions based on actual data
  const directions = [
    { action: "Enter", detail: "Main entrance", icon: "→" },
    { action: "Turn left", detail: "at first intersection", icon: "↰" },
    { 
      action: "Continue", 
      detail: `${estimatedDistance} to ${typeof parkingZone === 'string' ? `Lot ${parkingZone}` : lotName}`, 
      icon: "→" 
    },
    { 
      action: "Park", 
      detail: parkingDescription, 
      icon: "P" 
    },
  ];
  
  // Format the data from mockStadium to match the expected structure
  return {
    zone,
    seatNumber,
    recommendedParking: {
      lot: lotName,
      section: typeof parkingZone === 'string' ? parkingZone : 'A',
      distance: estimatedDistance,
      walkTime: estimatedTime,
      availableSpots: availableSpots,
      description: parkingDescription,
      directions,
    },
    // Use actual gates data directly from stadiumData
    gates: gates || [],
    bestGate: bestGate,
    // Use actual routes data directly from stadiumData
    routes: routes || [],
    bestRoute: bestRoute,
    usedFallbackData: usedFallbackData || false,
  };
};

// Video Player Component
const VideoPlayer = ({ currentStep }) => {
  const videoRef = useRef(null);
  
  // Configure videos for each step
  const videoConfig = [
    { src: "/videos/stadium-entrance.mp4", type: "entrance" }, // Step 0
    { src: "/videos/parking-area.mp4", type: "parking" }, // Step 1
    { src: "/videos/crowd-all.mp4", type: "gate" }, // Step 2
    { src: "/videos/stadium-seating.mp4", type: "route" }, // Step 3
    { src: "/videos/crowd-yolo.mp4", type: "walking" }, // Step 4
    { src: null, type: "arrival" }, // Step 5 - no video but keeping the structure for hooks consistency
  ];

  // Get current video configuration
  const currentVideo = videoConfig[currentStep];
  
  // Effect to ensure video plays - always run this hook even if there's no video
  useEffect(() => {
    if (videoRef.current && currentVideo && currentVideo.src) {
      // Reset the video to the start and load it
      videoRef.current.currentTime = 0;
      videoRef.current.load();
      
      // Play the video without looping too quickly
      const playVideo = async () => {
        try {
          await videoRef.current.play();
        } catch (error) {
          console.log("Autoplay prevented:", error);
        }
      };
      
      playVideo();
    }
  }, [currentStep, currentVideo]);

  // Special case for arrival step - show football.jpg instead of empty div
  if (currentStep === 5) {
    return (
      <div className="mt-4 relative aspect-video bg-black rounded-xl overflow-hidden border border-white/10">
        <Image
          src="/football.jpg"
          alt="Football stadium view"
          fill
          className="object-cover"
        />
        <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 text-xs rounded">
          Stadium View
        </div>
      </div>
    );
  }

  // If no video to show, render an empty div with the same height to maintain layout
  if (!currentVideo || !currentVideo.src) {
    return <div className="mt-4 relative aspect-video bg-black/30 rounded-xl border border-white/10"></div>;
  }

  // When video ends, restart it after a brief delay to avoid jarring immediate restart
  const handleVideoEnded = () => {
    if (videoRef.current) {
      // Add a small delay before restarting to make loop less jarring
      setTimeout(() => {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(err => console.log("Replay failed:", err));
      }, 500);
    }
  };

  return (
    <div className="mt-4 relative aspect-video bg-black rounded-xl overflow-hidden border border-white/10">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnded}
        className="w-full h-full object-cover"
      >
        <source src={currentVideo.src} type="video/mp4" />
        Your browser does not support videos
      </video>
      <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 text-xs rounded">
        {currentVideo.type === "parking"
          ? "Parking Guide"
          : currentVideo.type === "gate"
          ? "Gate Entrance"
          : currentVideo.type === "route"
          ? "Seating Area"
          : currentVideo.type === "walking"
          ? "Crowd Navigation"
          : "Stadium Entrance"}
      </div>
    </div>
  );
};

// Fake Stadium Map Component
const FakeStadiumMap = ({ currentStep, seatInfo, duration }) => {
  // Only show the map for steps that need it
  if (!seatInfo) return null;
  
  // Get zone label to avoid rendering objects directly
  const getZoneLabel = (zone) => {
    if (!zone) return "Unknown";
    return typeof zone === 'object' 
      ? zone.description || zone.name || "Unknown Zone"
      : zone;
  };
  
  const mapContent = () => {
    switch (currentStep) {
      case 1: // Parking step
        // Get parking zones safely
        const parkingZoneA = getZoneLabel('A');
        const parkingZoneB = getZoneLabel('B');
        const parkingZoneC = getZoneLabel('C');
        
        // Get selected zone
        const selectedZone = typeof seatInfo.recommendedParking.section === 'object'
          ? seatInfo.recommendedParking.section.description?.charAt(0) || "Unknown"
          : seatInfo.recommendedParking.section;

        return (
          <div className="p-4 h-full flex flex-col">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center">
              <FaParking className="mr-2 text-blue-400" /> Parking Areas
            </h3>
            <div className="flex-1 overflow-y-auto space-y-3">
              {/* Parking Zone A */}
              <div className={`p-3 rounded-lg border ${selectedZone === 'A' ? 'bg-blue-500/20 border-blue-500/40' : 'bg-white/5 border-white/10'}`}>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-400/20 rounded-full flex items-center justify-center text-blue-400">A</div>
                    <div>
                      <p className="text-white font-medium">Parking Zone A</p>
                      <p className="text-xs text-white/60">Closest to Main Entrance</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-white/60">Available Spots</p>
                    <p className={`font-medium ${selectedZone === 'A' ? 'text-blue-400' : 'text-white'}`}>
                      {10} spots
                    </p>
                  </div>
                </div>
                {selectedZone === 'A' && (
                  <div className="mt-2 bg-blue-500/20 p-2 rounded text-sm text-white/90">
                    <FaCheckCircle className="inline-block mr-2 text-blue-400" /> Recommended for your seat
                  </div>
                )}
              </div>
              
              {/* Parking Zone B */}
              <div className={`p-3 rounded-lg border ${selectedZone === 'B' ? 'bg-blue-500/20 border-blue-500/40' : 'bg-white/5 border-white/10'}`}>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-400/20 rounded-full flex items-center justify-center text-blue-400">B</div>
                    <div>
                      <p className="text-white font-medium">Parking Zone B</p>
                      <p className="text-xs text-white/60">Near Gate 3</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-white/60">Available Spots</p>
                    <p className={`font-medium ${3 <= 2 ? 'text-red-400' : selectedZone === 'B' ? 'text-blue-400' : 'text-white'}`}>
                      {3} spots
                    </p>
                  </div>
                </div>
                {selectedZone === 'B' && (
                  <div className="mt-2 bg-blue-500/20 p-2 rounded text-sm text-white/90">
                    <FaCheckCircle className="inline-block mr-2 text-blue-400" /> Recommended for your seat
                  </div>
                )}
                {3 <= 2 && (
                  <div className="mt-2 bg-red-500/20 p-2 rounded text-sm text-white/90">
                    <FaExclamationTriangle className="inline-block mr-2 text-yellow-400" /> Limited spots available
                  </div>
                )}
              </div>
              
              {/* Parking Zone C */}
              <div className={`p-3 rounded-lg border ${selectedZone === 'C' ? 'bg-blue-500/20 border-blue-500/40' : 'bg-white/5 border-white/10'}`}>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-400/20 rounded-full flex items-center justify-center text-blue-400">C</div>
                    <div>
                      <p className="text-white font-medium">Parking Zone C</p>
                      <p className="text-xs text-white/60">Farther from Entrance</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-white/60">Available Spots</p>
                    <p className={`font-medium ${selectedZone === 'C' ? 'text-blue-400' : 'text-white'}`}>
                      {15} spots
                    </p>
                  </div>
                </div>
                {selectedZone === 'C' && (
                  <div className="mt-2 bg-blue-500/20 p-2 rounded text-sm text-white/90">
                    <FaCheckCircle className="inline-block mr-2 text-blue-400" /> Recommended for your seat
                  </div>
                )}
              </div>
              
              <div className="mt-4 p-3 bg-indigo-500/20 border border-indigo-500/30 rounded-lg text-sm text-white/90">
                <div className="flex items-start">
                  <FaUsers className="mt-1 mr-2 text-indigo-400" /> 
                  <div>
                    <p className="font-medium text-white">Current Crowd Levels</p>
                    <p className="mt-1">Zone A: <span className="text-red-400">High</span> • Zone B: <span className="text-yellow-400">Medium</span> • Zone C: <span className="text-green-400">Low</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 2: // Gate step
        return (
          <div className="p-4 h-full flex flex-col">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center">
              <FaDoorOpen className="mr-2 text-purple-400" /> Stadium Gates
            </h3>
            <div className="flex-1 overflow-y-auto space-y-3">
              {/* Plot gates from seatInfo */}
              {seatInfo.gates && seatInfo.gates.length > 0 ? (
                seatInfo.gates.map((gate, index) => (
                  <div key={index} className={`p-3 rounded-lg border ${gate.gate === seatInfo.bestGate?.gate ? 'bg-purple-500/20 border-purple-500/40' : 'bg-white/5 border-white/10'}`}>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-purple-400/20 rounded-full flex items-center justify-center text-purple-400">
                          {typeof gate.gate === 'string' && gate.gate.replace('Gate ', '').charAt(0)}
                        </div>
                        <div>
                          <p className="text-white font-medium">{gate.gate}</p>
                          <p className="text-xs text-white/60">Distance: {gate.distance}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-white/60">Crowd Level</p>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <div
                              key={i}
                              className={`w-2 h-2 rounded-full ${
                                i < gate.crowdLevel ? "bg-yellow-500" : "bg-white/20"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    {gate.gate === seatInfo.bestGate?.gate && (
                      <div className="mt-2 bg-purple-500/20 p-2 rounded text-sm text-white/90">
                        <FaCheckCircle className="inline-block mr-2 text-purple-400" /> Recommended gate for your seat
                      </div>
                    )}
                    
                    {/* Add estimated time info */}
                    <div className="mt-2 flex items-center gap-3 text-sm text-white/70">
                      <div className="flex items-center gap-1">
                        <FaClock className="text-purple-400" />
                        <span>Est. Time: {gate.routeTime}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : seatInfo.bestGate ? (
                // Show just the best gate if gates array is missing
                <div className="p-3 rounded-lg border bg-purple-500/20 border-purple-500/40">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-purple-400/20 rounded-full flex items-center justify-center text-purple-400">
                        {typeof seatInfo.bestGate.gate === 'string' && seatInfo.bestGate.gate.replace('Gate ', '').charAt(0)}
                      </div>
                      <div>
                        <p className="text-white font-medium">{seatInfo.bestGate.gate}</p>
                        <p className="text-xs text-white/60">Distance: {seatInfo.bestGate.distance}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-white/60">Crowd Level</p>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full ${
                              i < seatInfo.bestGate.crowdLevel ? "bg-yellow-500" : "bg-white/20"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 bg-purple-500/20 p-2 rounded text-sm text-white/90">
                    <FaCheckCircle className="inline-block mr-2 text-purple-400" /> Recommended gate for your seat
                  </div>
                </div>
              ) : (
                <div className="p-3 rounded-lg border bg-white/5 border-white/10">
                  <p className="text-white/70 text-center">No gate information available</p>
                </div>
              )}
              
              <div className="mt-4 p-3 bg-purple-500/20 border border-purple-500/30 rounded-lg text-sm text-white/90">
                <div className="flex items-start">
                  <FaUsers className="mt-1 mr-2 text-purple-400" /> 
                  <div>
                    <p className="font-medium text-white">Gate Selection Advice</p>
                    <p className="mt-1">Choose gates with lower crowd levels for faster entry. Gates closer to parking areas A and C tend to be less crowded.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 3: // Route step
        return (
          <div className="p-4 h-full flex flex-col">
            <div className="flex-1 relative overflow-hidden rounded-xl border border-white/10">
              <Image 
                src="/zones.jpg" 
                alt="Stadium Zones Map" 
                fill
                className="object-cover "
              />
            </div>
          </div>
        );
      
      case 4: // Walking step
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-green-900/30 to-green-900/10 rounded-xl overflow-hidden flex items-center justify-center">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="bg-green-500/20 p-5 rounded-full"
            >
              <FaWalking className="text-green-400 text-6xl" />
            </motion.div>
          </div>
        );
        
      case 5: // Arrival step - Simplified to not duplicate content
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-green-900/30 to-green-900/10 rounded-xl overflow-hidden flex items-center justify-center">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="bg-green-500/20 p-5 rounded-full"
            >
              <FaChair className="text-green-400 text-6xl" />
            </motion.div>
          </div>
        );

      default: // Default/Initial step
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-blue-900/30 to-blue-900/10 rounded-xl overflow-hidden flex items-center justify-center">
          <motion.div
            animate={{
                scale: [1, 1.1, 1],
            }}
            transition={{
                duration: 2,
              repeat: Infinity,
            }}
              className="bg-blue-500/20 p-5 rounded-full"
          >
              <FaTicketAlt className="text-blue-400 text-6xl" />
          </motion.div>
      </div>
        );
    }
  };

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#000F2B]/80 border border-white/10">
      {mapContent()}
    </div>
  );
};

// Ticket Validation Step
const TicketValidationStep = ({ ticketDetails }) => {
  return (
    <div className="flex flex-col gap-6 h-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center gap-3 p-4 bg-indigo-900/20 rounded-lg border border-indigo-500/20"
      >
        <FaTicketAlt className="text-indigo-300 text-2xl" />
        <div>
          <h3 className="font-medium text-white">Ticket Verified</h3>
          <p className="text-white/70 text-sm">
            Preparing your personalized guide
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 gap-4">
        {[
          {
            label: "SECTION",
            value: ticketDetails?.zone,
            icon: <FaMapMarkerAlt />,
          },
          {
            label: "LEVEL",
            value: ticketDetails?.level,
            icon: <FaMapMarkerAlt />,
          },
          {
            label: "ROW",
            value: ticketDetails?.rowNumber,
            icon: <FaMapMarkerAlt />,
          },
          {
            label: "SEAT",
            value: ticketDetails?.columnNumber,
            icon: <FaMapMarkerAlt />,
          },
        ].map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.2 }}
            className="bg-white/5 p-4 rounded-lg border border-white/10"
          >
            <div className="flex items-center gap-2 text-indigo-300 mb-1 text-xs font-medium">
              {item.icon}
              {item.label}
            </div>
            <p className="text-2xl font-bold text-white">{item.value}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Parking Step
const ParkingStep = ({ seatInfo }) => {
  const parkingData = seatInfo?.recommendedParking;
  if (!parkingData) return null;

  // Get zone label safely
  const zoneLabel = typeof parkingData.section === 'object' 
    ? parkingData.section.description || 'Unknown Zone'
    : parkingData.section;

  return (
    <div className="p-4 h-full overflow-y-auto">
      <div className="bg-white/5 p-4 md:p-6 rounded-xl border border-white/10 mb-4">
        <div className="flex items-start gap-4">
          <div className="bg-yellow-500/20 p-3 rounded-lg flex-shrink-0">
            <FaCar className="text-yellow-400 text-2xl" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">
              Recommended Parking
            </h3>
            <p className="text-white/80 text-lg">
              Zone {zoneLabel} - {parkingData.lot}
            </p>
            <div className="flex flex-wrap gap-4 mt-4">
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-yellow-400" />
                <div>
                  <p className="text-white/60 text-sm">Distance</p>
                  <p className="text-white font-medium">
                    {parkingData.distance}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FaClock className="text-yellow-400" />
                <div>
                  <p className="text-white/60 text-sm">Walk Time</p>
                  <p className="text-white font-medium">
                    {parkingData.walkTime}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FaParking className="text-yellow-400" />
                <div>
                  <p className="text-white/60 text-sm">Available</p>
                  <p className="text-white font-medium">
                    {typeof parkingData.availableSpots === 'object' 
                      ? parkingData.availableSpots.availableSpots || '10+' 
                      : parkingData.availableSpots || '10+'} spots
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white/5 p-4 md:p-6 rounded-xl border border-white/10">
        <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-3">
          <FaWalking className="text-yellow-400" />
          Turn-by-Turn Directions
        </h4>

        <div className="space-y-4">
          {parkingData.directions.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="flex items-start gap-4 p-4 bg-white/10 rounded-lg border border-white/10"
            >
              <div className="bg-yellow-500/20 text-yellow-400 w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink0">
                {step.icon === "P" ? <FaParking /> : 
                 step.icon === "→" ? <FaArrowRight /> : 
                 step.icon === "↰" ? <FaArrowRight className="transform -rotate-90" /> : 
                 step.icon}
              </div>
              <div className="flex-1">
                <p className="text-lg font-medium text-white">
                  {step.action}{" "}
                  <span className="text-yellow-400">{step.detail}</span>
                </p>
                {index === 1 && (
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="text-yellow-400 text-sm mt-2 flex items-center gap-2"
                  >
                    <FaArrowRight /> Follow the blue markers on the ground
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
          <p className="text-white text-sm flex items-start gap-2">
            <FaExclamationTriangle className="text-yellow-400 flex-shrink0 mt-0.5" />
            <span>
              <strong className="text-yellow-400">Parking Tip:</strong> Arrive at least 60 minutes before event start time to secure your spot. 
              Zone {zoneLabel} typically fills up {zoneLabel === 'A' ? 'very quickly' : zoneLabel === 'B' ? 'moderately quickly' : 'slowly'}.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

// Gate Step
const GateStep = ({ seatInfo }) => {
  const gateData = seatInfo?.bestGate;

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="bg-white/5 p-6 rounded-xl border border-white/10">
        <div className="flex items-start gap-4">
          <div className="bg-purple-500/20 p-3 rounded-lg">
            <FaDoorOpen className="text-purple-400 text-2xl" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Best Entrance Gate</h3>
            <p className="text-white/80 text-lg">Gate {gateData.gate}</p>
            <div className="flex gap-6 mt-4">
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-purple-400" />
                <div>
                  <p className="text-white/60 text-sm">Distance</p>
                  <p className="text-white font-medium">{gateData.distance}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FaClock className="text-purple-400" />
                <div>
                  <p className="text-white/60 text-sm">Walk Time</p>
                  <p className="text-white font-medium">{gateData.routeTime}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-white/5 p-6 rounded-xl border border-white/10 overflow-y-auto">
        <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-3">
          <FaWalking className="text-purple-400" />
          Gate Access Details
        </h4>

        <div className="space-y-4">
          <div className="p-4 bg-white/10 rounded-lg border border-white/10">
            <p className="text-white">
              Look for the{" "}
              <span className="text-purple-400 font-medium">
                Gate {gateData.gate}
              </span>{" "}
              signage on the{" "}
              {gateData.gate === "Gate A"
                ? "north"
                : gateData.gate === "Gate B"
                ? "east"
                : gateData.gate === "Gate C"
                ? "south"
                : "west"}{" "}
              side of the stadium.
            </p>
          </div>

          <div className="p-4 bg-white/10 rounded-lg border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <p className="text-white/80">Current Crowd Level:</p>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full ${
                      i < gateData.crowdLevel ? "bg-yellow-500" : "bg-white/20"
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-white/70 text-sm">
              {gateData.crowdLevel <= 2
                ? "Light crowd - easy access"
                : gateData.crowdLevel <= 3
                ? "Moderate crowd - short wait expected"
                : "Heavy crowd - consider arriving early"}
            </p>
          </div>

          <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
            <p className="text-white text-sm">
              <span className="font-medium">Tip:</span> Have your ticket ready
              to scan at the gate entrance. Security checks may add 2-3 minutes
              to your entry time during peak hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Route Step
const RouteStep = ({ seatInfo, ticketDetails }) => {
  const routeData = seatInfo?.bestRoute;
  
  if (!routeData) return (
    <div className="p-4 h-full flex flex-col">
      <div className="text-center text-white/70 mb-4">No route information available</div>
      <div className="flex-1 relative overflow-hidden rounded-xl border border-white/10">
        <Image 
          src="/zones.jpg" 
          alt="Stadium Zones Map" 
          fill
          className="object-cover"
        />
      </div>
    </div>
  );

  return (
    <div className="p-4 h-full overflow-y-auto">
      <div className="bg-white/5 p-4 md:p-6 rounded-xl border border-white/10 mb-4">
        <div className="flex items-start gap-4">
          <div className="bg-indigo-500/20 p-3 rounded-lg flex-shrink-0">
            <FaRoute className="text-indigo-400 text-2xl" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Optimal Route</h3>
            <p className="text-white/80 text-lg">{routeData.route || "Best Route"}</p>
            <div className="flex flex-wrap gap-4 mt-4">
              <div className="flex items-center gap-2">
                <FaClock className="text-indigo-400" />
                <div>
                  <p className="text-white/60 text-sm">Est. Time</p>
                  <p className="text-white font-medium">{routeData.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FaWalking className="text-indigo-400" />
                <div>
                  <p className="text-white/60 text-sm">Crowd Level</p>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${
                          i < (routeData.crowdLevel || 3) ? "bg-yellow-500" : "bg-white/20"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white/5 p-4 md:p-6 rounded-xl border border-white/10">
        <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-3">
          <FaArrowRight className="text-indigo-400" />
          Route Options
        </h4>

        <div className="space-y-4">
          {/* Show all route options */}
          {seatInfo.routes && seatInfo.routes.length > 0 ? (
            seatInfo.routes.map((route, index) => (
              <div 
                key={index} 
                className={`p-4 bg-white/10 rounded-lg border ${
                  route.route === routeData.route ? 'border-indigo-500/40' : 'border-white/10'
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-full ${
                      route.route === routeData.route ? 'bg-indigo-500/40' : 'bg-white/10'
                    } flex items-center justify-center text-white`}>
                      {index + 1}
                    </div>
                    <p className="text-white font-medium">
                      {route.route}
                      {route.route === routeData.route && (
                        <span className="ml-2 text-xs bg-indigo-500/40 text-white px-2 py-0.5 rounded">Recommended</span>
                      )}
            </p>
          </div>
                  <div className="text-white/60 text-sm">
                    {route.time}
                  </div>
                </div>
                <p className="text-white/80">
                  {route.description}
                </p>
                <div className="mt-2 flex items-center gap-2 text-white/60 text-sm">
                  <span>Crowd Level:</span>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${
                          i < (route.crowdLevel || 3) ? "bg-yellow-500" : "bg-white/20"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
          <div className="p-4 bg-white/10 rounded-lg border border-white/10">
            <p className="text-white">
              Follow the{" "}
                {routeData.description?.includes("VIP") ? (
                <span className="text-indigo-400">
                  VIP corridor with the red carpet
                </span>
                ) : routeData.description?.includes("Main") ? (
                <span className="text-indigo-400">
                  main concourse with food vendors
                </span>
              ) : (
                <span className="text-indigo-400">marked pathway</span>
              )}{" "}
              to reach your section.
            </p>
          </div>
          )}

          <div className="p-4 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
            <p className="text-white text-sm">
              <span className="font-medium">Facilities along route:</span>{" "}
              Restrooms and concessions are available. The closest restroom is
              near the section entrance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Walking Step
const WalkingStep = ({ ticketDetails, duration }) => {
  return (
    <div className="p-4 h-full overflow-y-auto">
      <div className="bg-white/5 p-4 md:p-6 rounded-xl border border-white/10 mb-4">
        <div className="flex items-start gap-4">
          <div className="bg-green-500/20 p-3 rounded-lg flex-shrink-0">
            <FaWalking className="text-green-400 text-2xl" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Final Approach</h3>
            <p className="text-white/80 text-lg">
              To your seat in Section {ticketDetails?.zone}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white/5 p-4 md:p-6 rounded-xl border border-white/10">
        <div className="mb-4 bg-black/20 rounded-lg overflow-hidden border border-white/10 relative aspect-video">
          {/* Virtual stadium seating chart */}
          <div className="absolute inset-0 bg-[#011D3C] flex items-center justify-center">
            <div className="relative w-[80%] h-[80%] rounded-full border-4 border-white/20 flex items-center justify-center">
              <div className="absolute text-white/50 text-xs md:text-sm font-bold">
                {/* Stadium sections */}
                <div className="absolute top-[-20px] left-1/2 transform -translate-x-1/2">A</div>
                <div className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2">B</div>
                <div className="absolute left-[-20px] top-1/2 transform -translate-y-1/2">C</div>
                <div className="absolute right-[-20px] top-1/2 transform -translate-y-1/2">D</div>
              </div>
              
              <div className="w-[60%] h-[60%] rounded-full border-2 border-white/20 flex items-center justify-center">
                <div className="w-[60%] h-[60%] rounded-full border border-white/20 flex items-center justify-center">
                  <div className="w-20 h-8 bg-green-500/40 border border-green-500 rounded flex items-center justify-center text-white text-sm">
                    FIELD
                  </div>
                </div>
              </div>
              
              {/* Highlight user's section */}
              <div className={`absolute ${
                ticketDetails?.zone.startsWith('A') ? 'top-[10%]' :
                ticketDetails?.zone.startsWith('B') ? 'bottom-[10%]' :
                ticketDetails?.zone.startsWith('C') ? 'left-[10%]' : 'right-[10%]'
              } w-12 h-12 bg-yellow-500/60 rounded-full animate-pulse flex items-center justify-center z-10`}>
                <div className="text-white font-bold text-sm">{ticketDetails?.zone}</div>
              </div>
            </div>
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-0 left-0 p-4">
            <p className="text-white font-bold mb-1">
              Your Section: {ticketDetails?.zone}
            </p>
            <p className="text-white/70 text-sm">
              Level: {ticketDetails?.level} • Row: {ticketDetails?.rowNumber}
            </p>
          </div>
          <div className="absolute top-2 right-2 bg-green-500/70 text-white px-2 py-1 text-xs rounded-full">
            Stadium Map
          </div>
        </div>

        <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-3 mt-4">
          <FaArrowRight className="text-green-400" />
          Seat Location Details
        </h4>

        <div className="space-y-4">
          <div className="p-4 bg-white/10 rounded-lg border border-white/10">
            <p className="text-white">
              Look for the digital displays showing{" "}
              <span className="text-green-400">
                Section {ticketDetails?.zone}
              </span>
              .
            </p>
          </div>

          <div className="p-4 bg-white/10 rounded-lg border border-white/10">
            <p className="text-white">
              Once inside your section, locate the stairway to{" "}
              <span className="text-green-400">
                Level {ticketDetails?.level}
              </span>
              .
            </p>
          </div>

          <div className="p-4 bg-white/10 rounded-lg border border-white/10">
            <p className="text-white">
              Your seat is in{" "}
              <span className="text-green-400">
                Row {ticketDetails?.rowNumber}
              </span>
              ,{" "}
              <span className="text-green-400">
                Seat {ticketDetails?.columnNumber}
              </span>
              .
            </p>
            <p className="text-white/70 text-sm mt-2">
              <span className="text-yellow-300">Note:</span> Rows are numbered
              from bottom to top. Higher row numbers are typically higher up in
              the section.
            </p>
          </div>

          <div className="mt-6">
            <div className="relative w-full h-3 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{
                  duration: duration,
                  ease: "linear",
                }}
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-500 to-blue-500"
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
            <p className="text-white/70 text-sm mt-2 text-center">
              Estimated walking time: {Math.floor(duration / 60)} minutes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Progress Bar Component
const ProgressBar = ({ progress }) => {
  return (
    <div className="w-full bg-white/10 rounded-full h-2.5 mb-6">
      <motion.div
        className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2.5 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5 }}
      />
    </div>
  );
};

// Step Header Component
const StepHeader = ({ stepName, remainingTime }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-2xl font-bold text-white">{stepName}</h3>
      <div className="bg-white/10 px-4 py-2 rounded-full text-sm font-medium">
        {remainingTime}
      </div>
    </div>
  );
};

// Navigation Buttons Component
const NavigationButtons = ({ onReset, onNext, canProceed }) => {
  return (
    <div className="flex justify-between mt-6">
      <button
        onClick={onReset}
        className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition flex-1 mr-4"
      >
        Reset Guide
      </button>
      {canProceed && (
        <button
          onClick={onNext}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition flex-1"
        >
          Next Step
        </button>
      )}
    </div>
  );
};

// Main Component
const SeatGuide = ({ ticketDetails, onReset }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [seatInfo, setSeatInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [duration, setDuration] = useState(0);
  const intervalRef = useRef(null);

  const steps = useMemo(
    () => [
      { id: 0, name: "Validating Ticket", duration: 5 },
      { id: 1, name: "Finding Optimal Parking", duration: 150 },
      { id: 2, name: "Locating Nearest Gate", duration: 150 },
      { id: 3, name: "Planning Route to Seat", duration: 150 },
      { id: 4, name: "Walking to Seat", duration: 150 },
      { id: 5, name: "Arrived at Seat", duration: 0 },
    ],
    []
  );

  // Load seat info
  useEffect(() => {
    if (ticketDetails?.zone) {
      const result = getSeatInfo(ticketDetails.zone);
      setSeatInfo(result);
      setLoading(false);
      setDuration(result.bestRoute?.time || 5);
    }
  }, [ticketDetails]);

  // Update progress
  useEffect(() => {
    setProgress((currentStep / (steps.length - 1)) * 100);
  }, [currentStep, steps.length]);

  // Timer logic
  useEffect(() => {
    if (currentStep >= steps.length - 1) {
      clearInterval(intervalRef.current);
      setIsTimerRunning(false);
      return;
    }

    if (currentStep > 0) {
      setTimer(0);
      setIsTimerRunning(true);

      intervalRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev >= steps[currentStep].duration) {
            setCurrentStep((prevStep) => prevStep + 1);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [currentStep, steps]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const getRemainingTime = () => {
    if (currentStep >= steps.length - 1) return "00:00";
    return formatTime(steps[currentStep].duration - timer);
  };

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setIsTimerRunning(false);
    setCurrentStep(0);
    setProgress(0);
    setTimer(0);
    onReset();
  };

  const renderStepContent = () => {
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
            duration={duration}
          />
        );
      case 5:
        return <ArrivalStep seatInfo={seatInfo} />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#000F2B] py-6 px-4 md:py-8 md:px-8 overflow-auto">
      <div className="max-w-6xl mx-auto bg-[#000F2B]/50 backdrop-blur-md rounded-3xl border border-white/10 shadow-2xl overflow-hidden mb-8">
        <div className="p-4 md:p-6 flex flex-col">
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Stadium Navigation Guide
            </h2>
            <p className="text-white/70">Follow the steps to reach your seat</p>

            {seatInfo?.usedFallbackData && (
              <div className="mt-4 p-3 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
                <p className="text-yellow-300 text-sm">
                  Note: Using demo data. Real implementation would have precise
                  seat data.
                </p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Visual Guide Column */}
            <div className="flex flex-col gap-4">
              <div className="h-[30vh] md:h-[35vh] min-h-[250px] max-h-[400px]">
                <FakeStadiumMap currentStep={currentStep} seatInfo={seatInfo} duration={duration} />
              </div>
              <VideoPlayer currentStep={currentStep} />
            </div>

            {/* Information Column */}
            <div className="flex flex-col gap-4">
              <ProgressBar progress={progress} />

              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col"
              >
                <StepHeader
                  stepName={steps[currentStep].name}
                  remainingTime={getRemainingTime()}
                />

                <div className="bg-white/5 rounded-xl border border-white/10 overflow-y-auto max-h-[60vh] md:max-h-[50vh]">
                  {renderStepContent()}
                </div>
              </motion.div>

              <NavigationButtons
                onReset={handleReset}
                onNext={handleNextStep}
                canProceed={currentStep < steps.length - 1}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Arrival Step
const ArrivalStep = ({ seatInfo }) => {
  return (
    <div className="p-4 h-full overflow-y-auto">
      <div className="flex flex-col gap-6 items-center justify-center text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center"
        >
          <FaCheckCircle className="text-green-500 text-4xl" />
        </motion.div>

        <div>
          <h3 className="text-2xl font-bold text-white mb-2">
            You&apos;ve Arrived!
          </h3>
          <p className="text-white/80 text-lg">
            Welcome to your seat in Section {seatInfo?.zone}
          </p>
        </div>

        <div className="bg-white/5 p-6 rounded-xl border border-white/10 w-full max-w-md">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-white/10 p-3 rounded-lg">
              <p className="text-white/60 text-sm">Level</p>
              <p className="text-white font-bold text-xl">
                {seatInfo?.level}
              </p>
            </div>
            <div className="bg-white/10 p-3 rounded-lg">
              <p className="text-white/60 text-sm">Row</p>
              <p className="text-white font-bold text-xl">
                {seatInfo?.rowNumber}
              </p>
            </div>
            <div className="bg-white/10 p-3 rounded-lg">
              <p className="text-white/60 text-sm">Seat</p>
              <p className="text-white font-bold text-xl">
                {seatInfo?.columnNumber}
              </p>
            </div>
            <div className="bg-white/10 p-3 rounded-lg">
              <p className="text-white/60 text-sm">Section</p>
              <p className="text-white font-bold text-xl">
                {seatInfo?.zone}
              </p>
            </div>
          </div>

          <div className="relative aspect-[4/3] bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center">
            <Image 
              src="/football.jpg" 
              alt="Stadium view from seat"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <p className="text-white/90 font-medium text-sm">Your Seat View</p>
            </div>
          </div>
        </div>

        <p className="text-white/70 text-sm max-w-md">
          <span className="text-yellow-300">Enjoy the event!</span> Ushers are
          available if you need assistance.
        </p>
      </div>
    </div>
  );
};

export default SeatGuide;
