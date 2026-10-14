import React from 'react';
import { Zap, Trophy, Play, Flame, Star, Sparkles } from 'lucide-react';

export const TickerMarquee: React.FC = () => {
  const items = [
    { text: 'NOVO RECORDE NA ÁREA', icon: Trophy },
    { text: '100% NO NAVEGADOR', icon: Play },
    { text: 'ZERO DOWNLOADS', icon: Zap },
    { text: 'APERTE START', icon: Flame },
    { text: 'JOGOS AUTORAIS', icon: Star },
    { text: 'MODO ARCADE ATIVADO', icon: Sparkles },
    { text: 'CONTROLE TOTAL & JUICE', icon: Zap },
    { text: 'ATUALIZAÇÕES SEMANAIS', icon: Trophy },
  ];

  return (
    <div className="relative z-20 py-4 -my-2 overflow-hidden bg-transparent pointer-events-none select-none">
      <div className="w-[105vw] -ml-[2.5vw] bg-[#bfff04] text-black py-2.5 shadow-2xl -rotate-1 sm:-rotate-2 border-y-2 border-black/40 overflow-hidden">
        <div className="animate-marquee flex items-center whitespace-nowrap">
          {/* Repeated sets to guarantee endless seamless loop */}
          {[...items, ...items, ...items, ...items].map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div key={index} className="flex items-center mx-5 sm:mx-8 gap-3">
                <IconComponent className="w-4 h-4 fill-black stroke-[2.5]" />
                <span className="font-arcade text-xs sm:text-sm tracking-wider font-black">
                  {item.text}
                </span>
                <span className="text-black/40 font-bold">★</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
