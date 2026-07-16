import React from "react";
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

const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
};

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

      {/* Main Grid Section */}
      <section className="py-16 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
             <span className="section-kicker">Clinical Catalog</span>
             <h2 className="section-heading tracking-tight leading-tight mt-2">Expert Homeopathic <br/>Enquiry Hub.</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {servicesData.services.map((service, idx) => (
              <Link 
                key={idx}
                href={`/treatments/${slugify(service.category)}`}
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
                    <span 
                      className="text-terracotta-600 font-bold text-sm hover:text-terracotta-700 bg-terracotta-50 hover:bg-terracotta-100 px-4 py-1.5 rounded-full transition-colors"
                    >
                      View Details
                    </span>
                  </div>
                </div>
              </Link>
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
    </div>
  );
};

export default TreatmentsPage;
