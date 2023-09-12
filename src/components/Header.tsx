"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaBars, FaCross, FaSearch, FaTimes } from "react-icons/fa";

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const [screenWidth, setScreenWidth] = useState<number>(0);

  const handleMenuOpen = () => {
    setShowMenu(!showMenu);
    !showMenu
      ? document.body.classList.add("fix-scroll-bar")
      : document.body.classList.remove("fix-scroll-bar");
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setScreenWidth(window.innerWidth);

      const handleResize = () => {
        setScreenWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
    document.body.classList.add("dfsdsd");
  }, []);

  return (
    <header className="h-20 w-full shadow-md border-t-4 bg-white border-emerald-950 p-2">
      <nav className="flex flex-row items-center m-auto max-w-6xl justify-between h-full">
        <div className="block">
          <Link href="/">
            <Image
              className="bg-contain h-auto"
              src="/logo.webp"
              alt="spacex Logo"
              width={200}
              height={100}
            />
          </Link>
        </div>
        <ul className="hidden md:flex flex-row text-md gap-8 ml-auto">
          <li className={`cursor-pointer `}>Home</li>
          <li className={`cursor-pointer `}>Capsules</li>
          <li className={`cursor-pointer `}>Data</li>
        </ul>

        {screenWidth < 770 ? (
          <nav
            className={` absolute h-webkit-fill-available w-screen top-20 transition-all duration-500 z-50 ${
              showMenu ? "left-0" : "-left-full"
            }  flex items-center justify-around bg-black text-white`}
          >
            <ul className="flex justify-between items-stretch flex-col gap-12">
              <li className="uppercase font-bold text-4xl">Home</li>
              <li className="uppercase font-bold text-4xl">Capsules</li>
              <li className="uppercase font-bold text-4xl">Data</li>

            </ul>
          </nav>
        ) : null}
        <div className="md:hidden" onClick={handleMenuOpen}>
          {!showMenu ? <FaBars size={25} /> : <FaTimes size={25} />}
        </div>
      </nav>
    </header>
  );
}
