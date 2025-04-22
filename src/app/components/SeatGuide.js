// "use client";
// import { useState, useEffect, useRef, useMemo, useCallback } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   FaTicketAlt,
//   FaCar,
//   FaCheckCircle,
//   FaArrowRight,
//   FaWalking,
//   FaParking,
//   FaMapMarkerAlt,
//   FaClock,
// } from "react-icons/fa";

// // Mock data function
// const getSeatInfo = (zone) => {
//   return {
//     zone,
//     recommendedParking: {
//       lot: "P3",
//       section: "Blue",
//       distance: "250m",
//       walkTime: "5min",
//       directions: [
//         { action: "Enter", detail: "Main entrance", icon: "→" },
//         { action: "Turn left", detail: "at first intersection", icon: "↰" },
//         { action: "Continue", detail: "200m to Lot P3", icon: "→" },
//         { action: "Park", detail: "Blue section", icon: "P" },
//       ],
//     },
//     usedFallbackData: true,
//   };
// };

// // Video Player Component
// const VideoPlayer = ({ currentStep }) => {
//   const videoConfig = [
//     null, // Step 0 - no video
//     { src: "/videos/parking-area.mp4", type: "parking" }, // Step 1
//     null, // Step 2
//     null, // Step 3
//     { src: "/videos/crowd-all.mp4", type: "crowd" }, // Step 4
//     null, // Step 5
//   ];

//   const currentVideo = videoConfig[currentStep];
//   if (!currentVideo) return null;

//   return (
//     <div className="mt-4 relative aspect-video bg-black rounded-xl overflow-hidden border border-white/10">
//       <video autoPlay muted loop className="w-full h-full object-cover">
//         <source src={currentVideo.src} type="video/mp4" />
//         Your browser does not support videos
//       </video>
//       <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 text-xs rounded">
//         {currentVideo.type === "parking" ? "Parking Guide" : "Crowd Navigation"}
//       </div>
//     </div>
//   );
// };

// // Fake Stadium Map Component
// const FakeStadiumMap = ({ currentStep }) => {
//   const levels = [
//     { name: "Parking", color: "from-blue-900/30 to-blue-900/10", icon: "🅿️" },
//     {
//       name: "Concourse",
//       color: "from-purple-900/30 to-purple-900/10",
//       icon: "🚪",
//     },
//     { name: "Seating", color: "from-green-900/30 to-green-900/10", icon: "💺" },
//   ];

//   const currentLevel = Math.min(Math.floor(currentStep / 2), 2);

//   return (
//     <div className="relative w-full h-[40vh] min-h-[300px] rounded-xl overflow-hidden">
//       <div
//         className={`absolute inset-0 bg-gradient-to-br ${levels[currentLevel].color} transition-all duration-500`}
//       >
//         <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
//           <span className="text-lg">{levels[currentLevel].icon}</span>
//           Level {currentLevel + 1}: {levels[currentLevel].name}
//         </div>

//         {/* Animated position indicator */}
//         <motion.div
//           className="absolute bottom-8 left-8 w-8 h-8 bg-yellow-400 rounded-full shadow-lg z-10 flex items-center justify-center"
//           animate={{
//             x: [0, 100, 200, 100, 0],
//             y: [0, -30, 0, 30, 0],
//           }}
//           transition={{
//             duration: 8,
//             repeat: Infinity,
//             ease: "easeInOut",
//           }}
//         >
//           <motion.div
//             animate={{
//               scale: [1, 1.2, 1],
//               opacity: [0.8, 1, 0.8],
//             }}
//             transition={{
//               duration: 1.5,
//               repeat: Infinity,
//             }}
//             className="absolute inset-0 border-2 border-yellow-300 rounded-full"
//           />
//           <svg
//             className="w-4 h-4 text-white"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
//             />
//           </svg>
//         </motion.div>

