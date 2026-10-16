import React from 'react';
import { ArrowUp, Phone, MessageSquare } from 'lucide-react';
import { SalonInfo, Stylist } from '../types.ts';

interface FooterProps {
  salonInfo: SalonInfo;
  stylists: Stylist[];
}

export const Footer: React.FC<FooterProps> = ({ salonInfo, stylists }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#EDE7DC] text-[#4A443A] border-t border-[#DBD2C3] pt-12 pb-24 md:pb-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 pb-8 sm:pb-10 border-b border-[#D8CEBC]">
          {/* Brand Col */}
          <div className="md:col-span-5 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-full border border-[#D4AF37]/50 bg-white p-0.5 shadow-2xs shrink-0">
                <img
                  src="/haven_lofts_logo.jpg"
                  alt="Haven Lofts Logo"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="font-serif-display text-2xl text-[#211F1D] uppercase tracking-wider block leading-none">
                  Haven Lofts
                </span>
                <span className="text-[10px] tracking-widest text-[#8C6B38] uppercase font-bold">
                  Beautifully Independent
                </span>
              </div>
            </div>

            <p className="font-serif-display text-sm text-[#3D4A38] italic mt-1 font-medium">
              A cozy, boho-inspired hair salon in Lakeville
            </p>
            <p className="text-xs text-[#5E564A] mt-2.5 leading-relaxed max-w-sm">
              Founded by Sara & Leah. Good honest hair care, friendly conversation,
              and a comfortable space in Lakeville, Minnesota.
            </p>

            <div className="mt-4 text-xs text-[#524B40]">
              <span className="font-bold">{salonInfo.street} {salonInfo.suite}</span>
              <span className="block text-[#6F675A] mt-0.5">{salonInfo.city}, {salonInfo.state} {salonInfo.zip}</span>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-3">
            <span className="text-xs uppercase tracking-widest text-[#211F1D] font-bold block mb-3">
              Quick Links
            </span>
            <ul className="space-y-2 text-xs text-[#5A5245]">
              <li>
                <a href="#stylists" className="hover:text-[#211F1D] transition-colors py-1 block">
                  Meet Sara & Leah
                </a>
              </li>
              <li>
                <a href="#hours" className="hover:text-[#211F1D] transition-colors py-1 block">
                  Stylist Working Hours
                </a>
              </li>
              <li>
                <a href="#space" className="hover:text-[#211F1D] transition-colors py-1 block">
                  The Salon Suites (7 Spaces)
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-[#211F1D] transition-colors py-1 block">
                  Lakeville Studio Location
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Stylist Phone Lines */}
          <div className="md:col-span-4">
            <span className="text-xs uppercase tracking-widest text-[#3D4A38] font-bold block mb-3">
              Direct Phone Numbers
            </span>
            <div className="space-y-3">
              {stylists.map((stylist) => (
                <div key={stylist.id} className="text-xs bg-white/70 p-3 border border-[#DDD5C7] rounded-xs">
                  <div className="text-[#211F1D] font-bold text-sm">{stylist.name} ({stylist.role})</div>
                  <div className="flex items-center gap-3 mt-1.5 text-[#5A5245]">
                    <a
                      href={`tel:${stylist.phoneRaw}`}
                      className="text-[#3D4A38] hover:underline font-bold text-sm tabular-nums"
                    >
                      {stylist.phone}
                    </a>
                    <span aria-hidden="true" className="text-[#B5AB99]">·</span>
                    <a
                      href={`sms:${stylist.phoneRaw}`}
                      className="hover:text-[#211F1D] underline font-semibold text-xs"
                    >
                      Text {stylist.name}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-[#D8CEBC] text-[11px] text-[#7A7162]">
              Please call or text your stylist directly to confirm current appointment availability.
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#6F675A]">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Haven Lofts. All rights reserved.</span>
            <span aria-hidden="true">·</span>
            <span>Lakeville, Minnesota</span>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-[#5A5245] hover:text-[#211F1D] transition-colors font-bold py-1"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#4A5843]" />
          </button>
        </div>
      </div>
    </footer>
  );
};
