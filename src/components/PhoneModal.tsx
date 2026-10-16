import React from 'react';
import { Phone, MessageSquare, X, Clock } from 'lucide-react';
import { Stylist } from '../types.ts';

interface PhoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  stylists: Stylist[];
  selectedStylistId?: string | null;
}

export const PhoneModal: React.FC<PhoneModalProps> = ({
  isOpen,
  onClose,
  stylists,
  selectedStylistId,
}) => {
  if (!isOpen) return null;

  const todayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date());

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1F241C]/65 backdrop-blur-xs animate-fade-in">
      <div
        className="relative w-full max-w-md bg-[#FAF7F2] border border-[#DDD5C7] p-6 sm:p-8 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-[#786E5E] hover:text-[#211F1D] transition-colors"
          aria-label="Close phone directory"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-left mb-6">
          <span className="text-xs uppercase tracking-widest text-[#3D4A38] font-bold block mb-1">
            Haven Lofts · Lakeville, MN
          </span>
          <h3 className="font-serif-display text-2xl sm:text-3xl text-[#211F1D] font-normal">
            Call or Text Your Stylist
          </h3>
          <p className="text-xs text-[#5A5245] mt-1.5 leading-relaxed">
            Reach out directly to Sara or Leah to check open times or schedule your next visit.
          </p>
        </div>

        {/* Stylists List */}
        <div className="space-y-4">
          {stylists.map((stylist) => {
            const todaySchedule = stylist.schedule.find(
              (s) => s.day.toLowerCase() === todayName.toLowerCase()
            );
            const isHighlight = selectedStylistId === stylist.id;

            return (
              <div
                key={stylist.id}
                className={`p-4 border transition-all ${
                  isHighlight
                    ? 'border-[#4A5843] bg-white shadow-xs'
                    : 'border-[#DDD5C7] bg-[#F5F1EB] hover:border-[#4A5843]/60'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="font-serif-display text-2xl text-[#211F1D]">
                    {stylist.name}
                  </div>
                  <span className="text-[11px] text-[#3D4A38] uppercase tracking-wider font-bold">
                    {stylist.role}
                  </span>
                </div>

                {todaySchedule && (
                  <div className="flex items-center gap-1.5 text-xs text-[#5C5549] mb-2.5">
                    <Clock className="w-3.5 h-3.5 text-[#4A5843]" />
                    <span>Today: {todaySchedule.hours}</span>
                  </div>
                )}

                <div className="text-base font-bold text-[#211F1D] tabular-nums mb-3">
                  {stylist.phone}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={`tel:${stylist.phoneRaw}`}
                    className="flex items-center justify-center gap-1.5 py-2.5 bg-[#4A5843] hover:bg-[#3D4937] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-2xs"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#E0B275]" />
                    <span>Call {stylist.name}</span>
                  </a>

                  <a
                    href={`sms:${stylist.phoneRaw}`}
                    className="flex items-center justify-center gap-1.5 py-2.5 bg-white hover:bg-[#F2EDE3] text-[#211F1D] text-xs font-bold uppercase tracking-wider border border-[#DDD5C7] transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-[#4A5843]" />
                    <span>Text {stylist.name}</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 pt-4 border-t border-[#E8E1D5] text-center">
          <button
            type="button"
            onClick={onClose}
            className="text-xs uppercase tracking-wider text-[#6B6252] hover:text-[#211F1D] font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
