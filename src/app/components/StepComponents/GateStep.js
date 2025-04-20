"use client";
import React from "react";

const GateStep = ({ seatInfo }) => {
  return (
    <div>
      <p className="text-white/80 mb-2">
        We&apos;ve found the optimal entrance gate for your seat:
      </p>
      <div className="bg-white/10 p-3 rounded-lg mb-2">
        <h4 className="font-medium text-indigo-300">
          {seatInfo.bestGate?.gate || "Gate 1"}
        </h4>
        <p className="text-white/70 my-2">
          <span className="font-medium">How to get there:</span> Look for the{" "}
          {seatInfo.bestGate?.gate || "Gate 1"} signage on the{" "}
          {seatInfo.bestGate?.gate === "Gate 1"
            ? "north"
            : seatInfo.bestGate?.gate === "Gate 2"
            ? "east"
            : seatInfo.bestGate?.gate === "Gate 3"
            ? "south"
            : "west"}{" "}
          side of the stadium. Follow the illuminated{" "}
          {seatInfo.bestGate?.gate || "Gate 1"} markers along the outer
          concourse.
        </p>
        <div className="flex items-center gap-4 mt-2">
          <div>
            <p className="text-xs text-white/60">Distance</p>
            <p className="text-white">{seatInfo.bestGate?.distance || 50}m</p>
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
      <p className="text-white/60 text-sm italic mt-2">
        <span className="text-yellow-300">Tip:</span> Gate staff will scan your
        ticket barcode at the entrance. Have your ticket ready to scan.
      </p>
    </div>
  );
};

export default GateStep;
