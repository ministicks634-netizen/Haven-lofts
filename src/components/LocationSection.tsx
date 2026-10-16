import React, { useState } from 'react';
import { MapPin, Phone, MessageSquare, Navigation, Clock, Edit3, Check, X, Car } from 'lucide-react';
import { SalonInfo, Stylist } from '../types.ts';

interface LocationSectionProps {
  salonInfo: SalonInfo;
  stylists: Stylist[];
  onUpdateSalonInfo?: (updated: SalonInfo) => void;
}

export const LocationSection: React.FC<LocationSectionProps> = ({
  salonInfo,
  stylists,
  onUpdateSalonInfo,
}) => {
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [addressForm, setAddressForm] = useState({
    street: salonInfo.street,
    suite: salonInfo.suite,
    city: salonInfo.city,
    state: salonInfo.state,
    zip: salonInfo.zip,
  });

  const handleSaveAddress = () => {
    if (onUpdateSalonInfo) {
      onUpdateSalonInfo({
        ...salonInfo,
        ...addressForm,
      });
    }
    setIsEditingAddress(false);
  };

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${addressForm.street}, ${addressForm.city}, ${addressForm.state} ${addressForm.zip}`
  )}`;

  return (
    <section id="location" className="py-14 md:py-20 bg-[#F4EFE6] border-b border-[#E0D7C8] scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 pb-8 sm:pb-10 border-b border-[#D8CEBC]">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#3D4A38] mb-2 font-bold">
              <span>Lakeville, Minnesota</span>
              <span aria-hidden="true" className="text-[#A89E8D]">·</span>
              <span>Where to Find Us</span>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl text-[#211F1D] font-normal">
              Come Visit Us
            </h2>
            <p className="text-[#5A5245] text-sm sm:text-base mt-2 max-w-xl leading-relaxed">
              Haven Lofts is located right in Lakeville, Minnesota with easy access off I-35 and convenient front-door parking.
              Give Sara or Leah a call or text before heading in so we can be ready for you!
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 bg-[#4A5843] hover:bg-[#3D4937] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-2xs rounded-xs"
            >
              <Navigation className="w-3.5 h-3.5 text-[#E0B275]" />
              <span>Get Directions</span>
            </a>
          </div>
        </div>

        {/* 2-Column Split: Salon Address & Stylist Contacts + Map Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 mt-8 sm:mt-12 items-stretch">
          {/* Left Column: Location & Contact Cards */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6 sm:space-y-7">
            {/* Address Box */}
            <div className="bg-white border border-[#DDD5C7] p-5 sm:p-8 shadow-xs rounded-xs">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E8E1D5]">
                <span className="text-xs uppercase tracking-widest text-[#3D4A38] font-bold flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#D4A373]" />
                  <span>Salon Address</span>
                </span>

                {!isEditingAddress ? (
                  <button
                    type="button"
                    onClick={() => setIsEditingAddress(true)}
                    className="flex items-center gap-1.5 text-xs text-[#7A7162] hover:text-[#211F1D] transition-colors py-1"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit Address</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleSaveAddress}
                      className="flex items-center gap-1 px-3 py-1.5 bg-[#4A5843] text-white text-xs font-semibold rounded-xs"
                    >
                      <Check className="w-3 h-3" />
                      <span>Save</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditingAddress(false)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-[#EDE7DC] text-[#3A352C] text-xs rounded-xs"
                    >
                      <X className="w-3 h-3" />
                      <span>Cancel</span>
                    </button>
                  </div>
                )}
              </div>

              {isEditingAddress ? (
                <div className="space-y-3">
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#6B6252] font-semibold block mb-1">
                      Street Address
                    </label>
                    <input
                      type="text"
                      value={addressForm.street}
                      onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
                      className="w-full bg-[#FAF8F5] border border-[#DDD5C7] px-3 py-2 text-[#211F1D] text-base"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#6B6252] font-semibold block mb-1">
                      Suite / Unit (Optional)
                    </label>
                    <input
                      type="text"
                      value={addressForm.suite}
                      onChange={(e) => setAddressForm({ ...addressForm, suite: e.target.value })}
                      className="w-full bg-[#FAF8F5] border border-[#DDD5C7] px-3 py-2 text-[#211F1D] text-base"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-[#6B6252] font-semibold block mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        value={addressForm.city}
                        onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                        className="w-full bg-[#FAF8F5] border border-[#DDD5C7] px-2 py-2 text-[#211F1D] text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-[#6B6252] font-semibold block mb-1">
                        State
                      </label>
                      <input
                        type="text"
                        value={addressForm.state}
                        onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                        className="w-full bg-[#FAF8F5] border border-[#DDD5C7] px-2 py-2 text-[#211F1D] text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-[#6B6252] font-semibold block mb-1">
                        ZIP
                      </label>
                      <input
                        type="text"
                        value={addressForm.zip}
                        onChange={(e) => setAddressForm({ ...addressForm, zip: e.target.value })}
                        className="w-full bg-[#FAF8F5] border border-[#DDD5C7] px-2 py-2 text-[#211F1D] text-sm"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="font-serif-display text-2xl text-[#211F1D] font-normal">
                    Haven Lofts
                  </h3>
                  <p className="text-base text-[#38332B] font-medium mt-1.5">
                    {salonInfo.street} {salonInfo.suite}
                  </p>
                  <p className="text-sm text-[#6B6252]">
                    {salonInfo.city}, {salonInfo.state} {salonInfo.zip}
                  </p>

                  <div className="mt-4 pt-3 border-t border-[#E8E1D5] flex items-center gap-2 text-xs text-[#524B40]">
                    <Car className="w-4 h-4 text-[#4A5843] shrink-0" />
                    <span>Free ground-level customer parking right outside the building.</span>
                  </div>
                </div>
              )}
            </div>

            {/* Stylists Direct Phone Line Summary */}
            <div className="bg-white border border-[#DDD5C7] p-5 sm:p-8 shadow-xs rounded-xs">
              <span className="text-xs uppercase tracking-widest text-[#3D4A38] font-bold block mb-4 pb-3 border-b border-[#E8E1D5]">
                Direct Stylist Phone Directory
              </span>

              <div className="space-y-3">
                {stylists.map((stylist) => (
                  <div
                    key={stylist.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-[#FAF8F5] border border-[#E0D7C8] rounded-xs"
                  >
                    <div>
                      <div className="text-base font-serif-display text-[#211F1D]">{stylist.name}</div>
                      <div className="text-xs text-[#3D4A38] font-bold tabular-nums mt-0.5">{stylist.phone}</div>
                    </div>

                    <div className="grid grid-cols-2 sm:flex sm:items-center gap-2">
                      <a
                        href={`tel:${stylist.phoneRaw}`}
                        className="flex items-center justify-center gap-1.5 min-h-[40px] px-3.5 py-2 bg-[#4A5843] hover:bg-[#3D4937] text-white text-xs font-bold uppercase tracking-wider transition-colors rounded-xs shadow-2xs"
                      >
                        <Phone className="w-3.5 h-3.5 text-[#E0B275]" />
                        <span>Call</span>
                      </a>
                      <a
                        href={`sms:${stylist.phoneRaw}`}
                        className="flex items-center justify-center gap-1.5 min-h-[40px] px-3.5 py-2 bg-white hover:bg-[#EFEAE0] text-[#211F1D] text-xs font-bold uppercase tracking-wider border border-[#DDD5C7] transition-colors rounded-xs"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-[#4A5843]" />
                        <span>Text</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Warm Map & Arrival Notes */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="bg-white border border-[#DDD5C7] p-5 sm:p-8 h-full flex flex-col justify-between shadow-xs rounded-xs">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#7A7162] font-bold block mb-4 pb-3 border-b border-[#E8E1D5]">
                  Location & Arrival Notes
                </span>

                {/* Warm Graphic Map Card */}
                <div className="relative aspect-[16/10] bg-[#F7F4ED] border border-[#DDD5C7] p-5 sm:p-6 flex flex-col items-center justify-center text-center overflow-hidden group rounded-xs">
                  <div className="absolute inset-0 bg-[radial-gradient(#D5CCBC_1px,transparent_1px)] [background-size:16px_16px] opacity-60" />

                  {/* Marker Pin */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-[#4A5843] flex items-center justify-center text-[#E0B275] shadow-md mb-2">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <span className="font-serif-display text-2xl text-[#211F1D] font-normal">Haven Lofts</span>
                    <span className="text-xs text-[#524B40] mt-1 font-medium">{salonInfo.city}, {salonInfo.state}</span>
                  </div>

                  {/* Map action button */}
                  <div className="relative z-10 mt-4 sm:mt-5 w-full sm:w-auto">
                    <a
                      href={googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 bg-white hover:bg-[#F3EFEA] border border-[#DDD5C7] text-xs uppercase tracking-wider text-[#211F1D] font-bold transition-colors shadow-xs rounded-xs"
                    >
                      <Navigation className="w-3.5 h-3.5 text-[#4A5843]" />
                      <span>Open in Google Maps</span>
                    </a>
                  </div>
                </div>

                <div className="mt-5 sm:mt-6 space-y-3 text-xs text-[#524B40] leading-relaxed">
                  <p>
                    <strong className="text-[#211F1D]">Easy Access:</strong> Conveniently located in Lakeville,
                    just a few minutes from the freeway. The lofts have an easy-access private entrance.
                  </p>
                  <p>
                    <strong className="text-[#211F1D]">Appointments:</strong> Because each of us runs our own schedule,
                    please give Sara or Leah a quick call or text before heading in to make sure we’re at the studio and free.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E8E1D5] text-xs text-[#7A7162] flex items-center justify-between">
                <span>Lakeville, Minnesota</span>
                <span className="text-[#3D4A38] font-bold">Sara & Leah</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
