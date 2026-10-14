import React from 'react';
import { ArrowUp, Gamepad2, Heart, Sparkles } from 'lucide-react';
import { arcadeSound } from '../utils/sound';

interface FooterProps {
  onOpenNovidades: () => void;
  onOpenSobre: () => void;
  onScrollToCatalog: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenNovidades,
  onOpenSobre,
  onScrollToCatalog,
}) => {
  const scrollToTop = () => {
    arcadeSound.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-20 border-t border-[#1e254a] bg-[#070914] text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          {/* Brand & Subtitle */}
          <div className="space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#bfff04] to-[#10b981] flex items-center justify-center text-black font-bold">
                <Gamepad2 className="w-5 h-5" />
              </div>
              <span className="font-arcade text-xl text-white tracking-wider">
                HUB<span className="text-[#bfff04]">.</span>PLAY
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm">
              O seu destino arcade definitivo no navegador. Jogos autorais rápidos, bonitos e cheios de adrenalina.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium">
            <button
              onClick={() => {
                arcadeSound.playClick();
                onScrollToCatalog();
              }}
              className="hover:text-[#bfff04] transition-colors cursor-pointer"
            >
              Catálogo de Jogos
            </button>
            <button
              onClick={() => {
                arcadeSound.playClick();
                onOpenNovidades();
              }}
              className="hover:text-[#ff5e5b] transition-colors cursor-pointer"
            >
              Novidades
            </button>
            <button
              onClick={() => {
                arcadeSound.playClick();
                onOpenSobre();
              }}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Sobre o Hub
            </button>
          </div>

          {/* Back to top button */}
          <div>
            <button
              onClick={scrollToTop}
              onMouseEnter={() => arcadeSound.playHover()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#121838] hover:bg-[#1a2350] border border-slate-700/60 text-slate-300 hover:text-white text-xs font-arcade tracking-wider transition-all duration-200 cursor-pointer shadow-sm"
              title="Voltar ao início"
            >
              <span>TOPO</span>
              <ArrowUp className="w-4 h-4 text-[#bfff04]" />
            </button>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-8 pt-8 border-t border-[#13193a] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} HUB.PLAY. Todos os direitos reservados aos criadores.</p>
          <p className="flex items-center gap-1.5 text-slate-400">
            Design arcade moderno com micro-interações fluidas.
          </p>
        </div>
      </div>
    </footer>
  );
};
