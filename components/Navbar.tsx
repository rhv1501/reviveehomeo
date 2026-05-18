"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Treatments", path: "/treatments" },
    { name: "Online Consultation", path: "/online-consultation" },
    { name: "Testimonials", path: "/testimonials" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  const isActivePath = (path: string) => pathname === path;

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 bg-white ${
        isScrolled ? "border-b border-slate-200 shadow-sm py-3" : "py-5 border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3 group">
            <Image
              src="/assets/logo_1.png"
              alt="Revivee Homeo Clinic Logo"
              width={40}
              height={40}
              className="object-contain"
            />
            <div className="flex flex-col">
              <span className="font-bold text-xl text-sage-900 tracking-tight leading-none group-hover:text-sage-700 transition-colors">
                REVIVEE
              </span>
              <span className="text-[10px] font-bold tracking-widest text-slate-500 leading-none mt-1 uppercase">
                Homeo Clinic
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`text-sm font-medium transition-colors hover:text-sage-700 ${
                    isActivePath(item.path)
                      ? "text-sage-700 font-semibold"
                      : "text-slate-600"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-6 pl-6 border-l border-slate-200">
              <a 
                href="tel:+919677183197" 
                className="flex items-center space-x-2 text-slate-700 hover:text-sage-700 font-semibold transition-colors text-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+91 96771 83197</span>
              </a>
              <Link
                href={pathname === "/online-consultation" ? "#request-form" : "/contact"}
                className="btn-premium py-2 px-5 text-sm"
              >
                {pathname === "/online-consultation" ? "Book Online" : "Book Consultation"}
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-4">
            <Link
              href="/contact"
              className="btn-premium py-2 px-4 text-xs"
            >
              Book
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-600 hover:text-sage-900 transition-colors"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-slate-100 bg-white shadow-lg absolute left-0 w-full px-4 pb-6">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-base font-medium transition-colors ${
                    isActivePath(item.path)
                      ? "text-sage-700"
                      : "text-slate-600"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 mt-2 border-t border-slate-100">
                <a 
                  href="tel:+919677183197" 
                  className="flex items-center space-x-2 text-slate-700 font-semibold py-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+91 96771 83197</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
