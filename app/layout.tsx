import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import FloatingActionButton from "../components/FloatingActionButton";
import MobileStickyCTA from "../components/MobileStickyCTA";
import { BUSINESS_INFO, PAGE_DESCRIPTIONS } from "../utils/seoUtils";

const playfair = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-playfair",
  display: "swap",
});
const inter = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${BUSINESS_INFO.name} | Best Homeopathy Clinic in Chennai`,
    template: `%s | ${BUSINESS_INFO.name}`,
  },
  description: PAGE_DESCRIPTIONS.home,
  keywords:
    "homeopathy chennai, natural treatment psoriasis, pcos homeopathy, chronic pain management, pediatric homeopathy, best homeopathic doctor",
  authors: [{ name: "Dr. Nritiya Dave" }],
  creator: "Revivee Homeo Clinic",
  publisher: "Revivee Homeo Clinic",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  metadataBase: new URL("https://www.revivehomeoclinic.com"),
  openGraph: {
    title: BUSINESS_INFO.name,
    description: PAGE_DESCRIPTIONS.home,
    url: "https://www.revivehomeoclinic.com",
    siteName: BUSINESS_INFO.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: BUSINESS_INFO.name,
    description: PAGE_DESCRIPTIONS.home,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: BUSINESS_INFO.name,
    image: "https://www.revivehomeoclinic.com/assets/logo_1.png",
    "@id": "https://www.revivehomeoclinic.com",
    url: "https://www.revivehomeoclinic.com",
    telephone: "+919840439401",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "231 Purasawalkam High Road, Dr Rajivi Towers, 2nd Floor, Shop No 7, Near Welcome Hotel",
      addressLocality: "Chennai",
      postalCode: "600084",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 13.085939,
      longitude: 80.245452,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "10:00",
      closes: "20:30",
    },
    medicalSpecialty: [
      "HomeopathicMedicine",
      "SkinMedicine",
      "PediatricMedicine",
      "WomenHealth",
    ],
    founder: {
      "@type": "Person",
      name: "Dr. Nritiya Dave",
    },
  };

  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable}`}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://img.freepik.com" />
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KXJV3FGS');`,
          }}
        />
        {/* End Google Tag Manager */}
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-11127917834"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'AW-11127917834');
            `,
          }}
        />
        {/* Microsoft Clarity */}
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "xm7rv7erav");`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className="antialiased font-inter text-sage-900 page-shell"
        suppressHydrationWarning
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KXJV3FGS"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="grow page-main pb-28 sm:pb-0">{children}</main>
          <Footer />
          <FloatingActionButton />
          <MobileStickyCTA />
        </div>
      </body>
    </html>
  );
}
