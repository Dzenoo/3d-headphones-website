"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const navItems = [
  { id: 1, title: "Overview", href: "#" },
  { id: 2, title: "Features", href: "#" },
  { id: 3, title: "Specs", href: "#" },
  { id: 4, title: "Price", href: "#" },
];

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-6 sm:px-10 py-4">
        <nav className="glass-strong rounded-2xl px-6 py-3 flex justify-between items-center max-w-7xl mx-auto relative">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-accent-light flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <span className="text-white font-semibold text-lg tracking-tight">
              Pulse
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  className="text-white/50 text-sm font-light px-4 py-2 rounded-lg transition-all duration-300 hover:text-white hover:bg-white/5"
                  href={item.href}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <button className="text-white/50 text-sm font-light px-4 py-2 transition hover:text-white">
              Sign in
            </button>
            <button className="py-2 px-6 rounded-xl bg-gradient-to-r from-accent to-accent-light text-white text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-accent/25 hover:scale-105 active:scale-95">
              Buy Now
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden text-white/70 hover:text-white transition"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-20 left-4 right-4 z-50 glass-strong rounded-2xl p-6 lg:hidden"
          >
            <ul className="flex flex-col gap-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Link
                    className="text-white/60 text-base font-light px-4 py-3 rounded-xl block transition hover:text-white hover:bg-white/5"
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-4 border-t border-white/5">
              <button className="w-full py-3 rounded-xl bg-gradient-to-r from-accent to-accent-light text-white text-sm font-medium">
                Buy Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
