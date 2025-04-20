"use client";
import { CheckCircle2 } from "lucide-react";

const ConfirmationStep = ({ reservationDetails }) => {
  const formatTime = (timeString) => {
    if (!timeString) return "";
    const options = { hour: "numeric", minute: "numeric", hour12: true };
    return new Date(timeString).toLocaleTimeString("en-US", options);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { weekday: "long", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center mb-2">
        <CheckCircle2 className="text-green-400 mr-2 h-6 w-6" />
        <h3 className="text-white font-medium text-lg">
          Parking Reservation Confirmed!
        </h3>
      </div>

      <div className="bg-white/10 p-4 rounded-lg">
        <h4 className="font-medium text-indigo-300 mb-3">
          Reservation Details
        </h4>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-white/70">Date:</span>
            <span className="text-white font-medium">
              {formatDate(reservationDetails?.date)}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-white/70">Time:</span>
            <span className="text-white font-medium">
              {formatTime(reservationDetails?.time)}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-white/70">Parking Lot:</span>
            <span className="text-white font-medium">
              {reservationDetails?.parkingLot}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-white/70">Section:</span>
            <span className="text-white font-medium">
              {reservationDetails?.section}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-white/70">Vehicle:</span>
            <span className="text-white font-medium">
              {reservationDetails?.vehicle}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-white/70">Confirmation Code:</span>
            <span className="text-white font-medium">
              {reservationDetails?.confirmationCode || "PK-25783"}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-indigo-500/20 p-3 rounded-lg">
        <p className="text-white text-sm">
          Please save your confirmation details. A copy has been sent to your
          email and is available in your account.
        </p>
      </div>
    </div>
  );
};

export default ConfirmationStep;
