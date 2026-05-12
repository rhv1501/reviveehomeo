"use client";

import React, { Suspense } from "react";
import Image from "next/image";
import contactData from "../../data/contact.json";
import ContactForm from "../../components/ContactForm";
import doctorPortrait from "../../assets/Photo.jpg";


const ContactPage = () => {
  const clinicAddress = `${contactData.clinic_info.address.street1} ${contactData.clinic_info.address.street}, ${contactData.clinic_info.address.landmark}, ${contactData.clinic_info.address.city}, ${contactData.clinic_info.address.state} ${contactData.clinic_info.address.zip}`;
  const mapQuery = encodeURIComponent(clinicAddress);
  const mapEmbedUrl = `https://www.google.com/maps?q=${mapQuery}&output=embed`;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. PRIMARY CONTACT GATEWAY (V1 PRIORITY) */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-sage-50">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-150 h-150 bg-terracotta-100/30 rounded-full blur-[120px] -mr-48 -mt-48" />
          <div className="absolute bottom-0 left-0 w-125 h-125 bg-sage-200/40 rounded-full blur-[100px] -ml-24 -mb-24" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 transition-all duration-700 animate-slide-up text-center">
          <div className="space-y-16">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-playfair font-bold text-sage-900 tracking-tight">
                Visit Revivee at{" "}
                <span className="italic text-terracotta-600">
                  Dr Rajivi Towers.
                </span>
              </h1>
              <p className="text-lg text-sage-700 font-medium max-w-2xl mx-auto">
                Share your details below and we&apos;ll guide you to the right
                consultation, the right location, and the right next step.
              </p>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-white/50 blur-2xl rounded-[4rem] -z-10" />
              <Suspense
                fallback={
                  <div className="h-150 bg-white rounded-[3rem] animate-pulse shadow-xl" />
                }
              >
                <ContactForm />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CLINICAL LANDING & TRUST (BELOW FORM) */}
      <section className="py-14 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <div className="space-y-6">
                <h2 className="section-kicker">Clinical Heritage</h2>
                <h3 className="section-heading leading-tight">
                  Expert Care Led by <br />
                  <span className="italic text-terracotta-600">
                    Dr. Nritiya Dave
                  </span>
                </h3>
                <p className="text-lg text-sage-700 leading-relaxed max-w-xl font-medium">
                  For 17+ years, we have been Chennai&apos;s leading
                  evidence-based homeopathic clinic. We don&apos;t just suppress
                  symptoms; we revitalize your body&apos;s vital force.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-8">
                <div className="p-8 rounded-[2.5rem] bg-sage-900 text-white shadow-xl space-y-4">
                  <p className="text-4xl font-bold font-playfair">17+</p>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-sage-600">
                    Years Clinical wisdom
                  </p>
                </div>
                <div className="p-8 rounded-[2.5rem] bg-sage-50 text-sage-900 border border-sage-100 shadow-sm space-y-4">
                  <p className="text-4xl font-bold font-playfair">5k+</p>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-sage-600">
                    Successful Recoveries
                  </p>
                </div>
              </div>
            </div>

            <div className="relative rounded-[4rem] overflow-hidden shadow-2xl border-4 border-white aspect-square bg-sage-50">
              <Image
                src={doctorPortrait}
                alt="Dr. Nritiya Dave"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-linear-to-t from-sage-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 space-y-4">
                <div className="inline-block rounded-full bg-white/20 backdrop-blur-md px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.28em] text-white">
                  Real clinic presence
                </div>
                <h4 className="text-2xl font-playfair font-bold text-white leading-tight">
                  Human-led care with a calm, clean visual style.
                </h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MAP & DIRECT INFO */}
      <section className="py-14 bg-sage-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-12">
            <div className="flex items-center gap-6 group">
              <div className="w-14 h-14 bg-sage-900 rounded-2xl flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform">
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"
                  />
                </svg>
              </div>
              <div className="space-y-0.5 text-center md:text-left">
                <p className="text-[10px] font-bold text-sage-600 uppercase tracking-widest">
                  Call Clinic Directly
                </p>
                <a
                  href={`tel:${contactData.clinic_info.phone.primary}`}
                  className="text-2xl font-bold text-sage-900 uppercase"
                >
                  {contactData.clinic_info.phone.primary}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-6 group">
              <div className="w-14 h-14 bg-sage-900 rounded-2xl flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform">
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                </svg>
              </div>
              <div className="space-y-0.5 text-center md:text-left">
                <p className="text-[10px] font-bold text-sage-600 uppercase tracking-widest">
                  Our Practice Location
                </p>
                <p className="text-xl font-bold text-sage-900 uppercase">
                  {contactData.clinic_info.address.city},{" "}
                  {contactData.clinic_info.address.state}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] items-start">
            <div className="site-card p-8 sm:p-10">
              <p className="section-kicker mb-4">Exact Address</p>
              <h3 className="section-heading mb-6">
                Dr Rajivi Towers, Near Welcome Hotel
              </h3>
              <div className="space-y-4 text-sage-700 leading-relaxed">
                <p>{contactData.clinic_info.address.street1}</p>
                <p>{contactData.clinic_info.address.street}</p>
                <p>{contactData.clinic_info.address.landmark}</p>
                <p>
                  {contactData.clinic_info.address.city},{" "}
                  {contactData.clinic_info.address.state}{" "}
                  {contactData.clinic_info.address.zip}
                </p>
              </div>
              <a
                href={contactData.clinic_info.address.Location}
                target="_blank"
                rel="noreferrer"
                className="btn-premium mt-8 inline-flex justify-center px-8 py-4 text-sm"
              >
                Open Google Maps
              </a>
            </div>

            <div className="relative rounded-[4rem] overflow-hidden shadow-3xl aspect-21/9 border-8 border-white">
              <iframe
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(1) contrast(1.1)" }}
                allowFullScreen={true}
                loading="lazy"
                title="Revivee Homeo Clinic location map"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
