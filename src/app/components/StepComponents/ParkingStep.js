"use client";
import React from "react";
import Image from "next/image";

const ParkingStep = ({ parkingDetails }) => {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-white/80 mb-2">
          Park your car in{" "}
          <span className="font-semibold text-white">
            Lot {parkingDetails?.lot}
          </span>
          . This is the closest parking area to your seat.
        </p>
        <p className="text-white/80">
          Follow signs for{" "}
          <span className="font-semibold text-white">
            Section {parkingDetails?.section}
          </span>
          .
        </p>
      </div>

      <div className="mt-2 rounded-lg overflow-hidden h-[200px] relative">
        <Image
          src="/images/parking-map.jpg"
          alt="Parking Map"
          fill
          style={{ objectFit: "cover" }}
        />
        <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 text-xs rounded">
          Parking Map
        </div>
      </div>
    </div>
  );
};

export default ParkingStep;