//         {/* Navigation arrows */}
//         {currentStep < 5 && (
//           <motion.div
//             className="absolute top-1/2 right-8 -translate-y-1/2"
//             animate={{
//               x: [0, 10, 0],
//               opacity: [0.8, 1, 0.8],
//             }}
//             transition={{
//               duration: 1.5,
//               repeat: Infinity,
//             }}
//           >
//             <div className="text-yellow-400 text-3xl">→</div>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// };

// // Ticket Validation Step
// const TicketValidationStep = ({ ticketDetails }) => {
//   return (
//     <div className="flex flex-col gap-6 h-full">
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="flex items-center justify-center gap-3 p-4 bg-indigo-900/20 rounded-lg border border-indigo-500/20"
//       >
//         <FaTicketAlt className="text-indigo-300 text-2xl" />
//         <div>
//           <h3 className="font-medium text-white">Ticket Verified</h3>
//           <p className="text-white/70 text-sm">
//             Preparing your personalized guide
//           </p>
//         </div>
//       </motion.div>

//       <div className="grid grid-cols-2 gap-4">
//         {[
//           {
//             label: "SECTION",
//             value: ticketDetails?.zone,
//             icon: <FaMapMarkerAlt />,
//           },
//           {
//             label: "LEVEL",
//             value: ticketDetails?.level,
//             icon: <FaMapMarkerAlt />,
//           },
//           {
//             label: "ROW",
//             value: ticketDetails?.rowNumber,
//             icon: <FaMapMarkerAlt />,
//           },
//           {
//             label: "SEAT",
//             value: ticketDetails?.columnNumber,
//             icon: <FaMapMarkerAlt />,
//           },
//         ].map((item, index) => (
//           <motion.div
//             key={item.label}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 + index * 0.2 }}
//             className="bg-white/5 p-4 rounded-lg border border-white/10"
//           >
//             <div className="flex items-center gap-2 text-indigo-300 mb-1 text-xs font-medium">
//               {item.icon}
//               {item.label}
//             </div>
//             <p className="text-2xl font-bold text-white">{item.value}</p>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// // Parking Step
// const ParkingStep = ({ seatInfo }) => {
//   const parkingData = seatInfo?.recommendedParking;

//   return (
//     <div className="flex flex-col gap-6 h-full">
//       <div className="bg-white/5 p-6 rounded-xl border border-white/10">
//         <div className="flex items-start gap-4">
//           <div className="bg-yellow-500/20 p-3 rounded-lg">
//             <FaCar className="text-yellow-400 text-2xl" />
//           </div>
//           <div>
//             <h3 className="text-xl font-bold text-white">
//               Recommended Parking
//             </h3>
//             <p className="text-white/80 text-lg">
//               Lot {parkingData.lot} - {parkingData.section} Section
//             </p>
//             <div className="flex gap-6 mt-4">
//               <div className="flex items-center gap-2">
//                 <FaMapMarkerAlt className="text-yellow-400" />
//                 <div>
//                   <p className="text-white/60 text-sm">Distance</p>
//                   <p className="text-white font-medium">
//                     {parkingData.distance}
//                   </p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-2">
//                 <FaClock className="text-yellow-400" />
//                 <div>
//                   <p className="text-white/60 text-sm">Walk Time</p>
//                   <p className="text-white font-medium">
//                     {parkingData.walkTime}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="flex-1 bg-white/5 p-6 rounded-xl border border-white/10 overflow-y-auto">
//         <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-3">
//           <FaWalking className="text-yellow-400" />
//           Turn-by-Turn Directions
//         </h4>

