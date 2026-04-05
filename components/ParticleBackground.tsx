"use client";

import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function ParticleBackground() {
  const particlesInit = async (main: any) => {
    await loadFull(main);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      className="absolute inset-0"
      options={{
        background: { color: "#000" },
        particles: {
          number: { value: 80 },
          size: { value: 2 },
          move: { enable: true, speed: 1 },
          links: {
            enable: true,
            color: "#00ffff",
            opacity: 0.3,
          },
        },
      }}
    />
  );
}
