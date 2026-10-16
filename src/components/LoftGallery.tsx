import React, { useState } from 'react';
import { DoorClosed } from 'lucide-react';
import { LoftSpace } from '../types.ts';
import { ImageSlot } from './ImageSlot.tsx';

interface LoftGalleryProps {
  spaces: LoftSpace[];
}

export const LoftGallery: React.FC<LoftGalleryProps> = ({ spaces }) => {
  const [filter, setFilter] = useState<'all' | 'common' | 'salons' | 'specialty'>('all');

  const filteredSpaces = spaces.filter((space) => {
    if (filter === 'common') {
      return space.id === 'front-desk' || space.id === 'main-hallway';
    }
    if (filter === 'salons') {
      return space.id.startsWith('salon-');
    }
    if (filter === 'specialty') {
      return space.id === 'spray-tanning';
    }
    return true;
  });

  return (
    <section id="space" className="py-14 md:py-20 bg-[#FAF7F2] border-b border-[#E4DDD0] scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 pb-6 sm:pb-10 border-b border-[#E0D7C8]">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#3D4A38] mb-2 font-bold">
              <span>Studio Directory</span>
              <span aria-hidden="true" className="text-[#A89E8D]">·</span>
              <span>The Suites & Rooms</span>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl text-[#211F1D] font-normal">
              The Space
            </h2>
            <p className="text-[#5A5245] text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              Haven Lofts is laid out into private independent suites, a shared main hallway, and dedicated service rooms.
              Room photography will be featured as our build-out wraps up.
            </p>
          </div>
        </div>

        {/* Swipeable Filter Bar on Mobile */}
        <div className="mt-6 sm:mt-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`min-h-[40px] px-4 py-2 text-xs font-bold tracking-wider uppercase transition-colors whitespace-nowrap shrink-0 rounded-xs ${
              filter === 'all'
                ? 'bg-[#4A5843] text-white shadow-xs'
                : 'bg-white text-[#5C5549] border border-[#DDD5C7] hover:border-[#4A5843]'
            }`}
          >
            All Spaces ({spaces.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter('common')}
            className={`min-h-[40px] px-4 py-2 text-xs font-bold tracking-wider uppercase transition-colors whitespace-nowrap shrink-0 rounded-xs ${
              filter === 'common'
                ? 'bg-[#4A5843] text-white shadow-xs'
                : 'bg-white text-[#5C5549] border border-[#DDD5C7] hover:border-[#4A5843]'
            }`}
          >
            Front Desk & Hallway
          </button>
          <button
            type="button"
            onClick={() => setFilter('salons')}
            className={`min-h-[40px] px-4 py-2 text-xs font-bold tracking-wider uppercase transition-colors whitespace-nowrap shrink-0 rounded-xs ${
              filter === 'salons'
                ? 'bg-[#4A5843] text-white shadow-xs'
                : 'bg-white text-[#5C5549] border border-[#DDD5C7] hover:border-[#4A5843]'
            }`}
          >
            Salon Suites (1–4)
          </button>
          <button
            type="button"
            onClick={() => setFilter('specialty')}
            className={`min-h-[40px] px-4 py-2 text-xs font-bold tracking-wider uppercase transition-colors whitespace-nowrap shrink-0 rounded-xs ${
              filter === 'specialty'
                ? 'bg-[#4A5843] text-white shadow-xs'
                : 'bg-white text-[#5C5549] border border-[#DDD5C7] hover:border-[#4A5843]'
            }`}
          >
            Spray Tanning
          </button>
        </div>

        {/* Grid of Generic Spaces */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 mt-6 sm:mt-8">
          {filteredSpaces.map((space) => (
            <div
              key={space.id}
              className="bg-white border border-[#DDD5C7] p-4 sm:p-5 flex flex-col justify-between hover:border-[#4A5843]/60 transition-all shadow-xs rounded-xs group"
            >
              <div>
                {/* Clean blank image slot */}
                <ImageSlot
                  label={space.title}
                  aspectRatioClass="aspect-[4/3]"
                  className="w-full shadow-2xs rounded-xs"
                />

                {/* Information */}
                <div className="mt-3.5 sm:mt-4">
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-[#7A7162] mb-1 font-bold">
                    <span>Haven Lofts</span>
                    <span className="text-[#3D4A38]">{space.aspect}</span>
                  </div>

                  <h3 className="font-serif-display text-xl sm:text-2xl text-[#211F1D] font-normal group-hover:text-[#3D4A38] transition-colors">
                    {space.title}
                  </h3>

                  <p className="text-[#403B33] text-xs sm:text-sm mt-1.5 leading-relaxed">
                    {space.subtitle}
                  </p>

                  <p className="text-[#6F675A] text-xs mt-1.5 leading-relaxed">
                    {space.description}
                  </p>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="mt-4 pt-3 border-t border-[#E8E1D5] flex items-center justify-between text-xs text-[#7A7162]">
                <span className="text-[#403B33] font-medium flex items-center gap-1.5">
                  <DoorClosed className="w-3.5 h-3.5 text-[#4A5843]" />
                  <span>Lakeville, MN</span>
                </span>
                <span className="text-[11px] text-[#7A7162] font-medium">Private Suite</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
