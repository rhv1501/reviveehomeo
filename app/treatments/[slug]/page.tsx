import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import servicesData from '../../../data/services.json';
import conditionDescriptions from '../../../data/conditionDescriptions.json';
import GoogleReviews from '../../../components/GoogleReviews';
import ContactForm from '../../../components/ContactForm';
import { Metadata } from 'next';

// Define the slugify function
const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')        // Replace spaces with -
    .replace(/[^\w\-]+/g, '')    // Remove all non-word chars
    .replace(/\-\-+/g, '-');      // Replace multiple - with single -
};

// Generate static params for all services
export async function generateStaticParams() {
  return servicesData.services.map((service) => ({
    slug: slugify(service.category),
  }));
}

// Generate metadata dynamically
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData.services.find(s => slugify(s.category) === slug);
  
  if (!service) {
    return { title: 'Treatment Not Found' };
  }

  return {
    title: `${service.category} Treatment | Revivee Homeo Clinic`,
    description: service.description.substring(0, 160),
  };
}

export default async function TreatmentLandingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = servicesData.services.find(s => slugify(s.category) === slug);
  
  if (!service) {
    notFound();
  }

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": `${service.category} Treatment at Revivee Homeo Clinic`,
    "description": service.description,
    "about": {
      "@type": "MedicalTherapy",
      "name": `Homeopathic Treatment for ${service.category}`,
      "description": service.description,
      "provider": {
        "@type": "MedicalClinic",
        "name": "Revivee Homeo Clinic",
        "image": "https://www.revivehomeoclinic.com/assets/logo_1.png",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Chennai",
          "addressRegion": "Tamil Nadu",
          "addressCountry": "IN"
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-sage-50 border-b border-sage-100">
        <div className="absolute inset-0 z-0">
          <Image 
            src={service.image} 
            alt={service.category}
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-sage-50/95 via-sage-50/90 to-sage-50"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <div className="max-w-2xl">
              <span className="inline-block py-1.5 px-3 rounded-full bg-terracotta-100 text-terracotta-800 text-xs font-bold uppercase tracking-widest mb-6">
                Specialized Care
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-sage-900 leading-[1.1] tracking-tight mb-6">
                {service.category}
              </h1>
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-8">
                {service.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#contact" className="btn-premium py-4 px-8 text-center bg-sage-900 text-white hover:bg-sage-800 transition-colors rounded-lg font-bold">
                  Book a Consultation
                </a>
                <a href="#details" className="btn-outline-premium py-4 px-8 text-center bg-white border border-slate-200 hover:bg-slate-50 transition-colors rounded-lg font-bold text-sage-900">
                  Explore Treatment
                </a>
              </div>
            </div>
            
            <div className="relative h-[400px] lg:h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl">
              <Image 
                src={service.image}
                alt={`${service.category} Care`}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Conditions & Benefits */}
      <section id="details" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Conditions */}
            <div>
              <div className="flex items-center gap-4 mb-8 pb-4 border-b border-slate-100">
                <div className="w-12 h-12 rounded-full bg-terracotta-50 flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-terracotta-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-sage-900">Conditions Treated</h2>
              </div>
              <div className="space-y-4">
                {service.conditions.map((condition, idx) => (
                  <details key={idx} className="group bg-slate-50 border border-slate-200 rounded-lg overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex items-center justify-between cursor-pointer p-4 font-bold text-sage-900 list-none focus:outline-none focus:bg-slate-100 transition-colors">
                      <div className="flex items-center">
                        <div className="w-6 h-6 rounded-full bg-sage-200 flex items-center justify-center mr-3 md:mr-4 shrink-0 transition-colors group-hover:bg-terracotta-100">
                          <svg className="w-3 h-3 md:w-3.5 md:h-3.5 text-sage-700 group-hover:text-terracotta-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <h3 className="text-slate-800 text-sm font-bold leading-tight pr-2">{condition}</h3>
                      </div>
                      <span className="transition duration-300 group-open:-rotate-180 text-slate-400 group-hover:text-terracotta-600 shrink-0">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </summary>
                    <div className="px-5 pb-5 pt-3 border-t border-slate-100 text-slate-600 leading-relaxed text-sm md:text-base bg-white">
                      <p className="ml-9 md:ml-10">{conditionDescriptions[condition as keyof typeof conditionDescriptions] || "Comprehensive holistic treatment focused on identifying and addressing the root cause for long-term relief."}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
            
            {/* Benefits */}
            <div>
              <div className="flex items-center gap-4 mb-8 pb-4 border-b border-slate-100">
                <div className="w-12 h-12 rounded-full bg-sage-50 flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-sage-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-sage-900">Key Benefits</h2>
              </div>
              <ul className="space-y-4">
                {service.key_benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-sage-100 flex items-center justify-center mr-4 shrink-0 mt-0.5">
                      <svg className="w-3.5 h-3.5 text-sage-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-slate-700 font-medium leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-sage-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-sage-400 text-xs font-bold uppercase tracking-widest mb-4 block">The Revive Edge</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Why choose us for {service.category}?</h2>
            <p className="text-sage-200 text-lg">
              We go beyond symptom management. Our holistic approach ensures that your body heals from the root, providing sustainable and long-term relief.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-sage-800/50 p-8 rounded-2xl border border-sage-700">
              <div className="w-14 h-14 bg-sage-700 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Root Cause Analysis</h3>
              <p className="text-sage-300">We deeply analyze your physical and emotional history to identify the exact origin of your issues.</p>
            </div>
            
            <div className="bg-sage-800/50 p-8 rounded-2xl border border-sage-700">
              <div className="w-14 h-14 bg-sage-700 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Personalized Treatment</h3>
              <p className="text-sage-300">Every treatment plan is individually tailored. No two patients receive the exact same protocol.</p>
            </div>
            
            <div className="bg-sage-800/50 p-8 rounded-2xl border border-sage-700">
              <div className="w-14 h-14 bg-sage-700 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.956 11.956 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Zero Side Effects</h3>
              <p className="text-sage-300">Our natural homeopathic medicines are highly diluted, safe, and completely free from harmful side effects.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <GoogleReviews />

      {/* Contact Form Section */}
      <section id="contact" className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-terracotta-600 text-xs font-bold uppercase tracking-widest mb-4 block">Take the First Step</span>
            <h2 className="text-3xl md:text-4xl font-bold text-sage-900 mb-6">
              Start Your Healing Journey
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Fill out the form below to schedule your primary consultation for {service.category}. Our team will contact you shortly.
            </p>
          </div>
          
          <div className="relative shadow-xl rounded-2xl overflow-hidden">
            <ContactForm defaultInterest={service.category} />
          </div>
        </div>
      </section>
    </div>
  );
}
