'use client';

import Image from "next/image";
import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import Stadium from "@/app/components/Stadium";

export default function Home() {  
  return (
    <div className="h-[100vh] w-[100vw]">
      <Canvas>
        <Environment preset="studio" />
        <OrbitControls />
        <Stadium />
      </Canvas>
    </div>
  );
}




