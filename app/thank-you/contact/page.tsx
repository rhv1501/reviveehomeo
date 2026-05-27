import Link from "next/link";
import Image from "next/image";
import clinicInterior from "../../../assets/clinic_interior.png";

export default function ContactThankYouPage() {
  return (
    <div className="min-h-screen bg-white pt-24 sm:pt-28 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-sage-100 bg-white shadow-[0_20px_80px_rgba(6,78,59,0.08)]">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-sage-50 blur-3xl" />
            <div className="absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-terracotta-50 blur-3xl" />
          </div>

          <div className="relative grid lg:grid-cols-[1.05fr_0.95fr] items-stretch">
            <div className="p-6 sm:p-8 lg:p-10 xl:p-12 space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-sage-100 bg-sage-50 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.28em] text-sage-700">
                Normal Enquiry Received
              </div>

              <div className="space-y-5 max-w-2xl">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold text-sage-900 leading-tight">
                  Thank you.
                  <span className="block text-terracotta-600 italic mt-1">
                    Your enquiry is with us.
                  </span>
                </h1>
                <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                  We&apos;ve received your clinic details and your submission is
                  now in the normal enquiries sheet. Our team will review it and
                  get back to you with the next best step.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="site-card bg-sage-50/70 border-sage-100 p-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-sage-700 mb-2">
                    What happens next
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    We normally review normal enquiries during working hours and
                    contact you with consultation guidance.
                  </p>
                </div>
                <div className="site-card bg-cream-50 border-sage-100 p-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-terracotta-700 mb-2">
                    Need faster help?
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Call the clinic directly if this is urgent or if you need to
                    update your details.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link
                  href="/contact"
                  className="btn-premium px-8 py-4 text-center"
                >
                  Submit another enquiry
                </Link>
                <Link
                  href="/"
                  className="btn-outline-premium px-8 py-4 text-center"
                >
                  Back to home
                </Link>
              </div>
            </div>

            <div className="relative min-h-[320px] lg:min-h-full bg-sage-50">
              <Image
                src={clinicInterior}
                alt="Revivee Homeo Clinic"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-sage-950/75 via-sage-900/10 to-transparent" />
              <div className="absolute inset-0 flex items-end p-6 sm:p-8 lg:p-10">
                <div className="max-w-md rounded-[1.75rem] border border-white/15 bg-white/10 p-5 sm:p-6 backdrop-blur-md text-white shadow-2xl">
                  <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-sage-100 mb-3">
                    Revivee Homeo Clinic
                  </p>
                  <p className="text-2xl sm:text-3xl font-playfair font-bold leading-tight">
                    Clean, thoughtful care. Clear next steps.
                  </p>
                  <p className="mt-3 text-sm text-sage-100/90 leading-relaxed">
                    Your submission is saved in the correct lead sheet and ready
                    for review.
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
