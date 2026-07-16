"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import heroBg from "../../assets/homeopathy_hero_bg.png";

const HomeHero: React.FC = () => {
  return (
    <section className="relative min-h-[100svh] flex items-end bg-slate-900 text-white">
      {/* Full-bleed background image */}
      <Image
        src={heroBg}
        alt="Homeopathic remedies, Revive Homeo Clinic"
        fill
        className="object-cover object-center"
        priority
        quality={90}
      />

      {/* Gradient overlay — heavier at the bottom where text lives */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/20" />

      {/* Content anchored at the bottom */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pb-20 sm:pb-24 pt-24">
        <div className="max-w-2xl space-y-5">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight">
            Personalised Homeopathy for<br />
            <span className="text-sage-300">Acute & Chronic Conditions</span>
          </h1>

          <p className="text-base sm:text-lg text-white/75 leading-relaxed max-w-lg">
            Trusted by 5000+ patients across Chennai for PCOS, skin disorders, allergies, pain management, and holistic healing.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              href="#contact"
              className="btn-premium py-4 text-center w-full sm:w-auto sm:px-10 text-base"
            >
              Book Consultation
            </Link>
            <Link
              href="/treatments"
              className="py-4 text-center w-full sm:w-auto sm:px-10 text-base font-medium text-white border border-white/30 rounded bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
            >
              View Treatments
            </Link>
          </div>
          
          <div className="flex items-center gap-2 pt-2 text-xs font-medium text-sage-200">
             <svg className="w-4 h-4 text-sage-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
             Consultation takes only 20–30 minutes
          </div>

          {/* Trust stats */}
          <div className="flex gap-8 pt-6 border-t border-white/15">
            <div>
              <p className="text-xl font-bold text-white">17+</p>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50 mt-0.5">Years Experience</p>
            </div>
            <div>
              <p className="text-xl font-bold text-white">5,000+</p>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50 mt-0.5">Patients Treated</p>
            </div>
            <div>
              <p className="text-xl font-bold text-white">4.9 ★</p>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50 mt-0.5">Google Rating</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
