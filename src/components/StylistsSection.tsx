import React, { useState } from 'react';
import { Phone, MessageSquare, Clock, Edit3, Check, X, Scissors } from 'lucide-react';
import { Stylist } from '../types.ts';
import { ImageSlot } from './ImageSlot.tsx';

interface StylistsSectionProps {
  stylists: Stylist[];
  onUpdateStylist?: (updated: Stylist) => void;
}

export const StylistsSection: React.FC<StylistsSectionProps> = ({ stylists, onUpdateStylist }) => {
  const [editingStylistId, setEditingStylistId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Stylist | null>(null);

  // Helper to get today's day of week name (e.g. 'Monday', 'Tuesday', ...)
  const todayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date());

  const startEditing = (stylist: Stylist) => {
    setEditingStylistId(stylist.id);
    setEditForm(JSON.parse(JSON.stringify(stylist)));
  };

  const cancelEditing = () => {
    setEditingStylistId(null);
    setEditForm(null);
  };

  const saveEditing = () => {
    if (editForm && onUpdateStylist) {
      onUpdateStylist(editForm);
    }
    setEditingStylistId(null);
    setEditForm(null);
  };

  const handleScheduleHourChange = (index: number, newHours: string) => {
    if (!editForm) return;
    const updatedSchedule = [...editForm.schedule];
    updatedSchedule[index] = {
      ...updatedSchedule[index],
      hours: newHours,
      isClosed: newHours.toLowerCase().includes('closed'),
    };
    setEditForm({ ...editForm, schedule: updatedSchedule });
  };

  return (
    <section id="stylists" className="py-14 md:py-20 bg-[#F4EFE6] border-b border-[#E0D7C8] scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 pb-8 sm:pb-10 border-b border-[#D8CEBC]">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#3D4A38] mb-2 font-bold">
              <span>Co-Creators & Stylists</span>
              <span aria-hidden="true" className="text-[#A89E8D]">·</span>
              <span>Individual Working Hours</span>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl text-[#211F1D] font-normal">
              Meet Sara & Leah
            </h2>
            <p className="text-[#5A5245] text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              We each manage our own chairs, hours, and appointments. Take a look at our individual weekly schedules below,
              and feel free to call or text either of us directly!
            </p>
          </div>

          <div id="hours" className="text-xs uppercase tracking-widest text-[#665D4F] shrink-0 flex items-center gap-2 font-medium">
            <Clock className="w-4 h-4 text-[#4A5843]" />
            <span>Direct phone contact for hours & visits</span>
          </div>
        </div>

        {/* Stylists Grid - Mobile Optimized */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mt-8 sm:mt-12">
          {stylists.map((stylist) => {
            const isEditing = editingStylistId === stylist.id && editForm;
            const currentData = isEditing ? editForm : stylist;

            return (
              <div
                key={stylist.id}
                className="bg-white border border-[#DDD5C7] p-5 sm:p-8 flex flex-col justify-between hover:border-[#4A5843]/60 transition-all shadow-xs rounded-xs"
              >
                <div>
                  {/* Top Bar on Card: Role & Quick Edit Trigger */}
                  <div className="flex items-center justify-between gap-4 mb-5 pb-3.5 border-b border-[#E8E1D5]">
                    <span className="text-xs uppercase tracking-widest text-[#3D4A38] font-bold flex items-center gap-1.5">
                      <Scissors className="w-3.5 h-3.5 text-[#D4A373]" />
                      <span>{stylist.role}</span>
                    </span>

                    {!isEditing ? (
                      <button
                        type="button"
                        onClick={() => startEditing(stylist)}
                        className="flex items-center gap-1.5 text-xs text-[#7A7162] hover:text-[#211F1D] transition-colors py-1"
                        title="Edit phone number, bio, or schedule"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit Info</span>
                      </button>
                    ) : (
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={saveEditing}
                          className="flex items-center gap-1 px-3 py-1.5 bg-[#4A5843] hover:bg-[#3D4937] text-white text-xs font-medium transition-colors shadow-2xs rounded-xs"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Save</span>
                        </button>
                        <button
                          type="button"
                          onClick={cancelEditing}
                          className="flex items-center gap-1 px-3 py-1.5 bg-[#EDE7DC] hover:bg-[#E0D8CB] text-[#3A352C] text-xs transition-colors rounded-xs"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>Cancel</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Stylist Profile Layout: Photo Slot + Bio info */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 sm:gap-6 items-start">
                    {/* Photo Slot */}
                    <div className="sm:col-span-5 max-w-[280px] sm:max-w-none mx-auto sm:mx-0 w-full">
                      <ImageSlot
                        imageKey={stylist.imageKey}
                        label={`${stylist.name}'s Photo`}
                        sublabel={`Click to import photo`}
                        aspectRatioClass="aspect-[3/4]"
                        aspectBadge="3:4 · 900 × 1200 px"
                        className="w-full shadow-xs rounded-xs"
                      />
                    </div>

                    {/* Name & Bio Details */}
                    <div className="sm:col-span-7 flex flex-col justify-start mt-3 sm:mt-0">
                      {isEditing ? (
                        <div className="space-y-3">
                          <div>
                            <label className="text-[11px] uppercase tracking-wider text-[#6B6252] font-semibold block mb-1">
                              Stylist Name
                            </label>
                            <input
                              type="text"
                              value={editForm.name}
                              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                              className="w-full bg-[#FAF8F5] border border-[#DDD5C7] px-3 py-2 text-[#211F1D] text-base focus:outline-hidden focus:border-[#4A5843]"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] uppercase tracking-wider text-[#6B6252] font-semibold block mb-1">
                              Phone Number
                            </label>
                            <input
                              type="text"
                              value={editForm.phone}
                              onChange={(e) =>
                                setEditForm({
                                  ...editForm,
                                  phone: e.target.value,
                                  phoneRaw: e.target.value.replace(/\D/g, ''),
                                })
                              }
                              className="w-full bg-[#FAF8F5] border border-[#DDD5C7] px-3 py-2 text-[#211F1D] text-base focus:outline-hidden focus:border-[#4A5843]"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] uppercase tracking-wider text-[#6B6252] font-semibold block mb-1">
                              Description / Bio
                            </label>
                            <textarea
                              rows={4}
                              value={editForm.bio}
                              onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                              className="w-full bg-[#FAF8F5] border border-[#DDD5C7] px-3 py-2 text-[#211F1D] text-sm leading-relaxed focus:outline-hidden focus:border-[#4A5843]"
                            />
                          </div>
                        </div>
                      ) : (
                        <>
                          <h3 className="font-serif-display text-3xl sm:text-4xl text-[#211F1D] font-normal">
                            {stylist.name}
                          </h3>

                          {/* Primary Phone Highlight */}
                          <div className="mt-2 flex items-center gap-2 text-[#3D4A38]">
                            <Phone className="w-4 h-4 shrink-0 text-[#D4A373]" />
                            <a
                              href={`tel:${stylist.phoneRaw}`}
                              className="text-lg sm:text-xl font-bold tracking-wide hover:underline tabular-nums"
                            >
                              {stylist.phone}
                            </a>
                          </div>

                          <p className="text-[#524B40] text-sm leading-relaxed mt-3">
                            {stylist.bio}
                          </p>

                          {/* Specialties Unboxed Text */}
                          <div className="mt-4 pt-3 border-t border-[#E8E1D5]">
                            <span className="text-[11px] uppercase tracking-widest text-[#786F60] block mb-1.5 font-bold">
                              What I Love Doing
                            </span>
                            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#403B33]">
                              {stylist.specialties.map((spec, i) => (
                                <React.Fragment key={spec}>
                                  <span>{spec}</span>
                                  {i < stylist.specialties.length - 1 && (
                                    <span aria-hidden="true" className="text-[#B5AB99]">·</span>
                                  )}
                                </React.Fragment>
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Individual Weekly Hours Table - Mobile Clean */}
                  <div className="mt-6 pt-5 border-t border-[#E8E1D5]">
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-xs uppercase tracking-widest text-[#3D4A38] font-bold flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#4A5843]" />
                        <span>{currentData.name}&apos;s Weekly Schedule</span>
                      </span>
                      <span className="text-[11px] text-[#7A7162]">Lakeville Time</span>
                    </div>

                    <div className="border border-[#DDD5C7] bg-[#FAF8F5] divide-y divide-[#EAE3D7] rounded-xs overflow-hidden">
                      {currentData.schedule.map((dayItem, index) => {
                        const isToday = dayItem.day.toLowerCase() === todayName.toLowerCase();

                        return (
                          <div
                            key={dayItem.day}
                            className={`flex items-center justify-between px-3 py-2 text-xs transition-colors ${
                              isToday
                                ? 'bg-[#EAE4D7] text-[#211F1D] font-bold border-l-3 border-l-[#4A5843]'
                                : 'text-[#484237] hover:bg-[#F3EFE7]'
                            }`}
                          >
                            <div className="flex items-center gap-1.5">
                              <span className="font-medium sm:w-20">{dayItem.shortDay}</span>
                              <span className="hidden sm:inline font-medium">({dayItem.day})</span>
                              {isToday && (
                                <span className="text-[9px] text-[#3D4A38] uppercase tracking-wider font-extrabold bg-[#DBD3C3] px-1.5 py-0.2 rounded-xs">
                                  Today
                                </span>
                              )}
                            </div>

                            {isEditing ? (
                              <input
                                type="text"
                                value={dayItem.hours}
                                onChange={(e) => handleScheduleHourChange(index, e.target.value)}
                                className="bg-white border border-[#DDD5C7] px-2 py-1 text-xs text-right text-[#211F1D] focus:outline-hidden focus:border-[#4A5843]"
                              />
                            ) : (
                              <span
                                className={`tabular-nums text-right ${
                                  dayItem.isClosed ? 'text-[#8E8474] italic' : 'text-[#2B2720] font-semibold'
                                }`}
                              >
                                {dayItem.hours}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Direct Phone Call & Text Action Buttons - Large Mobile Touch Targets */}
                <div className="mt-6 pt-5 border-t border-[#E8E1D5]">
                  <div className="grid grid-cols-2 gap-2.5">
                    <a
                      href={`tel:${currentData.phoneRaw}`}
                      className="flex items-center justify-center gap-2 min-h-[46px] bg-[#4A5843] hover:bg-[#3D4937] active:scale-[0.98] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-xs rounded-xs"
                    >
                      <Phone className="w-4 h-4 text-[#E0B275]" />
                      <span>Call {currentData.name}</span>
                    </a>

                    <a
                      href={`sms:${currentData.phoneRaw}`}
                      className="flex items-center justify-center gap-2 min-h-[46px] bg-[#FAF8F5] hover:bg-[#F2EDE3] active:scale-[0.98] text-[#211F1D] text-xs font-bold uppercase tracking-wider border border-[#DDD5C7] transition-all shadow-2xs rounded-xs"
                    >
                      <MessageSquare className="w-4 h-4 text-[#4A5843]" />
                      <span>Text {currentData.name}</span>
                    </a>
                  </div>

                  <p className="text-[11px] text-center text-[#6B6252] mt-2.5">
                    Call or text {currentData.name} directly at{' '}
                    <span className="text-[#211F1D] font-bold tabular-nums">{currentData.phone}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
