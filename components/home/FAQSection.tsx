"use client";

import React, { useState } from "react";
import faqsData from "../../data/faqs.json";

const FAQSection: React.FC = () => {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqsData.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  // Function to format FAQ answers with proper line breaks and lists
  const formatFAQAnswer = (answer: string) => {
    let formattedAnswer = answer;
    formattedAnswer = formattedAnswer.replace(/(\d+\))\s+/g, "\n$1 ");
    const parts = formattedAnswer.split("\n").filter((part) => part.trim());

    return (
      <div className="space-y-4">
        {parts.map((part, index) => {
          const trimmedPart = part.trim();

          if (/^\d+\)\s/.test(trimmedPart)) {
            const match = trimmedPart.match(/^(\d+\))\s(.+)/);
            if (match) {
              const [, number, text] = match;
              return (
                <div
                  key={index}
                  className="flex items-start bg-white/50 p-3 rounded-lg border-l-4 border-primary-300"
                >
                  <span className="inline-flex items-center justify-center bg-primary-500 text-white font-bold text-sm w-7 h-7 rounded-full mr-4 shrink-0 shadow-md">
                    {number.replace(")", "")}
                  </span>
                  <span className="flex-1 text-gray-800 leading-relaxed font-medium">
                    {text}
                  </span>
                </div>
              );
            }
          }

          if (trimmedPart.toLowerCase().includes("for example")) {
            return (
              <div
                key={index}
                className="bg-accent-50 border-l-4 border-accent-400 p-4 rounded-r-lg"
              >
                <div className="flex items-start">
                  <span className="text-accent-600 mr-2 mt-0.5">💡</span>
                  <p className="text-gray-800 leading-relaxed italic">
                    {trimmedPart}
                  </p>
                </div>
              </div>
            );
          }

          const sentences = trimmedPart.split(/\.\s+/).filter((s) => s.trim());
          if (sentences.length > 1) {
            return (
              <div key={index} className="space-y-2">
                {sentences.map((sentence, sIndex) => (
                  <p key={sIndex} className="text-gray-800 leading-relaxed">
                    {sentence.trim()}
                    {sIndex < sentences.length - 1
                      ? "."
                      : sentence.endsWith(".")
                      ? ""
                      : "."}
                  </p>
                ))}
              </div>
            );
          }

          return (
            <p key={index} className="text-gray-800 leading-relaxed">
              {trimmedPart}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <section className="py-12 2k:py-32 bg-cream-100/70">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl 2k:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2k:px-16 container-2k">
        <div className="text-center mb-16 2k:mb-24 animate-fade-in">
          <h2 className="text-3xl md:text-4xl 2k:text-5xl font-bold text-sage-900 mb-6 2k:mb-8">
            Frequently Asked Questions
          </h2>
          <p className="text-xl 2k:text-2xl text-sage-700 mb-12 2k:mb-16 leading-relaxed">
            Everything you need to know about homeopathy and our natural
            healing approach
          </p>

          <div className="space-y-4 2k:space-y-6 text-left">
            {faqsData.map((faq, index) => (
              <div
                key={index}
                className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden animate-slide-up border ${
                  expandedFAQ === index
                    ? "border-primary-500"
                    : "border-sage-200 hover:border-primary-300"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className={`w-full px-6 py-6 2k:px-8 2k:py-8 text-left flex items-center justify-between transition-all duration-300 ${
                    expandedFAQ === index
                      ? "bg-primary-600 text-white"
                      : "bg-white hover:bg-primary-50 text-sage-900"
                  }`}
                >
                  <h3 className="text-lg 2k:text-xl font-semibold pr-4 transition-colors duration-300 leading-snug">
                    {faq.question}
                  </h3>
                  <div className="shrink-0">
                    <div
                      className={`p-2 rounded-full transition-all duration-300 ${
                        expandedFAQ === index
                          ? "bg-white/20"
                          : "group-hover:bg-primary-100"
                      }`}
                    >
                      <svg
                        className={`w-5 h-5 2k:w-6 2k:h-6 transform transition-all duration-300 ${
                          expandedFAQ === index
                            ? "rotate-180 text-white"
                            : "text-primary-600"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </button>
                <div
                  className={`transition-all duration-500 overflow-hidden ${
                    expandedFAQ === index
                      ? "max-h-200 opacity-100 pb-6 2k:pb-8"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 2k:px-8 bg-linear-to-br from-primary-50 to-cream-50">
                    <div className="border-t border-primary-200 pt-6 2k:pt-8 pb-2">
                      <div className="relative">
                        <div className="absolute -left-2 top-0 w-1 h-full bg-linear-to-b from-primary-400 to-accent-400 rounded-full"></div>
                        <div className="pl-4 2k:text-lg leading-relaxed">
                          {formatFAQAnswer(faq.answer)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
