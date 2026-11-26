import React from 'react';

const WhyChooseUs: React.FC = () => {
  const reasons = [
    "17+ Years of Experience",
    "5000+ Happy Patients",
    "Personalised Treatment Plans",
    "Natural & Holistic Care",
    "Trusted by Families Across Chennai"
  ];

  return (
    <section className="bg-sage-50 py-10 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          
          <div className="lg:w-1/3 shrink-0">
            <h2 className="text-xl sm:text-2xl font-bold text-sage-900 mb-1">
              Why Choose Revive Homeo Clinic?
            </h2>
            <p className="text-sm text-slate-500 font-medium">
              A legacy of healing you can trust.
            </p>
          </div>

          <div className="lg:w-2/3">
            <div className="flex flex-wrap gap-x-6 gap-y-4">
              {reasons.map((reason, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-sage-200 flex items-center justify-center shrink-0">
                    <svg className="w-3 h-3 text-sage-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-slate-700 font-semibold text-sm sm:text-base">{reason}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