//         <div className="space-y-4">
//           {parkingData.directions.map((step, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: index * 0.2 }}
//               className="flex items-start gap-4 p-4 bg-white/10 rounded-lg border border-white/10"
//             >
//               <div className="bg-yellow-500/20 text-yellow-400 w-10 h-10 rounded-full flex items-center justify-center text-lg">
//                 {step.icon === "P" ? <FaParking /> : step.icon}
//               </div>
//               <div className="flex-1">
//                 <p className="text-lg font-medium text-white">
//                   {step.action}{" "}
//                   <span className="text-yellow-400">{step.detail}</span>
//                 </p>
//                 {index === 1 && (
//                   <motion.div
//                     animate={{ x: [0, 5, 0] }}
//                     transition={{ repeat: Infinity, duration: 1.5 }}
//                     className="text-yellow-400 text-sm mt-2 flex items-center gap-2"
//                   >
//                     <FaArrowRight /> Follow the blue markers on the ground
//                   </motion.div>
//                 )}
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// // Progress Bar Component
// const ProgressBar = ({ progress }) => {
//   return (
//     <div className="w-full bg-white/10 rounded-full h-2.5 mb-6">
//       <motion.div
//         className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2.5 rounded-full"
//         initial={{ width: 0 }}
//         animate={{ width: `${progress}%` }}
//         transition={{ duration: 0.5 }}
//       />
//     </div>
//   );
// };

// // Step Header Component
// const StepHeader = ({ stepName, remainingTime }) => {
//   return (
//     <div className="flex justify-between items-center mb-6">
//       <h3 className="text-2xl font-bold text-white">{stepName}</h3>
//       <div className="bg-white/10 px-4 py-2 rounded-full text-sm font-medium">
//         {remainingTime}
//       </div>
//     </div>
//   );
// };

// // Navigation Buttons Component
// const NavigationButtons = ({ onReset, onNext, canProceed }) => {
//   return (
//     <div className="flex justify-between mt-6">
//       <button
//         onClick={onReset}
//         className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition flex-1 mr-4"
//       >
//         Reset Guide
//       </button>
//       {canProceed && (
//         <button
//           onClick={onNext}
//           className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition flex-1"
//         >
//           Next Step
//         </button>
//       )}
//     </div>
//   );
// };

// // Main Component
// const SeatGuide = ({ ticketDetails, onReset }) => {
//   const [currentStep, setCurrentStep] = useState(0);
//   const [progress, setProgress] = useState(0);
//   const [seatInfo, setSeatInfo] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [timer, setTimer] = useState(0);
//   const [isTimerRunning, setIsTimerRunning] = useState(false);
//   const intervalRef = useRef(null);

//   const steps = useMemo(
//     () => [
//       { id: 0, name: "Validating Ticket", duration: 5 },
//       { id: 1, name: "Finding Optimal Parking", duration: 15 },
//       { id: 2, name: "Locating Nearest Gate", duration: 10 },
//       { id: 3, name: "Planning Route to Seat", duration: 20 },
//       { id: 4, name: "Walking to Seat", duration: 25 },
//       { id: 5, name: "Arrived at Seat", duration: 0 },
//     ],
//     []
//   );

//   // Load seat info
//   useEffect(() => {
//     if (ticketDetails?.zone) {
//       const result = getSeatInfo(ticketDetails.zone);
//       setSeatInfo(result);
//       setLoading(false);
//     }
//   }, [ticketDetails]);

//   // Update progress
//   useEffect(() => {
//     setProgress((currentStep / (steps.length - 1)) * 100);
//   }, [currentStep, steps.length]);

//   // Timer logic
//   useEffect(() => {
//     if (currentStep >= steps.length - 1) {
//       clearInterval(intervalRef.current);
//       setIsTimerRunning(false);
//       return;
//     }

//     if (currentStep > 0) {
//       setTimer(0);
//       setIsTimerRunning(true);

//       intervalRef.current = setInterval(() => {
//         setTimer((prev) => {
//           if (prev >= steps[currentStep].duration) {
//             setCurrentStep((prevStep) => prevStep + 1);
//             return 0;
//           }
//           return prev + 1;
//         });
//       }, 1000);
//     }

