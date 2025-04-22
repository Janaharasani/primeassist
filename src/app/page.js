'use client';

import Image from "next/image";
import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
// import Stadium from "@/app/components/Stadium";
import ClusteringEffect from "@/app/components/ClusteringEffect";
import TicketForm from "@/app/components/TicketForm";
// import Crowd from "./components/Crowd";


export default function Home() {  
  return (
    <div className="">
      <div className="h-[100vh] w-[100vw]">
        <ClusteringEffect />
      </div>
      <div className="absolute top-[250px] left-0 w-full h-full flex items-center justify-center z-20">
        <TicketForm />
      </div>
      <div>
      </div>
      {/* <div className="mt-12 h-[100vh] w-[100vw]">
        <Canvas>
          <Environment preset="studio" />
          <OrbitControls />
          <Stadium />
        </Canvas>
      </div>  */}
      {/* <Crowd/> */}
     
      </div>
   
  );
}




