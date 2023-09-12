import Image from "next/image";
import React from "react";

export default function Hero() {
  return (
    <section className="h-screen  bg-hero-rocket h-h-800 bg-cover bg-right flex w-full items-center justify-start ">
      <div className="p-8 flex flex-col gap-2 items-start w-3/4 animate-bounce duration-6000">
        <span className="text-4xl text-white font-bold uppercase bg-black/50 p-2">
          Discover SpaceX Rockets 🚀 and Capsules
        </span>
        <span className="text-4xl text-white font-bold uppercase bg-black/50 p-2">
          Your Gateway to the Future of Space Travel
        </span>
        <span className="text-white text-lg w-3/4">
          Explore the marvels of SpaceX's cutting-edge rockets and capsules.
          <br />
          From the mighty Falcon 9 to the state-of-the-art Crew Dragon, <br />
          embark on a journey through the world of space exploration.
        </span>
      </div>
    </section>
  );
}
