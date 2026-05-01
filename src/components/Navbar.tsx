"use client";

import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full px-24 py-6 flex items-center justify-between border-b border-lime-300/10 bg-transparent backdrop-blur-md z-50 ">
      {/* Logo */}
      <h1 className="text-3xl textStroke tracking-widest">
        Todo<i>&Flow</i>
      </h1>

      {/* Desktop links */}
      <ul className="hidden lg:flex items-center gap-8 text-lg text-zinc-400">
        <li>
          <a
            href="#"
            className="hover:text-lime-300 transition-colors duration-200"
          >
            Home
          </a>
        </li>

        <li>
          <a
            href="#"
            className="hover:text-lime-300 transition-colors duration-200"
          >
            About
          </a>
        </li>

        <li>
          <a
            href="https://github.com/fcodeworks-cell?tab=repositories/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-lime-300 transition-colors duration-200"
          >
            GitHub
          </a>
        </li>
      </ul>

      {/* Desktop badge */}
      <div className="hidden lg:flex items-center gap-2 text-lg text-zinc-500 border border-lime-300/20 px-3 py-1.5 rounded-full">
        <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse" />
        Stay productive
      </div>

      {/* Mobile hamburger */}
      <button
        className="lg:hidden flex flex-col gap-1.5 cursor-pointer"
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="Toggle menu"
      >
        <span
          className={`block h-0.5 w-6 bg-lime-300 transition-all duration-300 ${
            menuOpen ? "rotate-45 translate-y-2" : ""
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-lime-300 transition-all duration-300 ${
            menuOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-lime-300 transition-all duration-300 ${
            menuOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        />
      </button>

      {/* Mobile dropdown */}
      <div
        className={`absolute top-full left-0 w-full bg-black backdrop-blur-md border-b border-lime-300/10 flex flex-col items-center gap-6 text-zinc-400 text-lg lg:hidden z-50
  overflow-hidden transition-all duration-500 ease-in-out
  ${
    menuOpen
      ? "max-h-60 py-8 opacity-100"
      : "max-h-0 py-0 pointer-events-none"
  }`}
      >
        <a
          href="#"
          className="hover:text-lime-300 transition-colors duration-200"
        >
          Home
        </a>

        <a
          href="#"
          className="hover:text-lime-300 transition-colors duration-200"
        >
          About
        </a>

        <a
          href="https://github.com/fcodeworks-cell?tab=repositories/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-lime-300 transition-colors duration-200"
        >
          GitHub
        </a>
      </div>
    </nav>
  );
}
