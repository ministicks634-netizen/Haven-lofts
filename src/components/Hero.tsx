import React from 'react';
import { Phone, Clock, MapPin, Coffee, MessageSquare, Sparkles } from 'lucide-react';
import { ImageSlot } from './ImageSlot.tsx';
import { SalonInfo } from '../types.ts';

interface HeroProps {
  salonInfo: SalonInfo;
  onCallSara: () => void;
  onCallLeah: () => void;
}

export const Hero: React.FC<HeroProps> = ({ salonInfo, onCallSara, onCallLeah }) => {
  return (
    <section className="relative pt-8 pb-14 md:pt-16 md:pb-20 border-b border-[#E4DDD0] bg-[#FAF7F2] overflow-hidden">
      {/* Warm ambient background */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#4A5843]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-[#D4A373]/12 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Unboxed natural kicker */}
        <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-widest text-[#5C5549] mb-4 sm:mb-6 font-semibold">
          <span className="text-[#3D4A38] font-bold">{salonInfo.city}, {salonInfo.state}</span>
          <span aria-hidden="true" className="text-[#B5AC9E]">·</span>
          <span>By Local Stylists {salonInfo.coFounders}</span>
          <span aria-hidden="true" className="hidden sm:inline text-[#B5AC9E]">·</span>
          <span className="hidden sm:flex items-center gap-1 text-[#8C6B38]">
            <Coffee className="w-3.5 h-3.5" />
            <span>Relaxed & Welcoming</span>
          </span>
        </div>

        {/* 2-Column Split: Editorial Copy & Boho Salon Imagery */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Greeting, Brand Badge & Mobile-Optimized Phone Cards */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Brand Title Lockup (Logo removed as requested, headline enlarged) */}
            <div className="mb-2">
              <h1 className="font-serif-display text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl text-[#211F1D] font-normal tracking-tight leading-[1.04]">
                Haven Lofts
              </h1>
              <span className="text-xs sm:text-sm md:text-base tracking-[0.25em] text-[#9C824A] uppercase font-bold block mt-1">
                Beautifully Independent
              </span>
            </div>

            <p className="font-serif-display text-xl sm:text-2xl text-[#3D4A38] mt-1 sm:mt-2 font-normal italic">
              A cozy, boho-inspired hair salon in Lakeville
            </p>

            <p className="text-[#524B40] text-sm sm:text-base leading-relaxed mt-4 max-w-xl">
              Welcome! We’re Sara and Leah, two longtime local hair stylists who wanted to build a place that feels like home.
              Think warm wood tones, lots of greenery, comfortable chairs, and relaxed conversation.
              We keep things simple: each of us has our own schedule and you can just call or text us directly for appointments.
            </p>

            {/* Direct Stylist Phone Strip - Optimized for Mobile Touch */}
            <div className="mt-6 sm:mt-8 pt-5 border-t border-[#E4DDD0]">
              <span className="text-[11px] sm:text-xs uppercase tracking-widest text-[#6F675A] font-bold block mb-3">
                Call or Text Your Stylist Directly
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Sara Card */}
                <div className="bg-white border border-[#DDD5C7] p-3.5 sm:p-4 rounded-xs shadow-2xs flex flex-col justify-between hover:border-[#4A5843] transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="text-xs uppercase tracking-wider text-[#6F675A] font-medium">
                        Sara
                      </div>
                      <div className="text-lg sm:text-xl font-bold text-[#211F1D] tracking-wide tabular-nums">
                        (952) 356-8214
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <a
                      href="tel:9523568214"
                      className="flex items-center justify-center gap-1.5 py-2.5 bg-[#4A5843] hover:bg-[#3D4937] text-white text-xs font-bold uppercase rounded-xs transition-colors shadow-2xs"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#E0B275]" />
                      <span>Call</span>
                    </a>
                    <a
                      href="sms:9523568214"
                      className="flex items-center justify-center gap-1.5 py-2.5 bg-[#F5F2EB] hover:bg-[#EAE4D7] text-[#211F1D] text-xs font-bold uppercase border border-[#DDD5C7] rounded-xs transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-[#4A5843]" />
                      <span>Text</span>
                    </a>
                  </div>
                </div>

                {/* Leah Card */}
                <div className="bg-white border border-[#DDD5C7] p-3.5 sm:p-4 rounded-xs shadow-2xs flex flex-col justify-between hover:border-[#4A5843] transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="text-xs uppercase tracking-wider text-[#6F675A] font-medium">
                        Leah
                      </div>
                      <div className="text-lg sm:text-xl font-bold text-[#211F1D] tracking-wide tabular-nums">
                        (952) 356-8215
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <a
                      href="tel:9523568215"
                      className="flex items-center justify-center gap-1.5 py-2.5 bg-[#4A5843] hover:bg-[#3D4937] text-white text-xs font-bold uppercase rounded-xs transition-colors shadow-2xs"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#E0B275]" />
                      <span>Call</span>
                    </a>
                    <a
                      href="sms:9523568215"
                      className="flex items-center justify-center gap-1.5 py-2.5 bg-[#F5F2EB] hover:bg-[#EAE4D7] text-[#211F1D] text-xs font-bold uppercase border border-[#DDD5C7] rounded-xs transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-[#4A5843]" />
                      <span>Text</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick in-page links */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-5 sm:mt-6 text-xs uppercase tracking-widest text-[#5C5549] font-semibold">
              <a href="#stylists" className="hover:text-[#211F1D] flex items-center gap-1.5 py-1 transition-colors">
                <Clock className="w-4 h-4 text-[#4A5843]" />
                <span>Stylist Working Hours</span>
              </a>
              <a href="#location" className="hover:text-[#211F1D] flex items-center gap-1.5 py-1 transition-colors">
                <MapPin className="w-4 h-4 text-[#3D4A38]" />
                <span>Lakeville, MN Location</span>
              </a>
            </div>
          </div>

          {/* Right Column: Featured Boho Salon Interior Preview */}
          <div className="lg:col-span-6 mt-2 lg:mt-0">
            <div className="relative">
              <div className="absolute -inset-2 border border-[#D5CCBC]/60 pointer-events-none rounded-xs" />

              <ImageSlot
                label="The Salon Atmosphere"
                sublabel="Interior Photography Coming Soon"
                aspectRatioClass="aspect-[16/10]"
                className="w-full shadow-md"
              />

              <div className="mt-2.5 flex items-center justify-between text-xs text-[#6F675A]">
                <span>Haven Lofts · Lakeville, MN</span>
                <span className="text-[#3D4A38] font-medium">Boutique Hair Salon</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
