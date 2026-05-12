"use client";

import React from "react";
import Link from "next/link";
import TreatmentCard from "../../components/TreatmentCard";
import servicesData from "../../data/services.json";

const TreatmentsPage = () => {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": servicesData.services.map((service, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "item": {
        "@type": "Service",
        "name": service.category,
        "description": service.description,
        "provider": {
          "@type": "MedicalBusiness",
          "name": "Revivee Homeo Clinic"
        }
      }
    }))
  };

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      {/* Clean Treatments Hero */}
      <section className="pt-32 pb-16 md:pt-44 md:pb-24 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-sage-900 leading-[1.1] tracking-tight mb-8">
            Healing for Every <br />
            <span className="text-sage-700">Vital System.</span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 leading-relaxed">
             Comprehensive personalised care designed for profound, long-term healing. 
             Explore our full therapeutic range below.
          </p>
        </div>
      </section>

      {/* Quick Access Grid / Table of Contents */}
      <section className="py-16 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="section-kicker">Quick Access Hub</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {servicesData.services.map((service, idx) => (
              <a
                key={idx}
                href={`#${service.category.replace(/\s+/g, '-').toLowerCase()}`}
                className="px-4 py-4 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 text-center hover:border-sage-300 hover:bg-sage-50 transition-colors"
              >
                {service.category}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Main Treatment Experience - Show All 15 */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-16 md:mb-20">
             <span className="section-kicker">Clinical Catalog</span>
             <h2 className="section-heading tracking-tight leading-tight">Expert Homeopathic <br/>Inquiry Hub.</h2>
          </div>

          {/* All 15 Cards with IDs for Anchoring */}
          <div className="space-y-16 md:space-y-24">
            {servicesData.services.map((service, idx) => (
              <div key={service.category} id={service.category.replace(/\s+/g, '-').toLowerCase()} className="scroll-mt-32">
                <TreatmentCard
                  category={service.category}
                  image={service.image}
                  description={service.description}
                  key_benefits={service.key_benefits}
                  conditions={service.conditions}
                  index={idx}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-14 bg-sage-900 border-t border-slate-100">
         <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
            <span className="text-sage-200 text-xs font-bold uppercase tracking-[0.2em] block">The Revive Philosophy</span>
            <p className="text-3xl md:text-5xl font-bold text-white leading-tight">
               "We look at the tree, but we treat the roots."
            </p>
            <div className="w-16 h-1 bg-sage-500 mx-auto rounded-full" />
            <p className="text-sage-100 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
               Every system in your body is connected. Our treatment areas reflect the specialized experience 
               required to manage chronic, complex, and metabolic concerns.
            </p>
         </div>
      </section>

      {/* Final Conversion Section */}
      <section className="py-14 bg-slate-50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="space-y-8">
               <h3 className="text-3xl md:text-5xl font-bold text-sage-900 tracking-tight leading-tight">
                 Find clarity in <br />
                 <span className="text-sage-700">natural healing.</span>
               </h3>
               <p className="text-lg text-slate-600 leading-relaxed font-medium">
                  Select a category above or book a primary session to let Dr. Dave 
                  personally map your evidence-based treatment.
               </p>
               <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact" className="btn-premium px-10 py-4 text-center">
                    Book Primary Session
                  </Link>
                  <Link href="/online-consultation" className="btn-outline-premium px-10 py-4 text-center bg-white">
                    Start Online Consultation
                  </Link>
               </div>
            </div>
        </div>
      </section>
    </div>
  );
};

export default TreatmentsPage;
