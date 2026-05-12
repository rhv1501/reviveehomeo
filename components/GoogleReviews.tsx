"use client";

import React from "react";

const GoogleReviews: React.FC = () => {
  const reviews = [
    {
      name: "Priya S.",
      text: "Dr. Nritiya is incredibly patient and understanding. My chronic PCOS issues have improved significantly within 3 months of treatment. Highly recommend her clinic!",
      rating: 5,
      time: "2 months ago",
      initial: "P",
      bgColor: "bg-purple-600"
    },
    {
      name: "Rahul M.",
      text: "I was suffering from severe psoriasis for years. Tried everything. The holistic approach here finally gave me relief. The clinic is clean, professional, and the doctor is a true expert.",
      rating: 5,
      time: "5 months ago",
      initial: "R",
      bgColor: "bg-blue-600"
    },
    {
      name: "Anitha V.",
      text: "Brought my 5-year-old for recurrent tonsillitis. The natural medicines worked wonders without any side effects. We haven't needed antibiotics since we started here.",
      rating: 5,
      time: "1 year ago",
      initial: "A",
      bgColor: "bg-green-600"
    }
  ];

  return (
    <section className="py-14 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center space-x-2 mb-4">
              <svg viewBox="0 0 24 24" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <h2 className="text-2xl font-bold text-sage-900 tracking-tight">Google Reviews</h2>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-4xl font-bold text-sage-900">4.9</span>
              <div className="flex flex-col">
                <div className="flex text-terracotta-500">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <svg key={s} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-slate-500 font-medium mt-0.5">Based on 124 reviews</span>
              </div>
            </div>
          </div>
          <div className="mt-6 md:mt-0">
             <a href="#" className="btn-outline-premium inline-flex py-2 px-4 text-sm bg-white">
              Write a Review
            </a>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <div key={i} className="bg-white p-6 rounded border border-slate-200 shadow-sm flex flex-col h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 ${review.bgColor} rounded-full flex items-center justify-center font-bold text-white`}>
                  {review.initial}
                </div>
                <div>
                  <p className="font-bold text-sage-900 text-sm leading-tight">{review.name}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{review.time}</p>
                </div>
                <div className="ml-auto">
                   <svg className="w-5 h-5 text-slate-300" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z" />
                  </svg>
                </div>
              </div>
              <div className="flex text-terracotta-500 mb-3">
                {[...Array(review.rating)].map((_, j) => (
                  <svg key={j} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-700 text-sm leading-relaxed flex-grow">"{review.text}"</p>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <a href="#" className="text-sage-700 font-semibold text-sm hover:text-sage-800 underline decoration-2 underline-offset-4">
            Read all reviews on Google
          </a>
        </div>
      </div>
    </section>
  );
};

export default GoogleReviews;
