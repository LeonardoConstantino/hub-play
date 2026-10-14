import React, { useState } from 'react';
import { Gamepad2, Volume2, VolumeX, Menu, X, Sparkles } from 'lucide-react';
import { arcadeSound } from '../utils/sound';

interface NavbarProps {
  onOpenNovidades: () => void;
  onOpenSobre: () => void;
  onScrollToCatalog: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenNovidades,
  onOpenSobre,
  onScrollToCatalog,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(arcadeSound.enabled);

  const toggleSound = () => {
    const newState = arcadeSound.toggleSound();
    setSoundEnabled(newState);
  };

  const handleNavClick = (action: () => void) => {
    arcadeSound.playClick();
    action();
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#080b18]/85 border-b border-[#1e254a]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Zone */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            arcadeSound.playClick();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onMouseEnter={() => arcadeSound.playHover()}
          className="flex items-center gap-3 group whitespace-nowrap shrink-0"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#bfff04] to-[#10b981] flex items-center justify-center text-black shadow-lg shadow-[#bfff04]/20 group-hover:scale-105 group-hover:rotate-3 transition-transform duration-200">
            <Gamepad2 className="w-6 h-6 stroke-[2.4]" />
          </div>
          <span className="font-arcade text-2xl sm:text-3xl text-white tracking-wider group-hover:text-[#bfff04] transition-colors">
            HUB<span className="text-[#bfff04]">.</span>PLAY
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <button
            onClick={() => handleNavClick(onScrollToCatalog)}
            onMouseEnter={() => arcadeSound.playHover()}
            className="text-slate-300 hover:text-[#bfff04] transition-colors relative py-1 group cursor-pointer"
          >
            Jogos
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#bfff04] transition-all duration-200 group-hover:w-full" />
          </button>
          <button
            onClick={() => handleNavClick(onOpenNovidades)}
            onMouseEnter={() => arcadeSound.playHover()}
            className="text-slate-300 hover:text-[#ff5e5b] transition-colors relative py-1 group cursor-pointer"
          >
            Novidades
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#ff5e5b] transition-all duration-200 group-hover:w-full" />
          </button>
          <button
            onClick={() => handleNavClick(onOpenSobre)}
            onMouseEnter={() => arcadeSound.playHover()}
            className="text-slate-300 hover:text-white transition-colors relative py-1 group cursor-pointer"
          >
            Sobre
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-200 group-hover:w-full" />
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Sound Toggle Juice Button */}
          <button
            onClick={toggleSound}
            onMouseEnter={() => arcadeSound.playHover()}
            className={`p-2.5 rounded-xl border transition-all duration-200 cursor-pointer ${
              soundEnabled
                ? 'bg-[#141a38] border-[#bfff04]/40 text-[#bfff04] hover:bg-[#bfff04]/10 shadow-sm'
                : 'bg-[#101426] border-slate-700/50 text-slate-500 hover:text-slate-300'
            }`}
            title={soundEnabled ? 'Sons ativados (Clique para silenciar)' : 'Sons desativados (Clique para ativar)'}
            aria-label="Alternar efeitos sonoros"
          >
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>

          {/* Catalog CTA */}
          <button
            onClick={() => handleNavClick(onScrollToCatalog)}
            onMouseEnter={() => arcadeSound.playHover()}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#bfff04] to-[#a3e635] text-black font-arcade text-xs tracking-wider font-bold shadow-lg shadow-[#bfff04]/20 hover:shadow-[#bfff04]/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
          >
            <Sparkles className="w-4 h-4 fill-black" />
            CATÁLOGO
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => {
              arcadeSound.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="md:hidden p-2.5 rounded-xl bg-[#141a38] border border-slate-700 text-slate-200 hover:text-white cursor-pointer"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#1e254a] bg-[#0c1024]/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col gap-2">
            <button
              onClick={() => handleNavClick(onScrollToCatalog)}
              className="text-left px-4 py-3 rounded-lg text-slate-200 font-medium hover:bg-[#151c3c] hover:text-[#bfff04] transition-colors flex items-center justify-between"
            >
              <span>🎮 Jogos</span>
              <span className="text-xs text-slate-500">Explorar</span>
            </button>
            <button
              onClick={() => handleNavClick(onOpenNovidades)}
              className="text-left px-4 py-3 rounded-lg text-slate-200 font-medium hover:bg-[#151c3c] hover:text-[#ff5e5b] transition-colors flex items-center justify-between"
            >
              <span>🔥 Novidades</span>
              <span className="text-xs text-[#ff5e5b]">Atualizações</span>
            </button>
            <button
              onClick={() => handleNavClick(onOpenSobre)}
              className="text-left px-4 py-3 rounded-lg text-slate-200 font-medium hover:bg-[#151c3c] hover:text-white transition-colors flex items-center justify-between"
            >
              <span>🕹️ Sobre o HUB.PLAY</span>
              <span className="text-xs text-slate-500">Nossa missão</span>
            </button>
          </div>
          <button
            onClick={() => handleNavClick(onScrollToCatalog)}
            className="w-full mt-2 py-3 rounded-xl bg-[#bfff04] text-black font-arcade text-xs text-center font-bold tracking-wider"
          >
            VER TODOS OS JOGOS
          </button>
        </div>
      )}
    </header>
  );
};
