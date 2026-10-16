import React, { useState } from 'react';
import { Phone, Menu, X, Clock, MapPin } from 'lucide-react';
import { SalonInfo } from '../types.ts';

const DEFAULT_LOGO_PATH = '/haven_lofts_logo.jpg';

interface NavbarProps {
  salonInfo: SalonInfo;
  onOpenPhoneMenu?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ salonInfo, onOpenPhoneMenu }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E4DDD0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3.5 flex items-center justify-between gap-4">
        {/* Zone 1: Logo & Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Circular Gold Haven Lofts Logo */}
          <a href="#" className="relative h-11 w-11 sm:h-12 sm:w-12 rounded-full border border-[#D4AF37]/50 bg-white overflow-hidden flex items-center justify-center shadow-xs">
            <img
              src={DEFAULT_LOGO_PATH}
              alt="Haven Lofts Logo"
              className="w-full h-full object-contain p-0.5"
              referrerPolicy="no-referrer"
            />
          </a>

          {/* Clean Brand Lockup */}
          <a href="#" className="flex flex-col text-left group">
            <span className="font-serif-display text-xl sm:text-2xl lg:text-3xl tracking-wide text-[#23211F] group-hover:text-[#4A5843] transition-colors uppercase whitespace-nowrap leading-none">
              Haven Lofts
            </span>
            <span className="text-[9px] sm:text-[10px] tracking-widest text-[#9C824A] uppercase font-semibold mt-0.5">
              Beautifully Independent
            </span>
          </a>
        </div>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-7 text-xs uppercase tracking-widest text-[#5C5549] font-semibold">
          <a href="#stylists" className="hover:text-[#4A5843] transition-colors whitespace-nowrap shrink-0">
            Stylists
          </a>
          <a href="#hours" className="hover:text-[#4A5843] transition-colors whitespace-nowrap shrink-0">
            Hours
          </a>
          <a href="#space" className="hover:text-[#4A5843] transition-colors whitespace-nowrap shrink-0">
            The Space
          </a>
          <a href="#location" className="hover:text-[#4A5843] transition-colors whitespace-nowrap shrink-0">
            Location
          </a>
        </nav>

        {/* Zone 3: Quick Action & Mobile Hamburger */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Quick Call Stylist Button */}
          <a
            href="#stylists"
            onClick={(e) => {
              if (onOpenPhoneMenu) {
                e.preventDefault();
                onOpenPhoneMenu();
              }
            }}
            className="flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2.5 bg-[#4A5843] hover:bg-[#3B4735] text-white text-xs font-bold tracking-wider uppercase transition-colors whitespace-nowrap shrink-0 shadow-xs rounded-xs"
          >
            <Phone className="w-3.5 h-3.5 text-[#E0B275]" />
            <span className="hidden xs:inline">Call Stylist</span>
            <span className="xs:hidden">Call</span>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-11 h-11 border border-[#DDD5C7] bg-white text-[#211F1D] rounded-xs shadow-2xs hover:bg-[#F2ECE1] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF7F2] border-b border-[#D8CEBC] px-6 py-5 shadow-lg animate-fade-in">
          <div className="space-y-4">
            <div className="pb-3 border-b border-[#E8E1D5]">
              <span className="text-[11px] uppercase tracking-widest text-[#3D4A38] font-bold block mb-2">
                Direct Stylist Phone Lines
              </span>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href="tel:9523568214"
                  className="flex items-center justify-center gap-2 py-3 bg-[#4A5843] text-white text-xs font-bold uppercase rounded-xs"
                >
                  <Phone className="w-3.5 h-3.5 text-[#E0B275]" />
                  <span>Call Sara</span>
                </a>
                <a
                  href="tel:9523568215"
                  className="flex items-center justify-center gap-2 py-3 bg-[#4A5843] text-white text-xs font-bold uppercase rounded-xs"
                >
                  <Phone className="w-3.5 h-3.5 text-[#E0B275]" />
                  <span>Call Leah</span>
                </a>
              </div>
            </div>

            <nav className="flex flex-col space-y-3 text-sm font-medium text-[#211F1D]">
              <a
                href="#stylists"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-1.5 border-b border-[#EFE9DF]"
              >
                <span>Meet Sara & Leah</span>
                <span className="text-xs text-[#7A7162]">Co-Creators</span>
              </a>
              <a
                href="#hours"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-1.5 border-b border-[#EFE9DF]"
              >
                <span>Stylist Working Hours</span>
                <Clock className="w-4 h-4 text-[#4A5843]" />
              </a>
              <a
                href="#space"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-1.5 border-b border-[#EFE9DF]"
              >
                <span>The Suites & Rooms</span>
                <span className="text-xs text-[#7A7162]">7 Spaces</span>
              </a>
              <a
                href="#location"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-1.5"
              >
                <span>Lakeville, MN Location</span>
                <MapPin className="w-4 h-4 text-[#4A5843]" />
              </a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};
