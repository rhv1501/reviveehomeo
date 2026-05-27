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

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
    <div className="relative">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 sm:p-8 md:p-10 lg:p-12 space-y-8"
      >
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-widest text-sage-700">
            Online Consultations
          </h3>
          <h2 className="text-3xl sm:text-4xl font-bold text-sage-900 leading-tight">
            Reserve your slot
          </h2>
          <p className="max-w-2xl text-base text-slate-600">
            Take the first step towards healing. Provide a few details, and our
            team will coordinate a personalized consultation session for you.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="ml-1 text-xs font-bold uppercase tracking-widest text-slate-700">
              Full Name *
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              autoComplete="name"
              placeholder="How shall we address you?"
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sage-900 outline-none transition-all duration-300 focus:border-sage-500 focus:bg-white focus:ring-2 focus:ring-sage-500/20"
            />
          </div>
          <div className="space-y-2">
            <label className="ml-1 text-xs font-bold uppercase tracking-widest text-slate-700">
              Mobile Number *
            </label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
              autoComplete="tel"
              inputMode="tel"
              placeholder="+91 Your mobile number"
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sage-900 outline-none transition-all duration-300 focus:border-sage-500 focus:bg-white focus:ring-2 focus:ring-sage-500/20"
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="ml-1 text-xs font-bold uppercase tracking-widest text-slate-700">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
              placeholder="For appointment details"
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sage-900 outline-none transition-all duration-300 focus:border-sage-500 focus:bg-white focus:ring-2 focus:ring-sage-500/20"
            />
          </div>
          <div className="space-y-2">
            <label className="ml-1 text-xs font-bold uppercase tracking-widest text-slate-700">
              Age
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              inputMode="numeric"
              placeholder="Patient's age"
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sage-900 outline-none transition-all duration-300 focus:border-sage-500 focus:bg-white focus:ring-2 focus:ring-sage-500/20"
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 border-t border-slate-100 pt-6">
          <div className="space-y-2">
            <label className="ml-1 text-xs font-bold uppercase tracking-widest text-slate-700">
              Nature of Problem / Complaints *
            </label>
            <select
              name="natureOfProblem"
              value={formData.natureOfProblem}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sage-900 outline-none transition-all duration-300 focus:border-sage-500 focus:bg-white focus:ring-2 focus:ring-sage-500/20 appearance-none cursor-pointer"
            >
              <option value="">Select nature of problem</option>
              {consultationOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="ml-1 text-xs font-bold uppercase tracking-widest text-slate-700">
              Preferred Time
            </label>
            <select
              name="preferredTime"
              value={formData.preferredTime}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sage-900 outline-none transition-all duration-300 focus:border-sage-500 focus:bg-white focus:ring-2 focus:ring-sage-500/20 appearance-none cursor-pointer"
            >
              <option value="">Select a preferred time</option>
              {preferredTimeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="ml-1 text-xs font-bold uppercase tracking-widest text-slate-700">
              Preferred Date
            </label>
            <input
              type="date"
              name="preferredDate"
              value={formData.preferredDate}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sage-900 outline-none transition-all duration-300 focus:border-sage-500 focus:bg-white focus:ring-2 focus:ring-sage-500/20 cursor-pointer"
            />
          </div>
          <div className="space-y-2">
            <label className="ml-1 text-xs font-bold uppercase tracking-widest text-slate-700">
              Mode of Consult
            </label>
            <input
              name="mode"
              value={formData.mode}
              onChange={handleChange}
              placeholder="e.g., Video, Phone, WhatsApp, In-Person"
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sage-900 outline-none transition-all duration-300 focus:border-sage-500 focus:bg-white focus:ring-2 focus:ring-sage-500/20"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="ml-1 text-xs font-bold uppercase tracking-widest text-slate-700">
            Brief History & Concerns *
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            placeholder="Help us understand your health journey better..."
            className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sage-900 outline-none transition-all duration-300 focus:border-sage-500 focus:bg-white focus:ring-2 focus:ring-sage-500/20"
          />
        </div>

        {submitStatus.type && (
          <div
            className={`rounded-lg p-4 flex items-center gap-3 ${submitStatus.type === "success" ? "bg-sage-50 border border-sage-200 text-sage-800" : "bg-red-50 border border-red-200 text-red-800"}`}
          >
            <span
              className={`h-6 w-6 shrink-0 rounded-full flex items-center justify-center text-white text-xs font-bold ${submitStatus.type === "success" ? "bg-sage-500" : "bg-red-500"}`}
            >
              {submitStatus.type === "success" ? "✓" : "!"}
            </span>
            <p className="text-sm font-semibold">{submitStatus.message}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-premium w-full py-4 text-sm font-bold uppercase tracking-widest disabled:opacity-60"
        >
          {isSubmitting
            ? "Processing Request..."
            : "Confirm Consultation Enquiry"}
        </button>

        <p className="text-center text-xs text-slate-500 font-medium uppercase tracking-widest">
          Secure & Confidential Process
        </p>
      </form>
    </div>
  );
};

export default OnlineConsultationForm;
