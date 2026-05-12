"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import clinicInterior from "../../assets/clinic_interior.png";

const ThankYouPage = () => {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  const [showColor, setShowColor] = useState(false);

  useEffect(() => {
    // Check if form was submitted
    const isSubmitted = sessionStorage.getItem("formSubmitted");
    
    if (!isSubmitted) {
      router.replace("/");
    } else {
      setAuthorized(true);
      // Logic for automatic color reveal
      const timer = setTimeout(() => setShowColor(true), 1200);
      return () => clearTimeout(timer);
    }
  }, [router]);

  if (!authorized) {
    return (
      <div className="min-h-screen bg-sage-50 flex items-center justify-center">
        <div className="h-12 w-12 border-4 border-sage-200 border-t-sage-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-cream-50/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className={`relative group ${showColor ? 'grayscale-0' : 'grayscale'} transition-all duration-[3000ms] ease-in-out mb-12`}>
          <div className="relative h-[250px] md:h-[400px] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white transform hover:scale-[1.01] transition-transform">
            <Image
              src={clinicInterior}
              alt="Revivee Homeo Clinic"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-sage-900/80 via-sage-900/20 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="h-20 w-20 bg-white/20 backdrop-blur-md rounded-full border border-white/30 flex items-center justify-center mx-auto animate-float">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto text-center space-y-8 animate-slide-up">
          <div className="space-y-4">
            <h2 className="section-kicker">Submission Successful</h2>
            <h1 className="text-4xl md:text-6xl font-playfair font-bold text-sage-900 leading-tight">
              Healing <span className="italic text-terracotta-600">Begins</span> Here.
            </h1>
          </div>

          <div className="p-8 rounded-[2.5rem] bg-white border border-sage-100 shadow-xl space-y-6">
            <p className="text-lg text-sage-700 leading-relaxed">
              Thank you for trusting <strong className="text-sage-900">Revivee Homeo Clinic</strong> with your health journey. 
              We have received your details and our clinical coordinator is already reviewing your case history.
            </p>
            
            <div className="h-px w-20 bg-sage-200 mx-auto" />
            
            <div className="grid sm:grid-cols-2 gap-6 text-left">
              <div className="p-5 rounded-2xl bg-sage-50 border border-sage-100 italic text-sage-700 text-sm">
                "Our coordinator will call you within 2-4 business hours to finalize your consultation time."
              </div>
              <div className="p-5 rounded-2xl bg-terracotta-50 border border-terracotta-100 italic text-terracotta-800 text-sm">
                "For urgent inquiries, please call us directly at +91 967 718 3197"
              </div>
            </div>
          </div>

          <div className="pt-8">
            <Link 
              href="/" 
              className="btn-premium px-10 py-5"
              onClick={() => sessionStorage.removeItem("formSubmitted")}
            >
              Return to Sanctuary
            </Link>
          </div>

          <div className="flex justify-center gap-2 pt-12">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-1.5 w-1.5 rounded-full bg-sage-200" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
