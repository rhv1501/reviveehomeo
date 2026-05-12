"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import DoctorCard from "../../components/DoctorCard";
import aboutData from "../../data/about.json";
import heritageBridge from "../../assets/heritage_bridge.png";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Clean Typographic Hero Section */}
      <section className="pt-32 pb-20 md:pt-44 md:pb-28 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-sage-900 leading-[1.1] tracking-tight mb-8">
            Where Heritage <br />
            <span className="text-sage-700">Meets Modern Care.</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
            Since 2007, Revivee Homeo Clinic has been dedicated to restoring health through evidence-based homeopathic treatments. We treat both acute and chronic cases, from a common cold to cancer,
            guided by a clinical lineage that spans over four decades.
          </p>
        </div>
      </section>

      {/* Heritage & Legacy Feature */}
      <section className="py-14 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            <div className="relative animate-fade-in">
              <div className="relative aspect-square rounded-xl overflow-hidden shadow-sm border border-slate-200">
                <Image
                  src={heritageBridge}
                  alt="Traditional and Modern Homeopathy"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-white border border-slate-200 rounded-lg p-8 max-w-xs shadow-sm hidden md:block">
                 <p className="text-4xl font-bold text-sage-900 mb-1">40+</p>
                 <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Years of Healing Legacy</p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="section-kicker">Our Heritage</h2>
                <h3 className="section-heading tracking-tight leading-tight">
                  A Legacy of <br />
                  <span className="text-sage-700">Generational Expertise.</span>
                </h3>
              </div>

              <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                <p>
                  Revivee Homeo Clinic is built on a foundation of generational expertise. 
                  The foundation of our practice was laid by Dr. Nritiya Dave&apos;s father, 
                  a passionate homeopath who has devoted over 40 years to the practice of healing through nature.
                </p>
                <p>
                  Today, we continue this journey by blending time-tested homeopathic principles 
                  with modern health insights to deliver holistic, trustworthy care for every generation.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
                <div>
                  <p className="text-3xl font-bold text-sage-900 mb-1">17+</p>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Years Clinical Exp.</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-sage-900 mb-1">5000+</p>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Happy Patients</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* The Chief Homeopath Spotlight */}
      <DoctorCard
        name={aboutData.team[0].name}
        title={aboutData.team[0].title}
        qualification={aboutData.team[0].qualification}
        bio={aboutData.team[0].bio}
        achievements={aboutData.team[0].achievements}
      />

      {/* Clinical Ethos / Values */}
      <section className="py-14 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="section-kicker mb-4">Our Clinical Ethos</h2>
            <h3 className="section-heading">Principles of <span className="text-sage-700">Sustainable Health.</span></h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {aboutData.values.map((value, idx) => (
              <div 
                key={idx}
                className="p-8 bg-white rounded-lg border border-slate-200 shadow-sm"
              >
                <div className="w-12 h-12 rounded bg-sage-50 flex items-center justify-center text-sage-700 mb-6">
                   {value.icon === "leaf" && (
                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707"/></svg>
                   )}
                   {value.icon === "user-check" && (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                   )}
                   {value.icon === "microscope" && (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/></svg>
                   )}
                   {value.icon === "heart" && (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
                   )}
                </div>
                <h4 className="text-xl font-bold text-sage-900 mb-3">{value.title}</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                   {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Foundational Mission CTA */}
      <section className="py-14 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl bg-sage-800 p-12 md:p-20 text-center">
            <div className="space-y-8 max-w-3xl mx-auto">
               <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
                 Continuing local healing, <br />
                 <span className="text-sage-200">worldwide impact.</span>
               </h3>
               <p className="text-lg text-sage-100 leading-relaxed">
                  Whether you visit us in Purasawalkam or connect from across the globe, 
                  you are joining a legacy that values your health as our highest priority.
               </p>
               <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact" className="btn-premium bg-white text-sage-900 hover:bg-slate-50 hover:border-slate-50 px-12 py-4">
                    Begin Your Health Journey
                  </Link>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
