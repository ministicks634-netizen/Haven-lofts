/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { StylistsSection } from './components/StylistsSection.tsx';
import { LoftGallery } from './components/LoftGallery.tsx';
import { LocationSection } from './components/LocationSection.tsx';
import { Footer } from './components/Footer.tsx';
import { PhoneModal } from './components/PhoneModal.tsx';
import { MobileBottomBar } from './components/MobileBottomBar.tsx';
import { INITIAL_SALON_INFO, INITIAL_STYLISTS, INITIAL_LOFT_SPACES } from './data/salonData.ts';
import { Stylist, SalonInfo } from './types.ts';

export default function App() {
  const [salonInfo, setSalonInfo] = useState<SalonInfo>(() => {
    try {
      const saved = localStorage.getItem('haven_lofts_info_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        parsed.coFounders = 'Sara & Leah';
        return parsed;
      }
      return INITIAL_SALON_INFO;
    } catch {
      return INITIAL_SALON_INFO;
    }
  });

  const [stylists, setStylists] = useState<Stylist[]>(() => {
    try {
      const saved = localStorage.getItem('haven_lofts_stylists_v2');
      if (saved) {
        const parsed: Stylist[] = JSON.parse(saved);
        return parsed.map((s) => (s.id === 'sara' || s.id === 'sarah' ? { ...s, id: 'sara', name: 'Sara' } : s));
      }
      return INITIAL_STYLISTS;
    } catch {
      return INITIAL_STYLISTS;
    }
  });

  const [phoneModalOpen, setPhoneModalOpen] = useState(false);
  const [selectedStylistId, setSelectedStylistId] = useState<string | null>(null);

  const handleUpdateStylist = (updatedStylist: Stylist) => {
    const updated = stylists.map((s) => (s.id === updatedStylist.id ? updatedStylist : s));
    setStylists(updated);
    try {
      localStorage.setItem('haven_lofts_stylists_v2', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateSalonInfo = (updatedInfo: SalonInfo) => {
    setSalonInfo(updatedInfo);
    try {
      localStorage.setItem('haven_lofts_info_v2', JSON.stringify(updatedInfo));
    } catch (e) {
      console.error(e);
    }
  };

  const handleCallSara = () => {
    const sara = stylists.find((s) => s.id === 'sara' || s.id === 'sarah');
    if (sara) {
      window.location.href = `tel:${sara.phoneRaw}`;
    }
  };

  const handleCallLeah = () => {
    const leah = stylists.find((s) => s.id === 'leah');
    if (leah) {
      window.location.href = `tel:${leah.phoneRaw}`;
    }
  };

  const handleOpenPhoneDirectory = (stylistId?: string) => {
    setSelectedStylistId(stylistId || null);
    setPhoneModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#211F1D] flex flex-col font-sans-body selection:bg-[#4A5843] selection:text-white">
      {/* Top Bar Navigation */}
      <Navbar
        salonInfo={salonInfo}
        onOpenPhoneMenu={() => handleOpenPhoneDirectory()}
      />

      {/* Main Content Sections */}
      <main className="flex-1 pb-16 md:pb-0">
        <Hero
          salonInfo={salonInfo}
          onCallSara={handleCallSara}
          onCallLeah={handleCallLeah}
        />

        <StylistsSection
          stylists={stylists}
          onUpdateStylist={handleUpdateStylist}
        />

        <LoftGallery spaces={INITIAL_LOFT_SPACES} />

        <LocationSection
          salonInfo={salonInfo}
          stylists={stylists}
          onUpdateSalonInfo={handleUpdateSalonInfo}
        />
      </main>

      {/* Understated Footer */}
      <Footer salonInfo={salonInfo} stylists={stylists} />

      {/* Direct Phone Directory Modal */}
      <PhoneModal
        isOpen={phoneModalOpen}
        onClose={() => setPhoneModalOpen(false)}
        stylists={stylists}
        selectedStylistId={selectedStylistId}
      />

      {/* Mobile Sticky Quick-Contact Bar (For Phones) */}
      <MobileBottomBar stylists={stylists} />
    </div>
  );
}
