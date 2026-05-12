import React from "react";
import Image from "next/image";
import testimonialsData from "../../data/testimonials.json";
import drSamuelImage from "../../assets/Dr Samuel.png";
import {
  PAGE_KEYWORDS,
  BASE_KEYWORDS,
  generateKeywords,
} from "../../utils/seoUtils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Success Stories & Patient Testimonials | Healing Journeys",
  description:
    "Read real success stories from patients who found lasting relief at Revivee Homeo Clinic. From psoriasis to chronic pain, discover how personalised homeopathic medicine changes lives.",
  keywords: generateKeywords(BASE_KEYWORDS, [
    ...PAGE_KEYWORDS.testimonials,
    "patient reviews homeopathy chennai",
    "successful psoriasis treatment stories",
    "homeopathy pcos results",
  ]),
};

const TestimonialsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Clean Typographic Hero Section */}
      <section className="pt-32 pb-16 md:pt-44 md:pb-24 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in">
          <span className="section-kicker">Voices of Healing</span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-sage-900 leading-[1.1] tracking-tight mb-8">
            Real Stories, <br />
            <span className="text-sage-700">Remarkable Results.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Every patient at Revive has a unique story. Explore the journeys of
            those who chose a natural, individualised path to wellness.
          </p>

          {/* Premium Google Trust Card - Flat and Clean */}
          <div className="pt-12 flex justify-center">
            <div className="inline-flex flex-col md:flex-row items-center gap-6 md:gap-12 bg-slate-50 border border-slate-200 rounded-lg p-6 md:p-8 shadow-sm">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white border border-slate-200 rounded shadow-sm flex items-center justify-center">
                  <svg className="w-8 h-8" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-2xl font-bold text-sage-900 leading-none">4.9/5.0</p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Verified Google Rating</p>
                </div>
              </div>
              <div className="h-12 w-px bg-slate-200 hidden md:block" />
              <a
                href={testimonialsData["Google Profile Link"]}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-premium px-8 py-3 text-sm bg-white"
              >
                Post a Review
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Masonry-style Grid - Clean Cards */}
      <section className="py-14 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {testimonialsData.testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="break-inside-avoid bg-white rounded-xl p-8 border border-slate-200 shadow-sm hover:border-slate-300 transition-colors"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex space-x-1 text-terracotta-500">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>

                <blockquote className="text-slate-700 font-medium leading-relaxed mb-8">
                  "{testimonial.text}"
                </blockquote>

                <div className="flex items-center space-x-4 pt-6 border-t border-slate-100">
                  <div className="w-12 h-12 bg-sage-50 rounded flex items-center justify-center text-sage-700 font-bold text-xl">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-sage-900 leading-none">
                      {testimonial.name}
                    </h4>
                    <p className="text-xs font-semibold text-sage-700 mt-1">
                      {testimonial.condition}
                    </p>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Heritage Quote Section - Clean layout */}
      <section className="py-14 bg-sage-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            <div className="relative">
              <div className="relative aspect-square max-w-sm mx-auto overflow-hidden rounded-xl border border-sage-800 bg-sage-800">
                <Image
                  src={drSamuelImage}
                  alt="Dr. Samuel Hahnemann"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                  className="object-cover object-top opacity-90 mix-blend-luminosity"
                />
              </div>
            </div>

            <div className="space-y-8 text-center lg:text-left">
              <div className="space-y-4">
                <h4 className="text-xs font-bold tracking-[0.2em] text-sage-400 uppercase">
                  A Legacy of Thought
                </h4>
                <blockquote className="text-3xl md:text-5xl font-bold text-white leading-tight">
                  "{testimonialsData.quote.text}"
                </blockquote>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-white">
                  {testimonialsData.quote.author}
                </p>
                <p className="text-xs font-bold text-sage-400 uppercase tracking-widest">
                  {testimonialsData.quote.title}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats Grid - Clean */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              {
                label: "Happy Patients",
                val: testimonialsData.summary.total_patients.toLocaleString() + "+",
                color: "text-sage-900",
              },
              {
                label: "Clinical Success",
                val: testimonialsData.summary.success_rate + "%",
                color: "text-sage-700",
              },
              {
                label: "Trust Rating",
                val: testimonialsData.summary.average_rating,
                color: "text-sage-900",
              },
              {
                label: "Conditions Treated",
                val: testimonialsData.summary.conditions_treated + "+",
                color: "text-sage-700",
              },
            ].map((stat, i) => (
              <div key={i} className="text-center group">
                <div className={`text-5xl font-bold mb-3 ${stat.color}`}>
                  {stat.val}
                </div>
                <div className="text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TestimonialsPage;
