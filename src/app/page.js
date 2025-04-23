'use client';


import React from "react";
import ClusteringEffect from "@/app/components/ClusteringEffect";
import TicketForm from "@/app/components/TicketForm";

export default function Home() {  
  return (
    <div className="relative h-auto w-full">
      {/* Full-screen clustering effect */}
      <div className="fixed inset-0 -z-10 ">
          <ClusteringEffect />
      </div>
      
      {/* Ticket form centered on top of clustering effect */}
      <div className="relative top-auto z-10 h-full flex my-24 items-center justify-center">
        <TicketForm />
      </div>
    </div>
  );
}



