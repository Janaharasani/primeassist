"use client";
import React from "react";

const TicketValidationStep = ({ ticketDetails }) => {
  return (
    <div>
      <p className="text-white/80">
        Your ticket for seat {ticketDetails?.zone}, Level {ticketDetails?.level}
        , Row {ticketDetails?.rowNumber}, Seat {ticketDetails?.columnNumber} is
        valid! Preparing your custom stadium guide...
      </p>
    </div>
  );
};

export default TicketValidationStep;
