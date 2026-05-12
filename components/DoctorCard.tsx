import React from "react";
import Image from "next/image";
import Link from "next/link";
import Photo from "../assets/Photo.jpg";
import type { StaticImageData } from "next/image";

interface DoctorCardProps {
  name: string;
  title: string;
  qualification: string[];
  bio: string;
  achievements?: string[];
  photoSrc?: string | StaticImageData;
}

const DoctorCard: React.FC<DoctorCardProps> = ({
  name,
  title,
  qualification = [],
  bio,
  achievements = [],
  photoSrc,
}) => {
  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative group">
          {/* Subtle background glow */}
          <div className="absolute inset-x-10 inset-y-0 bg-sage-100/50 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="relative glass-card rounded-[4rem] overflow-hidden border-2 border-white shadow-2xl transition-all duration-500 hover:shadow-sage-200/50">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Photo & Identity Sidebar */}
              <div className="relative h-[500px] lg:h-auto bg-sage-50 flex flex-col items-center justify-center p-12 overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/40 rounded-full -mr-20 -mt-20 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-terracotta-50 rounded-full -ml-20 -mb-20 blur-3xl opacity-50" />
                
                <div className="relative z-10 w-full max-w-sm">
                   <div className="relative aspect-[4/5] bg-white rounded-[3rem] p-4 shadow-xl transform group-hover:rotate-1 transition-transform duration-700">
                      <Image
                        src={photoSrc || Photo}
                        alt={name}
                        fill
                        className="object-cover rounded-[2rem] p-2"
                        priority
                      />
                   </div>
                      
                   <div className="mt-10 text-center space-y-3">
                      <h2 className="text-3xl font-playfair font-bold text-sage-900 leading-none">{name}</h2>
                      <div className="flex items-center justify-center space-x-2">
                        <span className="w-8 h-[1px] bg-terracotta-400" />
                        <span className="text-xs font-bold tracking-[0.2em] text-terracotta-600 uppercase">Chief Homeopath</span>
                        <span className="w-8 h-[1px] bg-terracotta-400" />
                      </div>
                   </div>
                </div>
              </div>

              {/* Comprehensive Professional Bio */}
              <div className="p-10 lg:p-20 bg-white/80">
                <div className="space-y-12">
                  <div className="space-y-6">
                    <h3 className="text-[10px] font-bold tracking-[0.4em] text-sage-600 uppercase">Professional Profile</h3>
                    <p className="text-4xl font-playfair font-bold text-sage-900 leading-tight">
                      {title}
                    </p>
                    
                    <div className="flex flex-wrap gap-3">
                       {qualification.map((qual, i) => (
                         <span key={i} className="px-5 py-2 bg-sage-50 text-sage-700 text-xs font-bold rounded-xl border border-sage-100">
                           {qual}
                         </span>
                       ))}
                    </div>
                  </div>

                  <div className="space-y-6 text-sage-700 font-medium leading-relaxed">
                     {bio.split("\n\n").map((para, i) => (
                       <p key={i} className="text-sm md:text-base">{para}</p>
                     ))}
                  </div>

                  {/* Accreditations / Achievements */}
                  {achievements.length > 0 && (
                    <div className="space-y-6 pt-6 border-t border-sage-100">
                       <h4 className="text-[10px] font-bold tracking-[0.4em] text-terracotta-600 uppercase">Specialized Expertise</h4>
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {achievements.map((item, i) => (
                            <div key={i} className="flex items-center space-x-3 text-sm font-semibold text-sage-800">
                               <div className="w-2 h-2 bg-terracotta-500 rounded-full" />
                               <span>{item}</span>
                            </div>
                          ))}
                       </div>
                    </div>
                  )}

                  {/* CTA or Secondary Action */}
                  <div className="pt-6">
                     <Link 
                       href="/contact" 
                       className="btn-premium px-12 py-5 text-sm inline-block"
                       aria-label={`Request a personal consultation with ${name}`}
                     >
                       Request a Personal Consultation
                     </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorCard;
