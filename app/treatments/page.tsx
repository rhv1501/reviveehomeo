"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import servicesData from "../../data/services.json";

interface Service {
  category: string;
  image: string;
  description: string;
  key_benefits: string[];
  conditions: string[];
}

const TreatmentsPage = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedService]);

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

      {/* Main Grid Section */}
      <section className="py-16 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
             <span className="section-kicker">Clinical Catalog</span>
             <h2 className="section-heading tracking-tight leading-tight mt-2">Expert Homeopathic <br/>Enquiry Hub.</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {servicesData.services.map((service, idx) => (
              <div 
                key={idx}
                onClick={() => setSelectedService(service)}
                className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-slate-100 hover:border-sage-200"
              >
                <div className="relative h-48 w-full overflow-hidden shrink-0">
                  <Image 
                    src={service.image} 
                    alt={service.category} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-sage-900/10 group-hover:bg-sage-900/0 transition-colors duration-500" />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-lg md:text-xl font-bold text-sage-900 mb-2 leading-tight group-hover:text-terracotta-600 transition-colors">
                    {service.category}
                  </h3>
                  <p className="text-slate-500 text-sm line-clamp-2 mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex items-center text-sage-700 font-bold text-sm">
                      <span className="group-hover:mr-2 transition-all">Explore</span>
                      <svg className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                    <Link 
                      href={`/contact?interest=${encodeURIComponent(service.category)}`}
                      onClick={(e) => e.stopPropagation()}
                      className="text-terracotta-600 font-bold text-sm hover:text-terracotta-700 bg-terracotta-50 hover:bg-terracotta-100 px-4 py-1.5 rounded-full transition-colors"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal Overlay */}
      {selectedService && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-12 bg-slate-900/60 backdrop-blur-md animate-fade-in">
          <div 
            className="absolute inset-0 cursor-pointer" 
            onClick={() => setSelectedService(null)} 
          />
          <div className="relative w-full max-w-6xl max-h-[95vh] h-[95vh] sm:h-auto bg-white rounded-3xl shadow-2xl z-10 flex flex-col md:flex-row overflow-y-auto md:overflow-hidden">
            
            {/* Left Image Section */}
            <div className="relative w-full md:w-5/12 lg:w-2/5 h-64 sm:h-80 md:h-auto shrink-0 bg-slate-50 border-b md:border-b-0 md:border-r border-slate-100">
               <Image 
                 src={selectedService.image} 
                 alt={selectedService.category} 
                 fill 
                 className="object-contain p-6 md:p-10" 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent md:hidden pointer-events-none" />
            </div>
            
            {/* Right Content Section */}
            <div className="relative w-full md:w-7/12 lg:w-3/5 flex flex-col h-full overflow-visible md:overflow-y-auto">
              <button 
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 z-20 p-2.5 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="p-8 md:p-12 lg:p-14 flex-grow space-y-10">
                <div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-sage-900 mb-6 leading-[1.1] tracking-tight">{selectedService.category}</h2>
                  <p className="text-slate-600 text-lg md:text-xl leading-relaxed">
                    {selectedService.description}
                  </p>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-10">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-sage-500 mb-6 border-b border-slate-100 pb-4">
                      Conditions Treated
                    </h4>
                    <div className="flex flex-wrap gap-2.5">
                      {selectedService.conditions.map((condition, i) => (
                        <span key={i} className="px-3 py-1.5 bg-slate-50 border border-slate-200 text-slate-700 text-sm font-medium rounded-md">
                          {condition}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-sage-500 mb-6 border-b border-slate-100 pb-4">
                      Key Benefits
                    </h4>
                    <ul className="space-y-4">
                      {selectedService.key_benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-sage-100 flex items-center justify-center mr-3.5 shrink-0 mt-0.5">
                            <svg className="w-3 h-3 text-sage-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-sm md:text-base text-slate-700 leading-snug">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Action Bar (Sticky at bottom on small screens) */}
              <div className="p-8 md:p-12 lg:px-14 lg:py-10 bg-slate-50 border-t border-slate-100 mt-auto flex flex-col sm:flex-row gap-4">
                <Link 
                  href={`/contact?interest=${encodeURIComponent(selectedService.category)}`} 
                  className="btn-premium flex-1 text-center py-4 text-base"
                >
                  Book Clinic Consultation
                </Link>
                <Link 
                  href={`/online-consultation?interest=${encodeURIComponent(selectedService.category)}`} 
                  className="btn-outline-premium flex-1 text-center py-4 bg-white text-base hover:bg-slate-50"
                >
                  Book Online Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

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
    </div>
  );
};

export default TreatmentsPage;
