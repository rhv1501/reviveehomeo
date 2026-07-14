"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  buildNormalEnquirySubmission,
  submitLeadToAppsScript,
} from "../utils/appsScriptSubmission";

const ContactFormInner = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    mobile: "",
    age: "",
    gender: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    const interest = searchParams.get("interest");
    if (interest) {
      setFormData((prev) => ({
        ...prev,
        message: `I am interested in exploring ${interest} treatment alternatives and would like to schedule a primary consultation session.`,
      }));
    }
  }, [searchParams]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({
    type: null,
    message: "",
  });

  const isStep1Valid = formData.name.trim().length >= 2 && formData.age.trim().length > 0;
  const isStep2Valid = formData.phone.replace(/\D/g, '').length >= 10 && (!formData.email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email));
  const isStep3Valid = formData.message.trim().length >= 5;

  const handleNext = () => {
    if (currentStep < totalSteps) setCurrentStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Safety check in case enter key bypasses step validation
    if (currentStep !== totalSteps || !isStep3Valid) {
       if (currentStep === 1 && isStep1Valid) return handleNext();
       if (currentStep === 2 && isStep2Valid) return handleNext();
       return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const record = buildNormalEnquirySubmission({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        age: formData.age,
        gender: formData.gender,
        subject: formData.subject || "General Enquiry",
        message: formData.message,
        pagePath:
          typeof window !== "undefined" ? window.location.pathname : "/contact",
      });

      await submitLeadToAppsScript(record);

      router.push("/thank-you/contact");
    } catch {
      setSubmitStatus({
        type: "error",
        message:
          "We could not send your enquiry right now. Please try again or call us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-8 sm:p-10 md:p-14 shadow-sm relative">
      {/* Secure Connection Badge */}
      <div className="absolute top-6 right-6 md:top-8 md:right-8 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-sage-600 bg-sage-50 px-3 py-1.5 rounded-full border border-sage-100">
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        Secure
      </div>

      {/* Named Progress Stepper */}
      <div className="flex items-center justify-between mb-10 md:mb-12 pb-5 border-b border-slate-100 mt-4 md:mt-0">
        <div className="flex items-center gap-3 sm:gap-6">
          {["Basics", "Contact", "Symptoms"].map((title, idx) => {
            const step = idx + 1;
            const isActive = currentStep === step;
            const isCompleted = currentStep > step;
            return (
              <div key={title} className={`flex items-center gap-1.5 transition-all duration-300 ${isActive ? 'text-sage-900' : isCompleted ? 'text-sage-600' : 'text-slate-300'}`}>
                {isCompleted ? (
                  <svg className="w-3.5 h-3.5 hidden sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className="text-[10px] font-bold opacity-60">0{step}</span>
                )}
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  {title}
                </span>
              </div>
            );
          })}
        </div>
        
        {/* Subtle lines shown on desktop only */}
        <div className="hidden md:flex gap-2">
          {[1, 2, 3].map((step) => (
            <div 
              key={step} 
              className={`h-px w-8 transition-colors duration-500 ${step <= currentStep ? 'bg-sage-800' : 'bg-slate-200'}`}
            />
          ))}
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="relative z-10"
      >
        <div className="min-h-[280px]">
          {/* STEP 1 */}
          {currentStep === 1 && (
            <div className="animate-fade-in space-y-10">
              <div className="space-y-3">
                <h4 className="text-3xl md:text-4xl font-playfair text-slate-900 leading-tight">
                  Patient Information
                </h4>
                <p className="text-sm text-slate-500 font-medium tracking-wide">
                  Please provide the details of the individual seeking consultation.
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">
                    Full Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      autoComplete="name"
                      className="w-full bg-slate-50 border border-slate-200 rounded px-4 py-3.5 pr-10 text-sm text-slate-900 focus:bg-white focus:border-sage-800 focus:ring-1 focus:ring-sage-800 transition-all outline-none"
                      placeholder="e.g. John Doe"
                    />
                    {formData.name.trim().length >= 2 && (
                      <svg className="w-4 h-4 text-sage-600 absolute right-4 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">
                    Age *
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      inputMode="numeric"
                      className="w-full bg-slate-50 border border-slate-200 rounded px-4 py-3.5 pr-10 text-sm text-slate-900 focus:bg-white focus:border-sage-800 focus:ring-1 focus:ring-sage-800 transition-all outline-none"
                      placeholder="e.g. 35"
                    />
                    {formData.age.trim().length > 0 && (
                      <svg className="w-4 h-4 text-sage-600 absolute right-4 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {currentStep === 2 && (
            <div className="animate-fade-in space-y-10">
              <div className="space-y-3">
                <h4 className="text-3xl md:text-4xl font-playfair text-slate-900 leading-tight">
                  Contact Details
                </h4>
                <p className="text-sm text-slate-500 font-medium tracking-wide">
                  How should our clinic coordinators reach you to confirm the appointment?
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      autoComplete="tel"
                      inputMode="tel"
                      className="w-full bg-slate-50 border border-slate-200 rounded px-4 py-3.5 pr-10 text-sm text-slate-900 focus:bg-white focus:border-sage-800 focus:ring-1 focus:ring-sage-800 transition-all outline-none"
                      placeholder="+91"
                    />
                    {formData.phone.replace(/\D/g, '').length >= 10 && (
                      <svg className="w-4 h-4 text-sage-600 absolute right-4 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-400 mt-2 flex items-center gap-1.5">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Never shared with third parties.
                  </p>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">
                    Email Address <span className="font-normal opacity-70 normal-case">(Optional)</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="email"
                      className="w-full bg-slate-50 border border-slate-200 rounded px-4 py-3.5 pr-10 text-sm text-slate-900 focus:bg-white focus:border-sage-800 focus:ring-1 focus:ring-sage-800 transition-all outline-none"
                      placeholder="patient@example.com"
                    />
                    {formData.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && (
                      <svg className="w-4 h-4 text-sage-600 absolute right-4 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {currentStep === 3 && (
            <div className="animate-fade-in space-y-8">
              <div className="space-y-3">
                <h4 className="text-3xl md:text-4xl font-playfair text-slate-900 leading-tight">
                  Clinical Assessment
                </h4>
                <p className="text-sm text-slate-500 font-medium tracking-wide">
                  Briefly describe your symptoms to help Dr. Nritiya prepare for your case.
                </p>
              </div>

              <div>
                <label className="flex justify-between items-end mb-3">
                  <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    Nature of Enquiry / Main Symptoms *
                  </span>
                  {formData.message.trim().length >= 5 && (
                    <span className="text-[10px] font-bold text-sage-600 uppercase tracking-widest flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      Valid
                    </span>
                  )}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-slate-50 border border-slate-200 rounded px-4 py-3.5 text-sm text-slate-900 focus:bg-white focus:border-sage-800 focus:ring-1 focus:ring-sage-800 transition-all outline-none resize-none leading-relaxed"
                  placeholder="Please specify duration of symptoms and any past treatments..."
                ></textarea>
              </div>

              <div className="bg-sage-50/80 border border-sage-100 rounded-lg p-4 flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                  <svg className="w-4 h-4 text-sage-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.956 11.956 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h5 className="text-[11px] font-bold text-sage-900 mb-1 uppercase tracking-wider">Patient Confidentiality</h5>
                  <p className="text-xs text-sage-700 leading-relaxed font-medium">
                    Your medical information is encrypted and strictly accessible only to Dr. Nritiya and the core clinical team.
                  </p>
                </div>
              </div>
              
              {submitStatus.type && (
                <div
                  className={`rounded border p-4 text-center text-xs font-bold uppercase tracking-widest animate-fade-in ${submitStatus.type === "success" ? "bg-sage-50 border-sage-200 text-sage-800" : "bg-red-50 border-red-200 text-red-800"}`}
                >
                  {submitStatus.message}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Navigation Controls */}
        <div className="mt-10 flex items-center justify-between pt-8 border-t border-slate-100">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handlePrev}
              className="text-slate-500 font-bold tracking-widest uppercase text-[10px] sm:text-xs hover:text-slate-900 transition-colors py-2 group flex items-center gap-2"
            >
              <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Previous
            </button>
          ) : (
            <div></div> // Spacer
          )}

          {currentStep < totalSteps ? (
            <button
              type="button"
              onClick={handleNext}
              disabled={(currentStep === 1 && !isStep1Valid) || (currentStep === 2 && !isStep2Valid)}
              className="bg-sage-900 text-white rounded px-8 py-3.5 text-[10px] sm:text-xs font-bold tracking-widest uppercase hover:bg-sage-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 group"
            >
              Next Step
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          ) : (
            <button
              id="primaryconv"
              type="submit"
              disabled={isSubmitting || !isStep3Valid}
              className="bg-sage-900 text-white rounded px-8 py-3.5 text-[10px] sm:text-xs font-bold tracking-widest uppercase hover:bg-sage-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 group"
            >
              {isSubmitting ? "Processing..." : "Submit Request"}
              {!isSubmitting && (
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

const ContactForm = () => {
  return (
    <Suspense
      fallback={
        <div className="h-96 w-full animate-pulse bg-sage-50 rounded-[3rem]" />
      }
    >
      <ContactFormInner />
    </Suspense>
  );
};

export default ContactForm;
