import React, { useState, useEffect } from 'react';
import { Play, Sparkles, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { Game } from '../types/game';
import { getGameVisualTheme } from '../utils/theme';
import { arcadeSound } from '../utils/sound';

interface HeroFeaturedProps {
  games: Game[];
}

export const HeroFeatured: React.FC<HeroFeaturedProps> = ({ games }) => {
  const featuredGames = games.filter((g) => g.destaque);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [heroImgError, setHeroImgError] = useState(false);

  useEffect(() => {
    setHeroImgError(false);
  }, [currentIndex]);

  // Auto-advance every 6.5 seconds when not hovered
  useEffect(() => {
    if (featuredGames.length <= 1 || isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredGames.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [featuredGames.length, isPaused]);

  if (featuredGames.length === 0) return null;

  const currentGame = featuredGames[currentIndex] || featuredGames[0];
  const theme = getGameVisualTheme(currentGame, currentIndex);

  const handleSelectGame = (index: number) => {
    arcadeSound.playSwitch();
    setCurrentIndex(index);
  };

  const handleNext = () => {
    arcadeSound.playSwitch();
    setCurrentIndex((prev) => (prev + 1) % featuredGames.length);
  };

  const handlePrev = () => {
    arcadeSound.playSwitch();
    setCurrentIndex((prev) => (prev - 1 + featuredGames.length) % featuredGames.length);
  };

  const handlePlayNow = () => {
    arcadeSound.playStart();
    window.open(currentGame.link, '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      className="relative overflow-hidden pt-8 pb-16 lg:py-20 arcade-grid-bg"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Decorative ambient radial glows */}
      <div
        className="absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-[120px] pointer-events-none opacity-40 transition-colors duration-700"
        style={{ backgroundColor: theme.fromColor }}
      />
      <div
        className="absolute top-1/3 -right-32 w-96 h-96 rounded-full blur-[140px] pointer-events-none opacity-30 transition-colors duration-700"
        style={{ backgroundColor: theme.toColor }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Game Info & CTA */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            {/* Badge: ★ EM DESTAQUE · gênero */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase border border-[#bfff04]/30 bg-[#0e1430]/90 text-white backdrop-blur-sm shadow-sm">
              <span className="text-[#bfff04] flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 fill-[#bfff04]" />
                EM DESTAQUE
              </span>
              <span className="text-slate-500">·</span>
              <span className="text-slate-300 font-medium">{currentGame.genero}</span>
            </div>

            {/* Big Arcade Title */}
            <h1 className="font-arcade text-3xl sm:text-5xl lg:text-6xl text-white tracking-wide leading-tight drop-shadow-md">
              {currentGame.title}
            </h1>

            {/* Subtitle in Verde-Limão */}
            <p className="text-lg sm:text-xl font-bold text-[#bfff04] tracking-wide flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#bfff04] inline-block animate-ping opacity-75" />
              {currentGame.subtitle}
            </p>

            {/* Description */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl font-light">
              {currentGame.description}
            </p>

            {/* CTA and Dots Row */}
            <div className="pt-2 flex flex-wrap items-center gap-6 sm:gap-8 w-full">
              {/* Button "JOGAR AGORA" with Juice (pulses, lifts on hover, sinks on click) */}
              <button
                onClick={handlePlayNow}
                onMouseEnter={() => arcadeSound.playHover()}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#bfff04] to-[#a3e635] text-black font-arcade text-base sm:text-lg font-bold tracking-wider shadow-lg shadow-[#bfff04]/30 hover:shadow-[#bfff04]/60 hover:-translate-y-1 active:translate-y-1 active:scale-95 transition-all duration-200 cursor-pointer overflow-hidden"
              >
                {/* Subtle sheen highlight */}
                <span className="absolute inset-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
                <Play className="w-5 h-5 fill-black group-hover:scale-125 transition-transform duration-200" />
                <span>JOGAR AGORA</span>
                <ExternalLink className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
              </button>

              {/* Bolinhas para alternar entre os jogos em destaque */}
              <div className="flex items-center gap-3 bg-[#111736]/80 px-4 py-2.5 rounded-2xl border border-slate-700/60 backdrop-blur-sm">
                <button
                  onClick={handlePrev}
                  className="text-slate-400 hover:text-white p-1 transition-colors cursor-pointer"
                  aria-label="Jogo anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2.5">
                  {featuredGames.map((game, idx) => {
                    const isActive = idx === currentIndex;
                    return (
                      <button
                        key={game.title + idx}
                        onClick={() => handleSelectGame(idx)}
                        onMouseEnter={() => arcadeSound.playHover()}
                        className={`transition-all duration-300 rounded-full cursor-pointer relative ${
                          isActive
                            ? 'w-7 h-3 bg-[#bfff04] shadow-sm shadow-[#bfff04]'
                            : 'w-3 h-3 bg-slate-600 hover:bg-slate-400'
                        }`}
                        title={game.title}
                        aria-label={`Ver destaque ${idx + 1}: ${game.title}`}
                      />
                    );
                  })}
                </div>

                <button
                  onClick={handleNext}
                  className="text-slate-400 hover:text-white p-1 transition-colors cursor-pointer"
                  aria-label="Próximo jogo"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Floating Cover & Tags */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end">
            <div className="w-full max-w-md relative group">
              {/* Backing neon aura glow */}
              <div
                className="absolute -inset-1 rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `linear-gradient(135deg, ${theme.fromColor}, ${theme.toColor})`,
                }}
              />

              {/* Floating Container */}
              <div className="relative rounded-3xl overflow-hidden bg-[#0e1329] border-2 border-white/10 shadow-2xl animate-float shine-sweep">
                <div className="aspect-video w-full bg-[#121838] relative overflow-hidden flex items-center justify-center">
                  {currentGame.image && !heroImgError ? (
                    <img
                      src={currentGame.image}
                      alt={`Capa do jogo ${currentGame.title}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={() => setHeroImgError(true)}
                    />
                  ) : (
                    /* Fallback procedural decorative artwork if image fails or is empty */
                    <div
                      className="w-full h-full flex flex-col items-center justify-center p-6 text-center"
                      style={{
                        background: `linear-gradient(135deg, ${theme.fromColor}35, ${theme.toColor}25, #0e1329)`,
                      }}
                    >
                      <div
                        className="w-20 h-20 rounded-2xl flex items-center justify-center mb-3 shadow-lg"
                        style={{ background: `linear-gradient(135deg, ${theme.fromColor}, ${theme.toColor})` }}
                      >
                        <Play className="w-9 h-9 fill-black text-black ml-1" />
                      </div>
                      <span className="font-arcade text-xl text-white tracking-wider">{currentGame.title}</span>
                      <span className="text-xs font-semibold mt-1" style={{ color: theme.accentColor }}>{currentGame.subtitle}</span>
                    </div>
                  )}

                  {/* Dark subtle vignette for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e1329] via-transparent to-transparent opacity-60 pointer-events-none" />

                  {/* Top-right corner tag */}
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-[11px] font-mono text-[#bfff04] border border-[#bfff04]/30">
                    START READY
                  </div>
                </div>
              </div>

              {/* Tags underneath the cover */}
              <div className="w-full mt-4 flex flex-wrap items-center justify-center lg:justify-start gap-2">
                {currentGame.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-lg text-xs font-medium bg-[#141a38]/80 text-slate-300 border border-slate-700/60"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
