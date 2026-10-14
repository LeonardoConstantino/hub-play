import React from 'react';
import { X, Gamepad2, Sparkles, Zap, Heart, ShieldCheck, Code2 } from 'lucide-react';
import { arcadeSound } from '../utils/sound';

interface ModalSobreProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalSobre: React.FC<ModalSobreProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleClose = () => {
    arcadeSound.playClick();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div
        className="relative w-full max-w-xl rounded-3xl bg-[#0c1026] border border-[#1e254a] p-6 sm:p-8 shadow-2xl text-left overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Glow ambient background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#bfff04]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-start justify-between pb-6 border-b border-[#1e254a]">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-arcade text-[#bfff04] tracking-wider">
              <Gamepad2 className="w-4 h-4" />
              MANIFESTO ARCADE
            </div>
            <h3 className="font-arcade text-2xl text-white tracking-wide">
              SOBRE O HUB.PLAY
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

        {/* Modal Body */}
        <div className="py-6 space-y-5 text-slate-300 text-sm leading-relaxed max-h-[60vh] overflow-y-auto pr-1">
          <p>
            O <strong>HUB.PLAY</strong> é um espaço dedicado a jogos autorais e independentes criados para o navegador. Nosso objetivo é resgatar o espírito dos clássicos arcades dos anos 80 e 90 com uma estética contemporânea, foco na jogabilidade e muito <em>juice</em> em cada detalhe.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-[#0f1430] border border-[#1a2145]">
              <div className="flex items-center gap-2 text-white font-semibold text-xs font-arcade mb-1">
                <Zap className="w-4 h-4 text-[#bfff04]" />
                Zero Download
              </div>
              <p className="text-xs text-slate-400">
                Clique e jogue imediatamente sem instaladores pesados ou permissões invasivas.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0f1430] border border-[#1a2145]">
              <div className="flex items-center gap-2 text-white font-semibold text-xs font-arcade mb-1">
                <Sparkles className="w-4 h-4 text-[#ff5e5b]" />
                Juice & Efeitos
              </div>
              <p className="text-xs text-slate-400">
                Animações táteis, feedback auditivo responsivo e transições fluidas pensadas para os jogadores.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0a0e22] border border-[#1e254a]/90 space-y-2">
            <div className="flex items-center gap-2 text-xs font-arcade text-slate-200">
              <Code2 className="w-4 h-4 text-[#38bdf8]" />
              CATÁLOGO DINÂMICO
            </div>
            <p className="text-xs text-slate-400 leading-normal">
              Todos os jogos são alimentados a partir do arquivo central em <code className="text-[#bfff04] bg-black/40 px-1.5 py-0.5 rounded font-mono">data/games.json</code>. Basta adicionar seus novos títulos mantendo a tipagem estrita para que apareçam automaticamente no hub com filtros e cores personalizadas.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-[#1e254a] flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            Feito para quem ama jogar <Heart className="w-3.5 h-3.5 text-[#ff5e5b] fill-[#ff5e5b]" />
          </span>
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
