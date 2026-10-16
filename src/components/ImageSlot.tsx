import React, { useRef, useState, useEffect } from 'react';
import { Camera, Upload, Trash2, Check, Sparkles } from 'lucide-react';
import { getStoredImage, setStoredImage, removeStoredImage } from '../utils/storage.ts';

interface ImageSlotProps {
  imageKey: string;
  label: string;
  aspectRatioClass?: string;
  aspectBadge?: string;
  sublabel?: string;
  className?: string;
  defaultConceptImage?: string;
  onUploaded?: (dataUrl: string) => void;
}

export const ImageSlot: React.FC<ImageSlotProps> = ({
  imageKey,
  label,
  aspectRatioClass = 'aspect-[4/3]',
  aspectBadge = 'Recommended 4:3',
  sublabel = 'Click to import photo',
  className = '',
  defaultConceptImage,
  onUploaded,
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isSuccessToast, setIsSuccessToast] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const stored = getStoredImage(imageKey);
    setImageUrl(stored);

    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<{ key: string; dataUrl: string | null }>;
      if (customEvent.detail?.key === imageKey) {
        setImageUrl(customEvent.detail.dataUrl);
      }
    };

    const handleCleared = () => {
      setImageUrl(null);
    };

    window.addEventListener('haven-lofts-image-updated', handleUpdate);
    window.addEventListener('haven-lofts-images-cleared', handleCleared);
    return () => {
      window.removeEventListener('haven-lofts-image-updated', handleUpdate);
      window.removeEventListener('haven-lofts-images-cleared', handleCleared);
    };
  }, [imageKey]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (JPEG, PNG, WebP, etc.).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        const ok = setStoredImage(imageKey, dataUrl);
        if (ok) {
          setImageUrl(dataUrl);
          setIsSuccessToast(true);
          setTimeout(() => setIsSuccessToast(false), 2500);
          onUploaded?.(dataUrl);
        } else {
          alert('Image file is large. Please select a compressed JPG or PNG under 4MB.');
        }
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    removeStoredImage(imageKey);
    setImageUrl(null);
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  const activeImage = imageUrl || defaultConceptImage;
  const isCustomUploaded = !!imageUrl;

  return (
    <div
      className={`relative group overflow-hidden border border-[#DCD5C9] bg-[#F7F4ED] transition-all duration-300 hover:border-[#4A5843] ${aspectRatioClass} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
        aria-label={`Import photo for ${label}`}
      />

      {activeImage ? (
        // Render Active Image (Either user uploaded or Boho aesthetic reference)
        <div className="relative w-full h-full">
          <img
            src={activeImage}
            alt={label}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            referrerPolicy="no-referrer"
          />

          {/* Aesthetic Badge if concept preview */}
          {!isCustomUploaded && (
            <div className="absolute bottom-2.5 left-2.5 bg-[#2B3527]/85 text-[#F5F2EB] text-[10px] px-2 py-0.5 tracking-wider uppercase backdrop-blur-xs flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-[#D4A373]" />
              <span>Inspiration Vibe · Click to Upload Yours</span>
            </div>
          )}

          {/* Scrim Overlay on Hover */}
          <div
            className={`absolute inset-0 bg-[#1F241C]/75 backdrop-blur-xs flex flex-col items-center justify-center gap-3 p-4 transition-opacity duration-200 ${
              isHovered ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
          >
            <p className="text-xs uppercase tracking-widest text-[#F5F2EB] font-medium text-center">{label}</p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={triggerUpload}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#4A5843] hover:bg-[#3D4937] text-white text-xs font-semibold tracking-wider uppercase transition-colors shadow-sm"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>{isCustomUploaded ? 'Replace Photo' : 'Upload Real Photo'}</span>
              </button>
              {isCustomUploaded && (
                <button
                  type="button"
                  onClick={handleRemove}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2D3328] hover:bg-[#20251C] text-neutral-200 text-xs font-medium tracking-wider uppercase transition-colors"
                  title="Remove uploaded photo"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        // Empty Boho Framing Frame
        <div
          onClick={triggerUpload}
          className="w-full h-full flex flex-col items-center justify-center p-6 text-center cursor-pointer select-none bg-[#F7F4ED] hover:bg-[#EFEAE0] transition-colors relative"
        >
          {/* Subtle boho arched inner line */}
          <div className="absolute inset-2 border border-dashed border-[#D5CCBC] pointer-events-none" />

          {/* Center Graphic */}
          <div className="w-12 h-12 rounded-full border border-[#D5CCBC] bg-white flex items-center justify-center text-[#4A5843] group-hover:text-[#3D4937] group-hover:border-[#4A5843] transition-colors mb-3 shadow-xs">
            <Camera className="w-5 h-5" />
          </div>

          <span className="font-serif-display text-lg tracking-wide text-[#2B2927] group-hover:text-[#181716] transition-colors font-medium">
            {label}
          </span>

          <p className="text-xs text-[#6F675A] mt-1 max-w-[200px] leading-relaxed">
            {sublabel}
          </p>

          <div className="mt-3.5 inline-flex items-center gap-1.5 px-3 py-1 text-[11px] uppercase tracking-wider text-[#3D4937] bg-white border border-[#D5CCBC] group-hover:border-[#4A5843] group-hover:bg-[#FAF8F5] transition-colors shadow-2xs">
            <Upload className="w-3 h-3 text-[#4A5843]" />
            <span>Import Photo</span>
          </div>

          <div className="absolute bottom-3 text-[10px] text-[#8C8272] tracking-wider uppercase">
            {aspectBadge}
          </div>
        </div>
      )}

      {/* Success indicator toast */}
      {isSuccessToast && (
        <div className="absolute top-3 right-3 bg-[#3D4937] text-white text-xs px-2.5 py-1 flex items-center gap-1.5 shadow-md z-20 animate-fade-in">
          <Check className="w-3 h-3 text-[#E0B275]" />
          <span>Imported</span>
        </div>
      )}
    </div>
  );
};
