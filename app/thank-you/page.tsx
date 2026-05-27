import Link from "next/link";

const ThankYouPage = () => {
  return (
    <div className="min-h-screen bg-cream-50/40 pt-28 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-[3rem] border border-sage-100 bg-white shadow-2xl overflow-hidden">
          <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
            <div className="bg-sage-900 px-8 py-10 sm:px-10 sm:py-12 text-white flex flex-col justify-between gap-10">
              <div className="space-y-5">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-sage-300">
                  Thank You
                </p>
                <h1 className="text-4xl sm:text-5xl font-playfair font-bold leading-tight">
                  Your enquiry has been received.
                </h1>
                <p className="text-sage-200 leading-relaxed max-w-md">
                  We will review your details and get back to you with the next
                  step. If you need immediate help, call the clinic directly.
                </p>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur">
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-sage-300 mb-3">
                  Choose your confirmation page
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/thank-you/contact"
                    className="rounded-full bg-white px-5 py-3 text-sm font-bold text-sage-900 text-center"
                  >
                    Normal Enquiry
                  </Link>
                  <Link
                    href="/thank-you/online"
                    className="rounded-full border border-white/20 px-5 py-3 text-sm font-bold text-white text-center"
                  >
                    Online Consultation
                  </Link>
                </div>
              </div>
            </div>

            <div className="px-8 py-10 sm:px-10 sm:py-12 space-y-8">
              <div className="space-y-3">
                <h2 className="section-kicker">Need the next step now?</h2>
                <h3 className="section-heading">Continue to the right page.</h3>
                <p className="text-sage-700 leading-relaxed max-w-xl">
                  Each form now routes to its own thank-you page so your lead is
                  tracked cleanly in the correct sheet.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div className="rounded-[2rem] border border-sage-100 bg-sage-50 p-6 space-y-3">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-sage-600">
                    Normal Enquiry
                  </p>
                  <p className="text-sm text-sage-700 leading-relaxed">
                    Best for clinic visits, follow-ups, and general questions.
                  </p>
                  <Link
                    href="/contact"
                    className="text-sm font-bold text-sage-900 underline underline-offset-4"
                  >
                    Visit normal contact form
                  </Link>
                </div>

                <div className="rounded-[2rem] border border-terracotta-100 bg-terracotta-50 p-6 space-y-3">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-terracotta-700">
                    Online Consultation
                  </p>
                  <p className="text-sm text-terracotta-900/80 leading-relaxed">
                    Best for video or phone consultation requests.
                  </p>
                  <Link
                    href="/online-consultation"
                    className="text-sm font-bold text-terracotta-700 underline underline-offset-4"
                  >
                    Visit online consultation form
                  </Link>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link href="/" className="btn-premium px-8 py-4 text-center">
                  Return home
                </Link>
                <a
                  href="tel:+919677183197"
                  className="btn-outline-premium px-8 py-4 text-center"
                >
                  Call clinic now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
