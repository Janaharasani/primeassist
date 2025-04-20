"use client";
import React from "react";

const RouteStep = ({ seatInfo, ticketDetails }) => {
  return (
    <div>
      <p className="text-white/80 mb-2">Recommended route to your seat:</p>
      <div className="bg-white/10 p-3 rounded-lg mb-2">
        <h4 className="font-medium text-indigo-300">
          {seatInfo.bestRoute?.route || "Route 1"}
        </h4>
        <p className="text-white/70">
          {seatInfo.bestRoute?.description || "Through the East Wing"}
        </p>
        <p className="text-white/70 mt-2">
          After entering through {seatInfo.bestGate?.gate || "Gate 1"}, look for
          the &quot;{ticketDetails?.zone}&quot; section signs. Follow the
          {seatInfo.bestRoute?.description.includes("VIP")
            ? " VIP corridor with the red carpet"
            : seatInfo.bestRoute?.description.includes("Main")
            ? " main concourse with food vendors"
            : seatInfo.bestRoute?.description.includes("East")
            ? " east hallway with the team flags"
            : " marked pathway"}{" "}
          to reach your section.
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
            <p className="text-white">{seatInfo.bestRoute?.time || 8} min</p>
          </div>
        </div>
      </div>
      <p className="text-white/60 text-sm italic mt-2">
        <span className="text-yellow-300">Tip:</span> Restrooms and concessions
        are available along this route. The closest restroom is near the section
        entrance.
      </p>
    </div>
  );
};

export default RouteStep;
