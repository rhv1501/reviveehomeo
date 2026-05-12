import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import OnlineConsultationForm from "../../components/OnlineConsultationForm";
import contactData from "../../data/contact.json";
import onlineHero from "../../assets/online_hero.png";
import lifestyleImg from "../../assets/minimalist_lifestyle.png";
import {
  BASE_KEYWORDS,
  PAGE_DESCRIPTIONS,
  PAGE_KEYWORDS,
  generateKeywords,
} from "../../utils/seoUtils";

export const metadata: Metadata = {
  title: "Online Consultation | Premium Homeopathy From Home",
  description: PAGE_DESCRIPTIONS.onlineConsultation,
  keywords: generateKeywords(BASE_KEYWORDS, [
    ...PAGE_KEYWORDS.onlineConsultation,
    "book online homeopathy appointment",
    "virtual consultation chennai",
    "teleconsult homeopathy",
  ]),
};

const experienceFeatures = [
  {
    title: "Global Expertise",
    desc: "Access specialized homeopathic care regardless of your geographic location.",
    icon: "🌍",
  },
  {
    title: "Vibrant Results",
    desc: "Proven protocols for skin, hormonal, and pediatric wellness.",
    icon: "🌿",
  },
  {
    title: "Personal Connection",
    desc: "In-depth video consultations that value your story and history.",
    icon: "🤝",
  },
];

const processSteps = [
  {
    title: "Secure Your Slot",
    text: "Share your health journey via our encrypted concierge form.",
  },
  {
    title: "Personalized Prep",
    text: "Receive a guide on how to prepare for your specific consultation type.",
  },
  {
    title: "Expert Review",
    text: "Connect via HD Video for a comprehensive personalised analysis.",
  },
  {
    title: "Curated Plan",
    text: "Receive your tailored treatment plan and medicine delivery details.",
  },
];

const OnlineConsultationPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Clean Split Layout */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-6 sm:space-y-8 animate-fade-in">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-sage-900 leading-[1.1] tracking-tight">
                Healing <span className="text-sage-700">Simplified</span>. <br />
                Care <span className="text-slate-500">Unbounded</span>.
              </h1>

              <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                Experience the peak of homeopathic excellence from the comfort
                of your sanctuary. Our virtual concierge bridges the gap between
                traditional wisdom and modern convenience.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="#request-form"
                  className="btn-premium px-8 py-4 text-center"
                >
                  Book Virtual Slot
                </Link>
                <Link
                  href="/about"
                  className="btn-outline-premium px-8 py-4 text-center"
                >
                  The Revive Way
                </Link>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 pt-8 border-t border-slate-100">
                {[
                  { value: "5000+", label: "Happy Patients" },
                  { value: "17+", label: "Years Practice" },
                  { value: "Expert", label: "Case History" },
                ].map((stat) => (
                  <div key={stat.label} className="flex flex-col">
                    <p className="text-2xl font-bold text-sage-900 leading-none mb-1">
                      {stat.value}
                    </p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] rounded-xl overflow-hidden shadow-sm border border-slate-200 animate-fade-in">
              <Image
                src={onlineHero}
                alt="Virtual Online Consultation"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section - Clean Cards */}
      <section className="py-14 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="section-kicker mb-4">The Digital Experience</h2>
            <h3 className="section-heading">
              Why Online Consultation at Revive?
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {experienceFeatures.map((feature, idx) => (
              <div
                key={idx}
                className="p-8 rounded-lg bg-white border border-slate-200 shadow-sm"
              >
                <div className="h-12 w-12 rounded bg-sage-50 flex items-center justify-center text-2xl mb-6">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold text-sage-900 mb-3">
                  {feature.title}
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works - Typographic Timeline */}
      <section className="py-14 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-[400px] lg:h-[600px] rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
              <Image
                src={lifestyleImg}
                alt="Homeopathy Lifestyle"
                fill
                className="object-cover"
              />
            </div>

            <div>
              <h2 className="section-kicker mb-4">The Journey</h2>
              <h3 className="section-heading mb-12">
                From First Inquiry to <br />
                Curated Healing.
              </h3>

              <div className="space-y-10">
                {processSteps.map((step, idx) => (
                  <div key={idx} className="flex gap-6 relative">
                    <div className="flex flex-col items-center">
                      <div className="h-10 w-10 shrink-0 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-sm">
                        0{idx + 1}
                      </div>
                      {idx !== processSteps.length - 1 && (
                        <div className="w-px h-full bg-slate-200 mt-4" />
                      )}
                    </div>
                    <div className="pb-8">
                      <h4 className="text-lg font-bold text-sage-900 mb-2">
                        {step.title}
                      </h4>
                      <p className="text-sm text-slate-600 leading-relaxed max-w-md">
                        {step.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section
        className="py-14 bg-sage-900"
        id="request-form"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-16 items-start">
            <div className="text-white lg:sticky lg:top-32">
              <h2 className="text-xs font-bold uppercase tracking-widest text-sage-400 mb-4">
                Ready to Begin?
              </h2>
              <h3 className="text-4xl md:text-5xl font-bold mt-4 mb-8 leading-tight">
                Your healing <br />
                journey is one <br />
                click away.
              </h3>
              <p className="text-sage-200 text-lg leading-relaxed mb-12 max-w-md">
                Don't let distance define your quality of care. Our virtual
                clinic is open, personal, and dedicated to your personalised
                wellness.
              </p>

              <div className="space-y-8">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-sage-400 mb-1">
                    Fast Track
                  </p>
                  <p className="text-lg font-bold">
                    {contactData.clinic_info.phone.primary}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-sage-400 mb-1">
                    Available Mode
                  </p>
                  <p className="text-lg font-bold">
                    Video / Audio / Home Visit
                  </p>
                </div>
              </div>
            </div>

            <OnlineConsultationForm />
          </div>
        </div>
      </section>

      {/* Quick FAQ */}
      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-kicker mb-4">Concierge Support</h2>
            <h3 className="section-heading">Frequently Asked Questions</h3>
          </div>

          <div className="space-y-6">
            {[
              {
                q: "Is virtual consultation as effective as in-person?",
                a: "Absolutely. Homeopathic case-taking relies heavily on detailed observations and history. Our HD video interface allows for deep connection and thorough analysis, often capturing nuances just as well as an in-clinic visit.",
              },
              {
                q: "How do I receive my medicines?",
                a: "Once your plan is curated, we dispense and ship your personalized remedies directly to your doorstep, globally or locally, ensuring continuity of care.",
              },
              {
                q: "Which mode is best for me?",
                a: "We recommend HD Video for first-time consultations to build rapport. Phone or WhatsApp can be suitable for quick follow-ups. Our concierge will guide you upon booking.",
              },
            ].map((faq, idx) => (
              <div
                key={idx}
                className="p-8 rounded-lg border border-slate-200 bg-white"
              >
                <h4 className="text-lg font-bold text-sage-900 mb-3">
                  {faq.q}
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default OnlineConsultationPage;
