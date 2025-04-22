// "use client";
// import React from "react";

// const TicketValidationStep = ({ ticketDetails }) => {
//   return (
//     <div>
//       <p className="text-white/80">
//         Your ticket for seat {ticketDetails?.zone}, Level {ticketDetails?.level}
//         , Row {ticketDetails?.rowNumber}, Seat {ticketDetails?.columnNumber} is
//         valid! Preparing your custom stadium guide...
//       </p>
//     </div>
//   );
// };

// export default TicketValidationStep;

export default function TicketValidationStep({ ticketDetails, meta }) {
  return (
    <div className="flex flex-col gap-3">
      {meta?.video && (
        <video
          className="w-full h-48 rounded-lg object-cover"
          autoPlay
          muted
          loop
          src={meta.video}
        />
      )}
      <p className="text-white/80">
        Your ticket for seat {ticketDetails?.zone}, Level {ticketDetails?.level}
        , Row {ticketDetails?.rowNumber}, Seat {ticketDetails?.columnNumber} is
        valid! Preparing your custom stadium guide...
      </p>
    </div>
  );
}