//     return () => clearInterval(intervalRef.current);
//   }, [currentStep, steps]);

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins.toString().padStart(2, "0")}:${secs
//       .toString()
//       .padStart(2, "0")}`;
//   };

//   const getRemainingTime = () => {
//     if (currentStep >= steps.length - 1) return "00:00";
//     return formatTime(steps[currentStep].duration - timer);
//   };

//   const handleNextStep = () => {
//     if (currentStep < steps.length - 1) {
//       setCurrentStep((prev) => prev + 1);
//     }
//   };

//   const handleReset = () => {
//     clearInterval(intervalRef.current);
//     setIsTimerRunning(false);
//     setCurrentStep(0);
//     setProgress(0);
//     setTimer(0);
//     onReset();
//   };

//   const renderStepContent = () => {
//     switch (currentStep) {
//       case 0:
//         return <TicketValidationStep ticketDetails={ticketDetails} />;
//       case 1:
//         return <ParkingStep seatInfo={seatInfo} />;
//       case 2:
//         return (
//           <div className="text-white p-6 text-center">Gate Step Content</div>
//         );
//       case 3:
//         return (
//           <div className="text-white p-6 text-center">Route Step Content</div>
//         );
//       case 4:
//         return (
//           <div className="text-white p-6 text-center">Walking Step Content</div>
//         );
//       case 5:
//         return (
//           <div className="text-white p-6 text-center">Arrival Step Content</div>
//         );
//       default:
//         return null;
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#000F2B] p-4 md:p-8">
//       <div className="max-w-6xl mx-auto bg-[#000F2B]/50 backdrop-blur-md rounded-3xl border border-white/10 shadow-2xl overflow-hidden h-full">
//         <div className="p-6 md:p-8 h-full flex flex-col">
//           <div className="mb-8">
//             <h2 className="text-3xl font-bold text-white">
//               Stadium Navigation Guide
//             </h2>
//             <p className="text-white/70">Follow the steps to reach your seat</p>

//             {seatInfo?.usedFallbackData && (
//               <div className="mt-4 p-3 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
//                 <p className="text-yellow-300 text-sm">
//                   Note: Using demo data. Real implementation would have precise
//                   seat data.
//                 </p>
//               </div>
//             )}
//           </div>

//           <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8">
//             {/* Visual Guide Column - Takes full width on mobile, half on desktop */}
//             <div className="flex flex-col h-full">
//               <FakeStadiumMap currentStep={currentStep} />
//               <VideoPlayer currentStep={currentStep} />
//             </div>

//             {/* Information Column */}
//             <div className="flex flex-col h-full">
//               <ProgressBar progress={progress} />

//               <motion.div
//                 key={currentStep}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="flex-1 flex flex-col"
//               >
//                 <StepHeader
//                   stepName={steps[currentStep].name}
//                   remainingTime={getRemainingTime()}
//                 />

//                 <div className="flex-1 bg-white/5 rounded-xl border border-white/10 overflow-hidden">
//                   {renderStepContent()}
//                 </div>
//               </motion.div>

//               <NavigationButtons
//                 onReset={handleReset}
//                 onNext={handleNextStep}
//                 canProceed={currentStep < steps.length - 1}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SeatGuide;

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
} from "react-icons/fa";

