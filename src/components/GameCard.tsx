import React, { useState } from 'react';
import { Play, Sparkles, Gamepad } from 'lucide-react';
import { Game } from '../types/game';
import { getGameVisualTheme } from '../utils/theme';
import { arcadeSound } from '../utils/sound';

interface GameCardProps {
  game: Game;
  index: number;
}

export const GameCard: React.FC<GameCardProps> = ({ game, index }) => {
  const [imageError, setImageError] = useState(false);
  const theme = getGameVisualTheme(game, index);
  // Alternating playful tilt on hover
  const tiltClass = index % 2 === 0 ? 'group-hover:-rotate-1' : 'group-hover:rotate-1';

  const handleOpenGame = (e: React.MouseEvent) => {
    e.stopPropagation();
    arcadeSound.playStart();
    window.open(game.link, '_blank', 'noopener,noreferrer');
  };

  const handleCardClick = () => {
    arcadeSound.playClick();
    window.open(game.link, '_blank', 'noopener,noreferrer');
  };

  return (
    <article
      onClick={handleCardClick}
      onMouseEnter={() => arcadeSound.playHover()}
      className={`group relative flex flex-col rounded-3xl bg-[#0d122b] border border-[#1e254a] hover:border-slate-400/50 transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-2.5 ${tiltClass} cursor-pointer overflow-hidden`}
      style={{
        boxShadow: `0 10px 25px -5px rgba(0, 0, 0, 0.5)`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Dynamic background subtle gradient wash matching game theme */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${theme.fromColor}22, transparent 70%)`,
        }}
      />

      {/* Capa Area with Juice Shine-Sweep */}
      <div className="relative aspect-video w-full overflow-hidden bg-[#13193a] shine-sweep">
        {game.image && !imageError ? (
          <img
            src={game.image}
            alt={`Capa do jogo ${game.title}`}
            referrerPolicy="no-referrer"
            loading="lazy"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          /* Procedural fallback artwork if no image or if image load fails */
          <div
            className="w-full h-full flex flex-col items-center justify-center p-6 text-center relative"
            style={{
              background: `linear-gradient(135deg, ${theme.fromColor}30, ${theme.toColor}20, #0d122b)`,
            }}
          >
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-2 shadow-lg transition-transform duration-300 group-hover:scale-110"
              style={{
                background: `linear-gradient(135deg, ${theme.fromColor}, ${theme.toColor})`,
              }}
            >
              <Gamepad className="w-8 h-8 text-black stroke-[2.2]" />
            </div>
            <span className="font-arcade text-base sm:text-lg text-white tracking-wider line-clamp-1">
              {game.title}
            </span>
            <span
              className="text-xs font-semibold mt-0.5 line-clamp-1"
              style={{ color: theme.accentColor }}
            >
              {game.subtitle}
            </span>
          </div>
        )}

        {/* Gradient shadow overlay for badge & text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d122b] via-transparent to-black/30 pointer-events-none" />

        {/* Top Badges: Pílula do gênero e selo ★ Destaque */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
          {/* Pílula do gênero */}
          <span className="px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-[#080b18]/85 text-slate-200 border border-slate-700/80 backdrop-blur-md">
            {game.genero}
          </span>

          {/* Selo ★ Destaque quando destaque é verdadeiro */}
          {game.destaque && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-gradient-to-r from-[#ff5e5b] to-[#ff8c42] text-white shadow-md shadow-[#ff5e5b]/40">
              <Sparkles className="w-3 h-3 fill-white" />
              ★ Destaque
            </span>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between space-y-4">
        <div className="space-y-2">
          {/* Title */}
          <h3 className="font-arcade text-xl sm:text-2xl text-white tracking-wide group-hover:text-[#bfff04] transition-colors leading-snug">
            {game.title}
          </h3>

          {/* Subtitle */}
          <p
            className="text-xs sm:text-sm font-semibold tracking-wide"
            style={{ color: theme.accentColor }}
          >
            {game.subtitle}
          </p>

          {/* Description limitada a 3 linhas */}
          <p className="text-slate-300 text-sm leading-relaxed line-clamp-3 font-normal pt-1">
            {game.description}
          </p>
        </div>

        {/* Footer of Card: Tags & Play Button */}
        <div className="pt-3 border-t border-[#1e254a]/70 flex items-center justify-between gap-3">
          {/* Até 3 tags */}
          <div className="flex flex-wrap items-center gap-1.5 overflow-hidden">
            {game.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-[#161d40] text-slate-300 border border-slate-700/50"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Botão ▶ que abre o link em nova aba */}
          <button
            onClick={handleOpenGame}
            title={`Jogar ${game.title} em nova aba`}
            aria-label={`Jogar ${game.title}`}
            className="w-11 h-11 shrink-0 rounded-2xl bg-[#1a2350] hover:bg-[#bfff04] text-white hover:text-black border border-slate-700/60 hover:border-[#bfff04] flex items-center justify-center transition-all duration-200 shadow-md group-hover:shadow-lg group-hover:shadow-[#bfff04]/30 cursor-pointer"
          >
            <Play className="w-5 h-5 fill-current ml-0.5 transform transition-transform duration-200 group-hover:scale-125 group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </article>
  );
};
