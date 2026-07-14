import React from "react";
import HomeHero from "../components/home/HomeHero";
import GoogleReviews from "../components/GoogleReviews";
import dynamic from "next/dynamic";
import homeData from "../data/home.json";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import skinFocus from "../assets/skin_focus.png";
import womensFocus from "../assets/womens_focus.png";
import painFocus from "../assets/pain_focus.png";
import childFocus from "../assets/child_focus.png";
import DoctorSpotlight from "../components/home/DoctorSpotlight";
import ContactForm from "../components/ContactForm";
import BookingGuide from "../components/home/BookingGuide";
import {
  PAGE_KEYWORDS,
  BASE_KEYWORDS,
  generateKeywords,
} from "../utils/seoUtils";

const FAQSection = dynamic(() => import("../components/home/FAQSection"), {
  ssr: true,
  loading: () => (
    <div className="h-96 w-full animate-pulse bg-slate-50 border border-slate-100 my-20" />
  ),
});

export const metadata: Metadata = {
  title: "Revivee Homeo Clinic | Best Homeopathy Clinic in Chennai",
  description:
    "Experience premium, holistic healing at Revivee Homeo Clinic in Purasawalkam, Chennai. Specializing in psoriasis, PCOS, chronic pain, and pediatric care since 2007.",
  keywords: generateKeywords(BASE_KEYWORDS, [
    ...PAGE_KEYWORDS.home,
    "best homeopathy clinic chennai",
    "homeopathic doctor purasawalkam",
    "natural healing psoriasis",
    "pcos treatment homeopathy",
  ]),
};

export default function Home() {
  const highIntentConditions = [
    {
      title: "Skin & Psoriasis",
      keyword: "Specialized Care",
      image: skinFocus,
      link: `/contact?interest=${encodeURIComponent("Skin & Psoriasis")}`,
      desc: "Targeted treatment for Psoriasis, Eczema, and severe Acne.",
    },
    {
      title: "Women's Health",
      keyword: "Hormonal Balance",
      image: womensFocus,
      link: `/contact?interest=${encodeURIComponent("Women's Health & PCOS")}`,
      desc: "Natural management for PCOS, PCOD, and menstrual issues.",
    },
    {
      title: "Pain & Arthritis",
      keyword: "Chronic Pain",
      image: painFocus,
      link: `/contact?interest=${encodeURIComponent("Pain & Arthritis")}`,
      desc: "Long-term relief for Sciatica, Back Pain, and Rheumatoid Arthritis.",
    },
    {
      title: "Child Wellness",
      keyword: "Immunity Boost",
      image: childFocus,
      link: `/contact?interest=${encodeURIComponent("Child Wellness")}`,
      desc: "Gentle care for recurrent allergies, cold, and tonsillitis.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <HomeHero />
      <DoctorSpotlight />

      {/* Primary Contact Form Section */}
      <section className="site-section bg-sage-50 border-b border-slate-100 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-terracotta-100/30 rounded-full blur-[100px] -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-sage-200/40 rounded-full blur-[80px] -ml-24 -mb-24" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <span className="section-kicker">Start Your Journey</span>
            <h2 className="section-heading mb-4">
              Book your primary consultation
            </h2>
            <p className="text-sage-700 font-medium max-w-2xl mx-auto">
              Share your details in the form below and our team will get in touch to schedule your appointment with Dr. Nritiya Dave.
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-4 bg-white/50 blur-2xl rounded-[4rem] -z-10 " id ="contact"/>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Conditions Grid Section - Clean, Image-Top Cards */}
      <section className="site-section bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <span className="section-kicker">Clinical Focus</span>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="max-w-2xl">
                <h2 className="section-heading mb-4">
                  Specialized treatments for complex conditions.
                </h2>
                <p className="section-lead">
                  We focus on cases where conventional medicine often only manages symptoms. Our personalized homeopathic approach treats the root cause for sustainable health.
                </p>
              </div>
              <Link
                href="/treatments"
                className="text-sage-700 font-bold inline-flex items-center hover:text-sage-800 shrink-0"
              >
                View all treatments
                <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {highIntentConditions.map((condition, index) => (
              <Link
                key={index}
                href={condition.link}
                className="group flex flex-col hover:opacity-90 transition-opacity"
              >
                <div className="relative h-64 w-full bg-slate-100 rounded-lg overflow-hidden mb-5">
                  <Image
                    src={condition.image}
                    alt={condition.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-sage-600 mb-2 block">
                    {condition.keyword}
                  </span>
                  <h3 className="text-xl font-bold text-sage-900 mb-2">
                    {condition.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {condition.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <GoogleReviews />

      <BookingGuide />

      {/* Our Healing Philosophy Section - Typographic & Minimal */}
      <section className="py-32 bg-sage-50 border-y border-sage-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-sage-500 mb-8">
            The Revivee Philosophy
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-playfair text-sage-900 leading-[1.2] tracking-tight mb-12">
            We don't just treat the disease. <br className="hidden md:block"/>
            <span className="italic text-terracotta-700">We treat the individual.</span>
          </h2>
          <div className="w-px h-16 bg-sage-300 mx-auto mb-12"></div>
          <p className="text-lg md:text-xl text-sage-700 leading-relaxed max-w-2xl mx-auto font-medium">
            Symptoms are your body's way of communicating an imbalance. By understanding your unique physical, mental, and emotional constitution, our classical homeopathic approach stimulates your inherent vital force for true, lasting healing.
          </p>
        </div>
      </section>

      {/* The Revive Edge & Leadership - Spacious Grid */}
      <section className="site-section bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <span className="section-kicker">The Revive Edge</span>
            <h2 className="section-heading">
              Clinical excellence with empathetic care.
            </h2>
          </div>

          {/* Changed from 4 columns to 3 columns max for much more breathing room */}
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3 mb-32">
            {homeData.features.map((feature, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-lg"
              >
                <div className="w-16 h-16 rounded-full bg-white border border-slate-200 text-sage-700 flex items-center justify-center mb-6 shadow-sm">
                  {feature.icon === "leaf" && (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707" />
                    </svg>
                  )}
                  {feature.icon === "user" && (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  )}
                  {feature.icon === "heart" && (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  )}
                  {feature.icon === "award" && (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  )}
                </div>
                <h3 className="text-xl font-bold text-sage-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-base text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <div className="py-16 md:py-14 px-6 md:px-16 lg:px-24 bg-sage-900 rounded-lg text-center">
            <p className="text-sage-400 text-xs font-bold uppercase tracking-widest mb-8">From the Doctor's Desk</p>
            <blockquote className="text-2xl md:text-3xl lg:text-4xl text-white font-medium leading-relaxed max-w-4xl mx-auto mb-10">
              "Our goal is not just to suppress disease, but to revitalize the body's inherent vital force so that it can heal itself."
            </blockquote>
            <div className="w-12 h-px bg-sage-600 mx-auto mb-8" />
            <p className="font-bold text-white text-base">Dr. Nritiya Dave</p>
            <p className="text-sage-400 text-sm mb-10">BHMS, PG (Hom) UK | Chief Homeopath</p>
            <Link href="/about" className="btn-premium bg-white text-sage-900 hover:bg-slate-50 hover:border-slate-50 px-8 py-3 inline-block">
              Read Our Story
            </Link>
          </div>
        </div>
      </section>

      <FAQSection />
    </div>
  );
}
