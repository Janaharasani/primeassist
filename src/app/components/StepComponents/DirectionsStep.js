"use client";
import Image from "next/image";

const DirectionsStep = ({ seatInfo }) => {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-white/80 mb-2">
          Enter through{" "}
          <span className="font-semibold text-white">
            Gate {seatInfo?.gate}
          </span>{" "}
          and follow signs to your section.
        </p>
        <p className="text-white/80">
          Take the{" "}
          <span className="font-semibold text-white">
            {seatInfo?.elevator ? "Elevator" : "Stairs"}
          </span>{" "}
          to
          <span className="font-semibold text-white">
            {" "}
            Level {seatInfo?.level}
          </span>
          .
        </p>
      </div>

      <div className="bg-white/10 p-3 rounded-lg">
        <h4 className="font-medium text-indigo-300 mb-2">
          Walking Directions:
        </h4>
        <ol className="text-white/80 list-decimal pl-5 space-y-1">
          <li>Enter through Gate {seatInfo?.gate}</li>
          <li>Turn {seatInfo?.turn || "right"} at the concourse</li>
          <li>Follow signs to Section {seatInfo?.section}</li>
          <li>
            Take {seatInfo?.elevator ? "elevator" : "stairs"} to Level{" "}
            {seatInfo?.level}
          </li>
          <li>Your row ({seatInfo?.row}) will be clearly marked</li>
        </ol>
      </div>

      <div className="mt-2 rounded-lg overflow-hidden h-[200px] relative">
        <Image
          src="/images/stadium-map.jpg"
          alt="Stadium Map"
          fill
          style={{ objectFit: "cover" }}
        />
        <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 text-xs rounded">
          Stadium Map
        </div>
      </div>
    </div>
  );
};

export default DirectionsStep;
