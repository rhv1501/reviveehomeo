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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
    <div className="site-card relative overflow-hidden p-6 sm:p-8 md:p-12 lg:p-14">
      <div className="absolute top-0 right-0 flex h-24 w-24 items-center justify-center rounded-bl-4xl bg-sage-50 text-2xl sm:h-32 sm:w-32 sm:text-3xl">
        🌿
      </div>
      <form
        onSubmit={handleSubmit}
        className="relative z-10 space-y-7 sm:space-y-8"
      >
        <div className="space-y-6">
          <h4 className="text-2xl font-playfair font-bold text-sage-900 sm:text-3xl">
            Enquiry Questionnaire
          </h4>
          <p className="max-w-2xl text-base font-semibold tracking-wide text-sage-700">
            Fields marked with (*) are required for effective case analysis.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:gap-8">
          <div className="space-y-2">
            <label className="text-xs font-bold text-sage-600 uppercase tracking-widest ml-1 sm:text-sm">
              Patient Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              autoComplete="name"
              className="w-full px-6 py-4 rounded-2xl bg-cream-50 border border-sage-200 focus:border-terracotta-400 focus:ring-0 transition-all text-sage-900"
              placeholder="e.g. John Doe"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-sage-600 uppercase tracking-widest ml-1 sm:text-sm">
              Contact Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              className="w-full px-6 py-4 rounded-2xl bg-cream-50 border border-sage-200 focus:border-terracotta-400 focus:ring-0 transition-all text-sage-900"
              placeholder="e.g. john@example.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:gap-8">
          <div className="space-y-2">
            <label className="text-xs font-bold text-sage-600 uppercase tracking-widest ml-1 sm:text-sm">
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              autoComplete="tel"
              inputMode="tel"
              className="w-full px-6 py-4 rounded-2xl bg-cream-50 border border-sage-200 focus:border-terracotta-400 focus:ring-0 transition-all text-sage-900"
              placeholder="+91..."
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-sage-600 uppercase tracking-widest ml-1 sm:text-sm">
              Age *
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              inputMode="numeric"
              className="w-full px-6 py-4 rounded-2xl bg-cream-50 border border-sage-200 focus:border-terracotta-400 focus:ring-0 transition-all text-sage-900"
              placeholder="How old are you?"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-sage-600 uppercase tracking-widest ml-1 sm:text-sm">
            Nature of Enquiry / Main Symptoms *
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className="w-full px-6 py-4 rounded-2xl bg-cream-50 border border-sage-200 focus:border-terracotta-400 focus:ring-0 transition-all text-sage-900 resize-none"
            placeholder="Describe your symptoms in detail for better evaluation..."
          ></textarea>
        </div>

        {submitStatus.type && (
          <div
            className={`rounded-2xl p-5 text-center text-sm font-bold animate-fade-in sm:p-6 ${submitStatus.type === "success" ? "bg-sage-100 text-sage-800" : "bg-terracotta-50 text-terracotta-800"}`}
          >
            {submitStatus.message}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full btn-premium py-4 sm:py-5 text-sm sm:text-base font-bold tracking-[0.16em] uppercase disabled:opacity-50"
        >
          {isSubmitting
            ? "Processing Enquiry..."
            : "Confirm My Enquiry Session"}
        </button>
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
