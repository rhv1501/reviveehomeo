"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import doctorPortrait from "../../assets/Photo.jpg";

const DoctorSpotlight: React.FC = () => {
  return (
    <section className="py-12 md:py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Doctor Portrait */}
          <div className="relative w-full max-w-sm mx-auto md:mx-0 rounded-lg overflow-hidden border border-slate-200 shadow-sm bg-slate-100 flex items-center justify-center">
            <Image
              src={doctorPortrait}
              alt="Dr. Nritiya Dave, Chief Homeopath, Revive Homeo Clinic"
              sizes="(max-width: 768px) 80vw, 40vw"
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Text Content */}
          <div className="space-y-6">
            <div>
              <span className="section-kicker">Meet Your Physician</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-sage-900 leading-tight mt-2">
                Dr. Nritiya Dave
              </h2>
              <p className="text-sm font-semibold uppercase tracking-wider text-slate-500 mt-1">
                BHMS, PG (Hom) UK · Chief Homeopath
              </p>
            </div>

            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                Dr. Nritiya Dave brings 17 years of hands-on clinical experience to every consultation, shaped by a 40-year family legacy of homeopathic practice and sharpened by modern diagnostic thinking. Her approach is equal parts precision and empathy; she takes the time to understand not just the condition, but the person carrying it.
              </p>
              <p>
                Her clinical focus centres on the cases that need homeopathy most: chronic skin conditions, hormonal imbalances, paediatric health, and autoimmune diseases. These are areas where conventional medicine frequently offers management, but rarely resolution.
              </p>
            </div>

            {/* Achievements */}
            <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-100">
              {[
                "Psoriasis & Skin Disorders",
                "PCOS & Hormonal Health",
                "Paediatric Homeopathy",
                "Chronic Pain & Autoimmune",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-sage-500 shrink-0" />
                  {item}
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link href="/about" className="btn-outline-premium py-4 text-center w-full sm:w-auto sm:px-8">
                Know More
              </Link>
              <Link href="/online-consultation" className="btn-premium py-4 text-center w-full sm:w-auto sm:px-8">
                Book Appointment
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default DoctorSpotlight;
