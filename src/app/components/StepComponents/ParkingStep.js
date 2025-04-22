// "use client";
// import React from "react";
// import Image from "next/image";
// import { FaCar, FaMapMarkerAlt, FaClock } from "react-icons/fa";

// /**
//  * ParkingStep Component - Displays optimal parking location and information
//  *
//  * @param {Object} props - Component props
//  * @param {Object} props.seatInfo - Information about the user's seat and related details
//  */
// const ParkingStep = ({ seatInfo }) => {
//   // Get parking details from seatInfo
//   const parkingLot = seatInfo?.recommendedParking?.lot || "P3";
//   const parkingSection = seatInfo?.recommendedParking?.section || "Blue";
//   const distance = seatInfo?.recommendedParking?.distance || "250";
//   const walkTime = seatInfo?.recommendedParking?.walkTime || "5";

//   return (
//     <div className="flex flex-col gap-4">
//       <p className="text-white/80 mb-2">
//         We&apos;ve found the optimal parking location for your seat:
//       </p>

//       <div className="bg-white/10 p-3 rounded-lg mb-2">
//         <h4 className="font-medium text-indigo-300 flex items-center">
//           <FaCar className="h-4 w-4 mr-2" />
//           Lot {parkingLot} - {parkingSection} Section
//         </h4>

//         <p className="text-white/70 my-2">
//           <span className="font-medium">How to get there:</span> Follow stadium
//           signs to Lot {parkingLot}. Once there, look for the {parkingSection}{" "}
//           Section markers. We&apos;ve reserved this area as it provides the
//           quickest access to your seating section.
//         </p>

//         <div className="flex items-center gap-4 mt-2">
//           <div>
//             <p className="text-xs text-white/60">Distance to Gate</p>
//             <p className="text-white flex items-center">
//               <FaMapMarkerAlt className="h-3 w-3 mr-1" />
//               {distance}m
//             </p>
//           </div>
//           <div>
//             <p className="text-xs text-white/60">Availability</p>
//             <div className="flex items-center gap-1">
//               {Array.from({ length: 5 }).map((_, i) => (
//                 <div
//                   key={i}
//                   className={`w-2 h-2 rounded-full ${
//                     i < (seatInfo?.recommendedParking?.availability || 3)
//                       ? "bg-green-500"
//                       : "bg-white/20"
//                   }`}
//                 />
//               ))}
//             </div>
//           </div>
//           <div>
//             <p className="text-xs text-white/60">Walking Time</p>
//             <p className="text-white flex items-center">
//               <FaClock className="h-3 w-3 mr-1" />
//               {walkTime} min
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="mt-2 rounded-lg overflow-hidden h-[200px] relative">
//         <Image
//           src="/images/parking-map.jpg"
//           alt="Parking Map"
//           fill
//           style={{ objectFit: "cover" }}
//         />
//         <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 text-xs rounded">
//           Parking Map
//         </div>
//       </div>

//       <p className="text-white/60 text-sm italic mt-1">
//         <span className="text-yellow-300">Tip:</span> Take a photo of your
//         parking location or use the &quot;Save My Spot&quot; feature in the app
//         to help find your car after the event.
//       </p>
//     </div>
//   );
// };

// export default ParkingStep;

export default function ParkingStep({ seatInfo, duration, meta }) {
  const level = seatInfo?.level;
  const zone = seatInfo?.zone;

  return (
    <div className="flex flex-col gap-4">
      {meta?.video && (
        <video
          className="w-full h-48 rounded-lg object-cover"
          autoPlay
          muted
          loop
          src={meta.video}
        />
      )}

      <p className="text-white/80 mb-2">
        Level: <span className="text-green-300 font-medium">{meta?.level}</span>
      </p>

      <p className="text-white/80">
        Based on your seat in zone{" "}
        <span className="text-green-400">{zone}</span> and level{" "}
        <span className="text-green-400">{level}</span>, we recommend Parking
        Lot <span className="text-green-400">B</span> near Gate 3.
      </p>

      <p className="text-white/60 text-sm italic mt-2">
        Estimated walking time from parking to gate: {duration} minutes.
      </p>

      {meta?.arrowDirection && (
        <div className="flex justify-end mt-4">
          <span className="text-sm text-white/40 italic">
            Follow the arrow: {meta.arrowDirection}
          </span>
        </div>
      )}
    </div>
  );
}
