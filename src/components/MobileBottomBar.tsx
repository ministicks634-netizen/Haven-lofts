import React from 'react';
import { Phone, MessageSquare } from 'lucide-react';
import { Stylist } from '../types.ts';

interface MobileBottomBarProps {
  stylists: Stylist[];
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({ stylists }) => {
  const sara = stylists.find((s) => s.id === 'sara' || s.id === 'sarah');
  const leah = stylists.find((s) => s.id === 'leah');

  return (
    <aside
      aria-label="Mobile quick call bar"
      className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#FAF7F2]/95 backdrop-blur-md border-t border-[#D5CCBC] px-3 pt-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] shadow-xl"
    >
      <div className="grid grid-cols-2 gap-2 max-w-md mx-auto">
        {/* Sara Quick Action */}
        <div className="flex items-center gap-1">
          <a
            href={`tel:${sara?.phoneRaw || '9523568214'}`}
            className="flex-1 flex items-center justify-center gap-1.5 h-11 bg-[#4A5843] active:bg-[#3B4735] text-white text-xs font-bold uppercase rounded-xs shadow-xs"
          >
            <Phone className="w-3.5 h-3.5 text-[#E0B275]" />
            <span>Call Sara</span>
          </a>
          <a
            href={`sms:${sara?.phoneRaw || '9523568214'}`}
            className="flex items-center justify-center w-11 h-11 bg-white active:bg-[#EFEAE0] text-[#4A5843] border border-[#DDD5C7] rounded-xs shadow-2xs"
            aria-label="Text Sara"
          >
            <MessageSquare className="w-4 h-4" />
          </a>
        </div>

        {/* Leah Quick Action */}
        <div className="flex items-center gap-1">
          <a
            href={`tel:${leah?.phoneRaw || '9523568215'}`}
            className="flex-1 flex items-center justify-center gap-1.5 h-11 bg-[#4A5843] active:bg-[#3B4735] text-white text-xs font-bold uppercase rounded-xs shadow-xs"
          >
            <Phone className="w-3.5 h-3.5 text-[#E0B275]" />
            <span>Call Leah</span>
          </a>
          <a
            href={`sms:${leah?.phoneRaw || '9523568215'}`}
            className="flex items-center justify-center w-11 h-11 bg-white active:bg-[#EFEAE0] text-[#4A5843] border border-[#DDD5C7] rounded-xs shadow-2xs"
            aria-label="Text Leah"
          >
            <MessageSquare className="w-4 h-4" />
          </a>
        </div>
      </div>
    </aside>
  );
};
