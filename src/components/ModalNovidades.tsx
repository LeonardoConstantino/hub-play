import React from 'react';
import { X, Flame, Sparkles, Play, Zap, ExternalLink } from 'lucide-react';
import { Game } from '../types/game';
import { organizeGames } from '../utils/gameOrder';
import { getGameVisualTheme } from '../utils/theme';
import { arcadeSound } from '../utils/sound';

interface ModalNovidadesProps {
  isOpen: boolean;
  onClose: () => void;
  games: Game[];
}

export const ModalNovidades: React.FC<ModalNovidadesProps> = ({ isOpen, onClose, games }) => {
  if (!isOpen) return null;

  const handleClose = () => {
    arcadeSound.playClick();
    onClose();
  };

  // Uses the same rule: the 3 newest games added to the end of the catalog
  const { latestGames } = organizeGames(games);

  const handlePlayGame = (e: React.MouseEvent, link: string) => {
    e.stopPropagation();
    arcadeSound.playStart();
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div
        className="relative w-full max-w-2xl rounded-3xl bg-[#0c1026] border border-[#1e254a] p-6 sm:p-8 shadow-2xl text-left overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Glow ambient background */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#ff5e5b]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#bfff04]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-start justify-between pb-5 border-b border-[#1e254a]">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-arcade text-[#ff5e5b] tracking-wider">
              <Flame className="w-4 h-4 fill-[#ff5e5b]" />
              FEED DO HUB
            </div>
            <h3 className="font-arcade text-2xl text-white tracking-wide">
              NOVIDADES & LANÇAMENTOS
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-xl bg-[#141a38] text-slate-400 hover:text-white border border-slate-700/60 cursor-pointer transition-colors"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="py-5 space-y-6 max-h-[65vh] overflow-y-auto pr-1">
          {/* Section: 3 Últimos Jogos Adicionados */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-arcade text-[#bfff04] tracking-wider uppercase flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 fill-[#bfff04]" />
                ÚLTIMOS JOGOS ADICIONADOS
              </span>
              <span className="text-[11px] text-slate-400 font-mono">Recém-chegados</span>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {latestGames.map((game, idx) => {
                const theme = getGameVisualTheme(game, idx);
                return (
                  <div
                    key={game.title}
                    className="p-4 rounded-2xl bg-[#0f1430] border border-[#1e254a] hover:border-slate-500 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#bfff04]/15 text-[#d9ff66] border border-[#bfff04]/30">
                          NOVO NO HUB
                        </span>
                        <span className="text-xs text-slate-400">·</span>
                        <span className="text-xs text-slate-400">{game.genero}</span>
                      </div>

                      <h4 className="font-arcade text-lg text-white group-hover:text-[#bfff04] transition-colors">
                        {game.title}
                      </h4>

                      <p className="text-xs font-semibold" style={{ color: theme.accentColor }}>
                        {game.subtitle}
                      </p>

                      <p className="text-xs text-slate-300 leading-relaxed line-clamp-2 pt-0.5">
                        {game.description}
                      </p>
                    </div>

                    <button
                      onClick={(e) => handlePlayGame(e, game.link)}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#bfff04] to-[#a3e635] text-black font-arcade text-xs font-bold tracking-wider hover:shadow-lg hover:shadow-[#bfff04]/30 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer whitespace-nowrap shrink-0"
                    >
                      <Play className="w-3.5 h-3.5 fill-black" />
                      JOGAR AGORA
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section: Sistema & Recursos */}
          <div className="space-y-3 pt-2">
            <span className="text-xs font-arcade text-slate-300 tracking-wider uppercase flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#38bdf8]" />
              ATUALIZAÇÕES DO SISTEMA
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-[#0a0e22] border border-[#1a2145] space-y-1">
                <span className="text-[10px] font-bold text-[#ff5e5b] tracking-wider uppercase">
                  JUICE & VISUAL
                </span>
                <h5 className="font-arcade text-sm text-white">Efeitos Táteis Refinados</h5>
                <p className="text-xs text-slate-400 leading-normal">
                  Reflexos nas capas, inclinações dinâmicas no cursor e áudio arcade com controle de som.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0a0e22] border border-[#1a2145] space-y-1">
                <span className="text-[10px] font-bold text-[#38bdf8] tracking-wider uppercase">
                  CATÁLOGO DINÂMICO
                </span>
                <h5 className="font-arcade text-sm text-white">Novo Critério de Destaques</h5>
                <p className="text-xs text-slate-400 leading-normal">
                  Destaques prioritários no topo, seguidos pelos 3 últimos jogos cadastrados.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-[#1e254a] flex items-center justify-between text-xs text-slate-400">
          <span>Mais novidades a caminho a cada novo commit.</span>
          <button
            onClick={handleClose}
            className="px-5 py-2.5 rounded-xl bg-[#bfff04] text-black font-arcade text-xs font-bold hover:bg-[#caff19] transition-colors cursor-pointer"
          >
            FECHAR
          </button>
        </div>
      </div>
    </div>
  );
};
