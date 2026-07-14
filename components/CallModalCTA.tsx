"use client";

import React, { useState } from "react";
import contactData from "../data/contact.json";
import { buildQuickCallSubmission, submitLeadToAppsScript } from "../utils/appsScriptSubmission";

interface CallModalCTAProps {
  buttonText?: string;
  buttonClassName?: string;
  children?: React.ReactNode;
}

const CallModalCTA: React.FC<CallModalCTAProps> = ({ 
  buttonText = "Call Now", 
  buttonClassName = "", 
  children 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const phoneLink = `tel:${contactData.clinic_info.phone.primary.replace(/\s+/g, "")}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    setIsSubmitting(true);
    try {
      const record = buildQuickCallSubmission({
        name,
        phone,
        pagePath: typeof window !== "undefined" ? window.location.pathname : "/unknown",
      });
      await submitLeadToAppsScript(record);
    } catch (error) {
      console.error("Error submitting call request:", error);
    } finally {
      setIsSubmitting(false);
      setIsOpen(false);
      // Redirect to the calling app after closing the modal
      window.location.href = phoneLink;
    }
  };

  return (
    <>
      <button 
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(true);
        }}
        className={buttonClassName}
      >
        {children || buttonText}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-md shadow-2xl relative animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="text-center mb-6 mt-2">
              <div className="w-12 h-12 bg-sage-50 rounded-full flex items-center justify-center mx-auto mb-4 text-sage-600">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 font-playfair mb-2">Request a Call</h3>
              <p className="text-sm text-slate-500 font-medium">
                Enter your details and we will connect you to our clinic immediately.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3.5 text-sm text-slate-900 focus:bg-white focus:border-sage-800 focus:ring-1 focus:ring-sage-800 transition-all outline-none"
                  placeholder="e.g. John Doe"
                />
              </div>
              
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                  Phone Number *
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3.5 pr-10 text-sm text-slate-900 focus:bg-white focus:border-sage-800 focus:ring-1 focus:ring-sage-800 transition-all outline-none"
                    placeholder="+91"
                  />
                  {phone.replace(/\D/g, '').length >= 10 && (
                    <svg className="w-4 h-4 text-sage-600 absolute right-4 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !name || phone.replace(/\D/g, '').length < 10}
                className="w-full bg-sage-900 text-white rounded-lg px-4 py-4 text-xs font-bold tracking-widest uppercase hover:bg-sage-800 transition-colors disabled:opacity-50 mt-6 flex items-center justify-center gap-2 group"
              >
                {isSubmitting ? "Connecting..." : "Connect Call"}
                {!isSubmitting && (
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                )}
              </button>
              
              <p className="text-[10px] text-center text-slate-400 mt-4 flex items-center justify-center gap-1.5">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Your information is secure
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CallModalCTA;
