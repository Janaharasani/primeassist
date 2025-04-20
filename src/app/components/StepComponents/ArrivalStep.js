"use client";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const ArrivalStep = ({ ticketDetails }) => {
  return (
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
        You have successfully reached your seat in Section {ticketDetails?.zone}
        , Level {ticketDetails?.level}, Row {ticketDetails?.rowNumber}, Seat{" "}
        {ticketDetails?.columnNumber}. Enjoy the event!
      </p>
    </div>
  );
};

export default ArrivalStep;
