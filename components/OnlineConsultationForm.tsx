"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  buildOnlineConsultationSubmission,
  submitLeadToAppsScript,
} from "../utils/appsScriptSubmission";

const consultationOptions = [
  "Initial Online Consultation",
  "Follow-up Video Review",
  "Child Consultation",
  "Women's Health",
  "Skin Condition Review",
  "Chronic Pain Support",
  "General Wellness Check-in",
];

const preferredTimeOptions = [
  "Morning (9:00 AM - 12:00 PM)",
  "Afternoon (12:00 PM - 3:00 PM)",
  "Evening (3:00 PM - 6:00 PM)",
];

const OnlineConsultationForm: React.FC = () => {
  const router = useRouter();
  
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    age: "",
    natureOfProblem: "",
    preferredDate: "",
    preferredTime: "",
    mode: "Video / Phone",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({
    type: null,
    message: "",
  });

  const isStep1Valid = formData.name.trim().length >= 2 && formData.natureOfProblem.trim().length > 0;
  const isStep2Valid = formData.mobile.replace(/\D/g, '').length >= 10 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
  const isStep3Valid = formData.message.trim().length >= 5;

  const handleNext = () => {
    if (currentStep < totalSteps) setCurrentStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (currentStep !== totalSteps || !isStep3Valid) {
       if (currentStep === 1 && isStep1Valid) return handleNext();
       if (currentStep === 2 && isStep2Valid) return handleNext();
       return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const record = buildOnlineConsultationSubmission({
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        age: formData.age,
        natureOfProblem: formData.natureOfProblem,
        preferredDate: formData.preferredDate,
        preferredTime: formData.preferredTime,
        mode: formData.mode,
        message: formData.message,
        pagePath:
          typeof window !== "undefined"
            ? window.location.pathname
            : "/online-consultation",
      });

      await submitLeadToAppsScript(record);

      router.push("/thank-you/online");
    } catch {
      setSubmitStatus({
        type: "error",
        message:
          "We could not send your request right now. Please call us directly or try again in a moment.",
      });
    } finally {
      setIsSubmitting(false);
    }
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
          {["Patient", "Schedule", "Assessment"].map((title, idx) => {
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
                  Patient Details
                </h4>
                <p className="text-sm text-slate-500 font-medium tracking-wide">
                  Who is this online consultation for?
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
                      autoFocus
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
                    Age
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
              
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">
                  Nature of Problem *
                </label>
                <div className="relative">
                  <select
                    name="natureOfProblem"
                    value={formData.natureOfProblem}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-4 py-3.5 pr-10 text-sm text-slate-900 focus:bg-white focus:border-sage-800 focus:ring-1 focus:ring-sage-800 transition-all outline-none appearance-none cursor-pointer"
                  >
                    <option value="">Select nature of problem</option>
                    {consultationOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <svg className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {currentStep === 2 && (
            <div className="animate-fade-in space-y-10">
              <div className="space-y-3">
                <h4 className="text-3xl md:text-4xl font-playfair text-slate-900 leading-tight">
                  Scheduling & Contact
                </h4>
                <p className="text-sm text-slate-500 font-medium tracking-wide">
                  When and how should we connect for the virtual consultation?
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">
                    Mobile Number *
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      autoComplete="tel"
                      inputMode="tel"
                      autoFocus
                      className="w-full bg-slate-50 border border-slate-200 rounded px-4 py-3.5 pr-10 text-sm text-slate-900 focus:bg-white focus:border-sage-800 focus:ring-1 focus:ring-sage-800 transition-all outline-none"
                      placeholder="+91"
                    />
                    {formData.mobile.replace(/\D/g, '').length >= 10 && (
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
                    Email Address *
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

              <div className="grid gap-6 sm:grid-cols-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-4 py-3.5 text-sm text-slate-900 focus:bg-white focus:border-sage-800 focus:ring-1 focus:ring-sage-800 transition-all outline-none cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">
                    Preferred Time
                  </label>
                  <div className="relative">
                    <select
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded px-4 py-3.5 pr-10 text-sm text-slate-900 focus:bg-white focus:border-sage-800 focus:ring-1 focus:ring-sage-800 transition-all outline-none appearance-none cursor-pointer"
                    >
                      <option value="">Select Time</option>
                      {preferredTimeOptions.map((option) => (
                        <option key={option} value={option}>
                          {option.split(" (")[0]}
                        </option>
                      ))}
                    </select>
                    <svg className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">
                    Mode
                  </label>
                  <input
                    type="text"
                    name="mode"
                    value={formData.mode}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-4 py-3.5 text-sm text-slate-900 focus:bg-white focus:border-sage-800 focus:ring-1 focus:ring-sage-800 transition-all outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {currentStep === 3 && (
            <div className="animate-fade-in space-y-10">
              <div className="space-y-3">
                <h4 className="text-3xl md:text-4xl font-playfair text-slate-900 leading-tight">
                  Clinical Assessment
                </h4>
                <p className="text-sm text-slate-500 font-medium tracking-wide">
                  Briefly describe your symptoms to help Dr. Nritiya prepare for your online session.
                </p>
              </div>

              <div>
                <label className="flex justify-between items-end mb-3">
                  <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    Brief History & Concerns *
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
                  autoFocus
                  className="w-full bg-slate-50 border border-slate-200 rounded px-4 py-3.5 text-sm text-slate-900 focus:bg-white focus:border-sage-800 focus:ring-1 focus:ring-sage-800 transition-all outline-none resize-none leading-relaxed"
                  placeholder="Help us understand your health journey better..."
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
              {isSubmitting ? "Processing..." : "Confirm Booking"}
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

export default OnlineConsultationForm;
