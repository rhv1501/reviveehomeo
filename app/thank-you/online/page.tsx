import Link from "next/link";
import Image from "next/image";
import onlineHero from "../../../assets/online_hero.png";

export default function OnlineThankYouPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-24 sm:pt-28 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-4xl border border-sage-100 bg-white shadow-[0_20px_80px_rgba(6,78,59,0.08)]">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-24 left-0 h-72 w-72 rounded-full bg-sage-50 blur-3xl" />
            <div className="absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-cream-50 blur-3xl" />
          </div>

          <div className="relative grid lg:grid-cols-[1fr_0.95fr] items-stretch">
            <div className="p-6 sm:p-8 lg:p-10 xl:p-12 space-y-8 order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 rounded-full border border-sage-100 bg-sage-50 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.28em] text-sage-700">
                Online Consultation Received
              </div>

              <div className="space-y-5 max-w-2xl">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold text-sage-900 leading-tight">
                  Your request is in.
                  <span className="block text-sage-700 italic mt-1">
                    We&apos;ll coordinate your virtual visit.
                  </span>
                </h1>
                <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                  Your online consultation has been saved in the online
                  consultations sheet. We&apos;ll review the preferred time,
                  symptoms, and mode so we can respond clearly.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="site-card bg-sage-50/70 border-sage-100 p-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-sage-700 mb-2">
                    Time captured
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Your preferred date and time are stored for easy review.
                  </p>
                </div>
                <div className="site-card bg-cream-50 border-sage-100 p-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-sage-700 mb-2">
                    Remote care ready
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    We can confirm video, phone, or WhatsApp consultation next.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link
                  href="/online-consultation"
                  className="btn-premium px-8 py-4 text-center"
                >
                  Submit another request
                </Link>
                <a
                  href="tel:+919677183197"
                  className="btn-outline-premium px-8 py-4 text-center"
                >
                  Call clinic now
                </a>
              </div>
            </div>

            <div className="relative min-h-80 lg:min-h-full order-1 lg:order-2 bg-sage-50">
              <Image
                src={onlineHero}
                alt="Online consultation"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-sage-950/70 via-sage-900/10 to-transparent" />
              <div className="absolute inset-0 flex items-end p-6 sm:p-8 lg:p-10">
                <div className="max-w-md rounded-[1.75rem] border border-white/15 bg-white/10 p-5 sm:p-6 backdrop-blur-md text-white shadow-2xl">
                  <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-sage-100 mb-3">
                    Revivee Homeo Clinic
                  </p>
                  <p className="text-2xl sm:text-3xl font-playfair font-bold leading-tight">
                    Calm, clear, and ready for your consultation.
                  </p>
                  <p className="mt-3 text-sm text-sage-100/90 leading-relaxed">
                    Your request is stored in the right lead sheet and ready for
                    the next step.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
