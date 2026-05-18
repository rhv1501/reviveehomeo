"use client";

import React, { useState } from "react";
import contactData from "../data/contact.json";

const FloatingActionButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLocationClick = () => {
    const address = `${contactData.clinic_info.address.street1} ${contactData.clinic_info.address.street}, ${contactData.clinic_info.address.city}, ${contactData.clinic_info.address.state} ${contactData.clinic_info.address.zip}`;
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      address
    )}`;
    window.open(googleMapsUrl, "_blank");
  };

  const handleSocialClick = (url: string) => {
    window.open(url, "_blank");
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const whatsappUrl = `https://wa.me/${contactData.clinic_info.phone.primary.replace(/\D/g, "")}`;

  return (
    <div 
      className="hidden sm:flex fixed bottom-6 right-6 md:bottom-8 md:right-8 z-9999 flex-col items-end space-y-4"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div
        className={`flex flex-col items-end space-y-4 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-10 scale-50 pointer-events-none"
        }`}
      >
        <div className="group flex items-center">
          <span className="mr-3 px-3 py-1.5 bg-white text-sage-800 text-xs font-bold rounded-lg shadow-sm border border-sage-200 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Find Clinic
          </span>
          <button
            onClick={handleLocationClick}
            className="w-12 h-12 bg-white text-sage-700 rounded-2xl shadow-lg border border-sage-200 flex items-center justify-center hover:bg-sage-100 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>

        <div className="group flex items-center">
          <span className="mr-3 px-3 py-1.5 bg-white text-sage-800 text-xs font-bold rounded-lg shadow-sm border border-sage-200 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Call Assistant
          </span>
          <a
            href={`tel:${contactData.clinic_info.phone.primary}`}
            className="w-12 h-12 bg-white text-sage-700 rounded-2xl shadow-lg border border-sage-200 flex items-center justify-center hover:bg-sage-100 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
          </a>
        </div>

        <div className="group flex items-center">
          <span className="mr-3 px-3 py-1.5 bg-white text-sage-800 text-xs font-bold rounded-lg shadow-sm border border-sage-200 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Scroll to Top
          </span>
          <button
            onClick={handleScrollToTop}
            className="w-12 h-12 bg-white text-sage-700 rounded-2xl shadow-lg border border-sage-200 flex items-center justify-center hover:bg-sage-100 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      </div>

      <div className="relative group">
         {!isOpen && (
           <span className="absolute right-16 top-1/2 -translate-y-1/2 px-4 py-2 bg-sage-900 text-white text-xs font-bold rounded-xl shadow-xl whitespace-nowrap hidden sm:block">
             Chat with Us
           </span>
         )}
        <button
          onClick={isOpen ? toggleMenu : () => handleSocialClick(whatsappUrl)}
          className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl md:rounded-3xl shadow-2xl flex items-center justify-center transition-all duration-500 scale-110 hover:scale-125 ${
            isOpen ? "bg-sage-800 rotate-45" : "bg-[#1FA95A] group-hover:shadow-[0_0_20px_rgba(31,169,90,0.45)]"
          } text-white`}
        >
          {isOpen ? (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          ) : (
            <svg className="w-8 h-8 md:w-10 md:h-10" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.309" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default FloatingActionButton;
