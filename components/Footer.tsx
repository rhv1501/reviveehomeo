import React from "react";
import Link from "next/link";
import Image from "next/image";
import contactData from "../data/contact.json";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Our Story", path: "/about" },
    { name: "Treatments", path: "/treatments" },
    { name: "Online Consultation", path: "/online-consultation" },
    { name: "Testimonials", path: "/testimonials" },
    { name: "Health Blog", path: "/blog" },
    { name: "Get in Touch", path: "/contact" },
  ];

  const focusAreas = [
    { name: "Psoriasis & Skin Care", path: "/treatments" },
    { name: "PCOS & Women's Health", path: "/treatments" },
    { name: "Chronic Pain Management", path: "/treatments" },
    { name: "Pediatric Homeopathy", path: "/treatments" },
    { name: "Allergic Rhinitis", path: "/treatments" },
    { name: "Thyroid Disorders", path: "/treatments" },
  ];

  return (
    <footer className="bg-sage-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 relative z-10">
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center p-1 shadow-lg border border-sage-100">
                <Image
                  src="/assets/logo_1.png"
                  alt="Revive Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <span className="font-playfair font-bold text-2xl tracking-tight text-white">
                REVIVEE
              </span>
            </Link>
            <p className="text-sage-200/90 text-base leading-relaxed max-w-xs">
              Natural healing through advanced personalised homeopathic medicine.
              Treating both acute and chronic cases (from a common cold to cancer) since
              2007.
            </p>
            <div className="flex space-x-4">
              <a
                href={contactData.clinic_info.social_media.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Visit our Facebook page"
                className="w-10 h-10 rounded-full bg-sage-800 border border-sage-700 flex items-center justify-center hover:bg-terracotta-500 transition-colors"
              >
                <span className="sr-only">Facebook</span>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href={contactData.clinic_info.social_media.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Visit our Instagram page"
                className="w-10 h-10 rounded-full bg-sage-800 border border-sage-700 flex items-center justify-center hover:bg-terracotta-500 transition-colors"
              >
                <span className="sr-only">Instagram</span>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href={contactData.clinic_info.social_media.youtube}
                target="_blank"
                rel="noreferrer"
                aria-label="Visit our YouTube channel"
                className="w-10 h-10 rounded-full bg-sage-800 border border-sage-700 flex items-center justify-center hover:bg-terracotta-500 transition-colors"
              >
                <span className="sr-only">YouTube</span>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.4 3.5 12 3.5 12 3.5s-7.4 0-9.4.6A3 3 0 0 0 .5 6.2 31.2 31.2 0 0 0 0 12a31.2 31.2 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c2 .6 9.4.6 9.4.6s7.4 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.2 31.2 0 0 0 24 12a31.2 31.2 0 0 0-.5-5.8zM9.6 15.5v-7L16 12l-6.4 3.5z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-playfair font-bold text-lg mb-6 text-white tracking-wide">
              Explore
            </h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className="text-sage-200/90 hover:text-cream-50 transition-colors text-sm font-medium"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-playfair font-bold text-lg mb-6 text-white tracking-wide">
              Our Expertise
            </h4>
            <ul className="space-y-4">
              {focusAreas.map((area) => (
                <li key={area.name}>
                  <Link
                    href={area.path}
                    className="text-sage-200/90 hover:text-cream-50 transition-colors text-sm font-medium"
                  >
                    {area.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-playfair font-bold text-lg mb-6 text-white tracking-wide">
              Visit Us
            </h4>
            <div className="space-y-6">
              <div className="space-y-1">
                <p className="text-xs font-bold uppercase tracking-widest text-terracotta-600">
                  Location
                </p>
                <p className="text-sage-100 text-sm leading-relaxed">
                  {contactData.clinic_info.address.street1}{" "}
                  {contactData.clinic_info.address.street}
                </p>
                <p className="text-sage-200 text-sm leading-relaxed">
                  {contactData.clinic_info.address.landmark},{" "}
                  {contactData.clinic_info.address.city},{" "}
                  {contactData.clinic_info.address.state}{" "}
                  {contactData.clinic_info.address.zip}
                </p>
                <a
                  href={contactData.clinic_info.address.Location}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex pt-1 text-sm font-bold text-cream-50 hover:text-terracotta-300 transition-colors"
                >
                  Open in Google Maps
                </a>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold uppercase tracking-widest text-terracotta-600">
                  Clinical Hours
                </p>
                <p className="text-sage-100 text-sm">
                  Mon - Sat: 10:00 AM - 8:00 PM
                </p>
                <p className="text-sage-200 text-sm italic">
                  Sunday: Consultations via Appointment Only
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-block text-white border-b-2 border-terracotta-400 pb-1 text-sm font-bold hover:text-terracotta-300 transition-colors"
              >
                Book a Session →
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-sage-700 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sage-300 text-sm font-medium uppercase tracking-widest text-center md:text-left">
            © {currentYear} Revivee Homeo Clinic. Personalized homeopathic care
            in Chennai.
          </p>
          <div className="flex space-x-6 text-sm text-sage-300 font-medium">
            <a
              href={`mailto:${contactData.clinic_info.email.general}`}
              className="hover:text-sage-200"
            >
              Email Us
            </a>
            <a
              href={`tel:${contactData.clinic_info.phone.primary.replace(/\s+/g, "")}`}
              className="hover:text-sage-200"
            >
              Call Clinic
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