// Mock data function
const getSeatInfo = (zone) => {
  return {
    zone,
    recommendedParking: {
      lot: "P3",
      section: "Blue",
      distance: "250m",
      walkTime: "5min",
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
};

// Video Player Component
const VideoPlayer = ({ currentStep }) => {
  const videoConfig = [
    { src: "/videos/stadium-entrance.mp4", type: "entrance" }, // Step 0
    { src: "/videos/parking-area.mp4", type: "parking" }, // Step 1
    { src: "/videos/crowd-all.mp4", type: "gate" }, // Step 2
    { src: "/videos/stadium-seating.mp4", type: "route" }, // Step 3
    { src: "/videos/crowd-yolo.mp4", type: "walking" }, // Step 4
    null, // Step 5
  ];

  const currentVideo = videoConfig[currentStep];
  if (!currentVideo) return null;

  return (
    <div className="mt-4 relative aspect-video bg-black rounded-xl overflow-hidden border border-white/10">
      <video
        autoPlay
        muted
        loop
        playsInline
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
const FakeStadiumMap = ({ currentStep }) => {
  const levels = [
    { name: "Entrance", color: "from-gray-900/30 to-gray-900/10", icon: "🏟️" },
    { name: "Parking", color: "from-blue-900/30 to-blue-900/10", icon: "🅿️" },
    { name: "Gate", color: "from-purple-900/30 to-purple-900/10", icon: "🚪" },
    { name: "Route", color: "from-indigo-900/30 to-indigo-900/10", icon: "🛣️" },
    { name: "Seating", color: "from-green-900/30 to-green-900/10", icon: "💺" },
    { name: "Seat", color: "from-yellow-900/30 to-yellow-900/10", icon: "🪑" },
  ];

  const currentLevel = levels[Math.min(currentStep, levels.length - 1)];

  return (
    <div className="relative w-full h-[40vh] min-h-[300px] rounded-xl overflow-hidden">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${currentLevel.color} transition-all duration-500`}
      >
        <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
          <span className="text-lg">{currentLevel.icon}</span>
          {currentLevel.name}
        </div>

        {/* Animated position indicator */}
        <motion.div
          className="absolute bottom-8 left-8 w-8 h-8 bg-yellow-400 rounded-full shadow-lg z-10 flex items-center justify-center"
          animate={{
            x: [0, 100, 200, 100, 0],
            y: [0, -30, 0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
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
        {currentStep < 5 && (
          <motion.div
            className="absolute top-1/2 right-8 -translate-y-1/2"
            animate={{
              x: [0, 10, 0],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          >
            <div className="text-yellow-400 text-3xl">→</div>
          </motion.div>
        )}
      </div>
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

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="bg-white/5 p-6 rounded-xl border border-white/10">
        <div className="flex items-start gap-4">
          <div className="bg-yellow-500/20 p-3 rounded-lg">
            <FaCar className="text-yellow-400 text-2xl" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">
              Recommended Parking
            </h3>
            <p className="text-white/80 text-lg">
              Lot {parkingData.lot} - {parkingData.section} Section
            </p>
            <div className="flex gap-6 mt-4">
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
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-white/5 p-6 rounded-xl border border-white/10 overflow-y-auto">
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
              <div className="bg-yellow-500/20 text-yellow-400 w-10 h-10 rounded-full flex items-center justify-center text-lg">
                {step.icon === "P" ? <FaParking /> : step.icon}
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

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="bg-white/5 p-6 rounded-xl border border-white/10">
        <div className="flex items-start gap-4">
          <div className="bg-indigo-500/20 p-3 rounded-lg">
            <FaRoute className="text-indigo-400 text-2xl" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Optimal Route</h3>
            <p className="text-white/80 text-lg">{routeData.route}</p>
            <div className="flex gap-6 mt-4">
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
                          i < routeData.crowdLevel
                            ? "bg-yellow-500"
                            : "bg-white/20"
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

      <div className="flex-1 bg-white/5 p-6 rounded-xl border border-white/10 overflow-y-auto">
        <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-3">
          <FaArrowRight className="text-indigo-400" />
          Route Instructions
        </h4>

        <div className="space-y-4">
          <div className="p-4 bg-white/10 rounded-lg border border-white/10">
            <p className="text-white">
              After entering through{" "}
              <span className="text-indigo-400">
                Gate {seatInfo.bestGate.gate}
              </span>
              , look for the{" "}
              <span className="text-yellow-400">
                &quot;{ticketDetails?.zone}&quot;
              </span>{" "}
              section signs.
            </p>
          </div>

          <div className="p-4 bg-white/10 rounded-lg border border-white/10">
            <p className="text-white">
              Follow the{" "}
              {routeData.description.includes("VIP") ? (
                <span className="text-indigo-400">
                  VIP corridor with the red carpet
                </span>
              ) : routeData.description.includes("Main") ? (
                <span className="text-indigo-400">
                  main concourse with food vendors
                </span>
              ) : (
                <span className="text-indigo-400">marked pathway</span>
              )}{" "}
              to reach your section.
            </p>
          </div>

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
    <div className="flex flex-col gap-6 h-full">
      <div className="bg-white/5 p-6 rounded-xl border border-white/10">
        <div className="flex items-start gap-4">
          <div className="bg-green-500/20 p-3 rounded-lg">
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

      <div className="flex-1 bg-white/5 p-6 rounded-xl border border-white/10 overflow-y-auto">
        <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-3">
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

// Arrival Step
const ArrivalStep = ({ ticketDetails }) => {
  return (
    <div className="flex flex-col gap-6 h-full items-center justify-center text-center">
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
          Welcome to your seat in Section {ticketDetails?.zone}
        </p>
      </div>

      <div className="bg-white/5 p-6 rounded-xl border border-white/10 w-full max-w-md">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-white/10 p-3 rounded-lg">
            <p className="text-white/60 text-sm">Level</p>
            <p className="text-white font-bold text-xl">
              {ticketDetails?.level}
            </p>
          </div>
          <div className="bg-white/10 p-3 rounded-lg">
            <p className="text-white/60 text-sm">Row</p>
            <p className="text-white font-bold text-xl">
              {ticketDetails?.rowNumber}
            </p>
          </div>
          <div className="bg-white/10 p-3 rounded-lg">
            <p className="text-white/60 text-sm">Seat</p>
            <p className="text-white font-bold text-xl">
              {ticketDetails?.columnNumber}
            </p>
          </div>
          <div className="bg-white/10 p-3 rounded-lg">
            <p className="text-white/60 text-sm">Section</p>
            <p className="text-white font-bold text-xl">
              {ticketDetails?.zone}
            </p>
          </div>
        </div>

        <div className="relative aspect-[4/3] bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center">
          <FaChair className="text-white/20 text-6xl" />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-white/70 text-sm">Seat View</p>
          </div>
        </div>
      </div>

      <p className="text-white/70 text-sm max-w-md">
        <span className="text-yellow-300">Enjoy the event!</span> Ushers are
        available if you need assistance.
      </p>
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
  const intervalRef = useRef(null);

  const steps = useMemo(
    () => [
      { id: 0, name: "Validating Ticket", duration: 5 },
      { id: 1, name: "Finding Optimal Parking", duration: 15 },
      { id: 2, name: "Locating Nearest Gate", duration: 10 },
      { id: 3, name: "Planning Route to Seat", duration: 20 },
      { id: 4, name: "Walking to Seat", duration: 25 },
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
            duration={steps[currentStep].duration}
          />
        );
      case 5:
        return <ArrivalStep ticketDetails={ticketDetails} />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#000F2B] p-4 md:p-8">
      <div className="max-w-6xl mx-auto bg-[#000F2B]/50 backdrop-blur-md rounded-3xl border border-white/10 shadow-2xl overflow-hidden h-full">
        <div className="p-6 md:p-8 h-full flex flex-col">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white">
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

          <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Visual Guide Column */}
            <div className="flex flex-col h-full">
              <FakeStadiumMap currentStep={currentStep} />
              <VideoPlayer currentStep={currentStep} />
            </div>

            {/* Information Column */}
            <div className="flex flex-col h-full">
              <ProgressBar progress={progress} />

              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex-1 flex flex-col"
              >
                <StepHeader
                  stepName={steps[currentStep].name}
                  remainingTime={getRemainingTime()}
                />

                <div className="flex-1 bg-white/5 rounded-xl border border-white/10 overflow-hidden">
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

export default SeatGuide;
