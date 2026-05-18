"use client";

import React from "react";
import Link from "next/link";

const BookingGuide = () => {
  const steps = {
    clinic: [
      {
        id: "01",
        title: "Reserve Your Slot",
        desc: "Call or use our priority form to choose a time that fits your schedule.",
      },
      {
        id: "02",
        title: "In-Depth Case Study",
        desc: "Meet Dr. Nritiya Dave for a comprehensive personalised analysis.",
      },
      {
        id: "03",
        title: "Curated Remedies",
        desc: "Receive your personalized treatment plan and dispensed medicines on-site.",
      },
    ],
    online: [
      {
        id: "01",
        title: "Digital Onboarding",
        desc: "Complete our secure health profile to share your history and concerns.",
      },
      {
        id: "02",
        title: "HD Video Connection",
        desc: "Consult virtually from anywhere in the world via our private telehealth portal.",
      },
      {
        id: "03",
        title: "Global Delivery",
        desc: "Your custom medicine kit is prepared and shipped directly to your doorstep.",
      },
    ],
  };

  return (
    <section className="site-section bg-slate-50 border-b border-slate-200" id="booking-guide">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 md:mb-24">
          <span className="section-kicker">Start Your Healing</span>
          <h2 className="section-heading">How to Consult with Revive</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-16 lg:gap-32">
          {/* In Clinic Section */}
          <div className="flex flex-col">
            <div className="mb-10 pb-6 border-b border-slate-200">
              <span className="inline-block px-3 py-1 bg-sage-100 text-sage-800 text-xs font-bold uppercase tracking-widest rounded mb-4">
                In Clinic
              </span>
              <h3 className="text-3xl font-bold text-sage-900">
                Warm, direct consultations.
              </h3>
            </div>

            <div className="space-y-10 flex-grow">
              {steps.clinic.map((step) => (
                <div key={step.id} className="flex gap-6">
                  <span className="text-2xl font-bold text-slate-300">
                    {step.id}
                  </span>
                  <div>
                    <h5 className="text-lg font-bold text-sage-900 mb-2">
                      {step.title}
                    </h5>
                    <p className="text-slate-600 leading-relaxed text-sm">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-12 mt-auto">
              <Link
                href="/contact"
                className="btn-premium block w-full text-center"
              >
                Book In-Clinic Slot
              </Link>
            </div>
          </div>

          {/* Virtual Section */}
          <div className="flex flex-col">
            <div className="mb-10 pb-6 border-b border-slate-200">
              <span className="inline-block px-3 py-1 bg-sage-50 text-sage-800 text-xs font-bold uppercase tracking-widest rounded mb-4">
                Global Access
              </span>
              <h3 className="text-3xl font-bold text-sage-900">
                Online Consultations.
              </h3>
            </div>

            <div className="space-y-10 flex-grow">
              {steps.online.map((step) => (
                <div key={step.id} className="flex gap-6">
                  <span className="text-2xl font-bold text-slate-300">
                    {step.id}
                  </span>
                  <div>
                    <h5 className="text-lg font-bold text-sage-900 mb-2">
                      {step.title}
                    </h5>
                    <p className="text-slate-600 leading-relaxed text-sm">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-12 mt-auto">
              <Link
                href="/online-consultation"
                className="btn-outline-premium block w-full text-center bg-white"
              >
                Start Online Journey
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingGuide;
