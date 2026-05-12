"use client";

import React from "react";
import Image from "next/image";

interface TreatmentCardProps {
  category: string;
  image: string;
  description: string;
  key_benefits: string[];
  conditions: string[];
  index: number;
}

const TreatmentCard: React.FC<TreatmentCardProps> = ({
  category,
  image,
  description,
  key_benefits,
  conditions,
  index,
}) => {
  const isEven = index % 2 === 0;

  return (
    <div className="group rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col md:flex-row">
      {/* Image Section */}
      <div className={`relative w-full md:w-2/5 lg:w-1/3 min-h-[300px] bg-slate-100 ${isEven ? 'md:order-1' : 'md:order-2 border-l border-slate-200'}`}>
        <Image
          src={image}
          alt={category}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Removed dark gradient. Kept pure image. */}
      </div>

      {/* Content Section */}
      <div className={`p-8 md:p-12 flex flex-col justify-center w-full md:w-3/5 lg:w-2/3 ${isEven ? 'md:order-2 border-l border-slate-200' : 'md:order-1'}`}>
        <h3 className="text-2xl md:text-3xl font-bold text-sage-900 mb-4">{category}</h3>
        <p className="text-slate-600 leading-relaxed mb-8">{description}</p>
        
        <div className="grid sm:grid-cols-2 gap-8">
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-sage-700 mb-4 border-b border-slate-100 pb-2">
              Key Benefits
            </h4>
            <ul className="space-y-3">
              {key_benefits.map((benefit, i) => (
                <li key={i} className="flex items-start">
                  <svg className="w-5 h-5 text-sage-600 mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-slate-600">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-sage-700 mb-4 border-b border-slate-100 pb-2">
              Conditions Treated
            </h4>
            <div className="flex flex-wrap gap-2">
              {conditions.map((condition, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 bg-slate-50 border border-slate-200 text-slate-600 text-xs font-medium rounded"
                >
                  {condition}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreatmentCard;
