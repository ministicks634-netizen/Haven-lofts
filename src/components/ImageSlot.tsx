import React from 'react';
import { Camera, Image as ImageIcon } from 'lucide-react';

interface ImageSlotProps {
  imageKey?: string;
  label: string;
  aspectRatioClass?: string;
  aspectBadge?: string;
  sublabel?: string;
  className?: string;
  imageSrc?: string;
}

export const ImageSlot: React.FC<ImageSlotProps> = ({
  label,
  aspectRatioClass = 'aspect-[4/3]',
  aspectBadge,
  sublabel,
  className = '',
  imageSrc,
}) => {
  return (
    <div
      className={`relative overflow-hidden border border-[#DCD5C9] bg-[#F7F4ED] ${aspectRatioClass} ${className}`}
    >
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={label}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      ) : (
        // Clean, elegant blank placeholder frame
        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center select-none bg-[#F7F4ED] relative">
          {/* Subtle architectural border */}
          <div className="absolute inset-2.5 border border-dashed border-[#D5CCBC] pointer-events-none rounded-xs" />

          {/* Clean minimal icon */}
          <div className="w-11 h-11 rounded-full border border-[#D5CCBC] bg-white flex items-center justify-center text-[#786E5E] mb-2.5 shadow-2xs">
            <Camera className="w-4 h-4" />
          </div>

          <span className="font-serif-display text-base sm:text-lg tracking-wide text-[#2B2927] font-medium">
            {label}
          </span>

          <span className="text-[11px] text-[#8C8272] tracking-wider uppercase mt-1">
            {sublabel || 'Photo Coming Soon'}
          </span>

          {aspectBadge && (
            <div className="absolute bottom-3 text-[10px] text-[#A89E8D] tracking-wider uppercase font-medium">
              {aspectBadge}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
