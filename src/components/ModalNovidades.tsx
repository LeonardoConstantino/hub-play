import React from 'react';
import { X, Flame, Sparkles, Trophy, Calendar, Zap, CheckCircle2 } from 'lucide-react';
import { arcadeSound } from '../utils/sound';

interface ModalNovidadesProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalNovidades: React.FC<ModalNovidadesProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleClose = () => {
    arcadeSound.playClick();
    onClose();
  };

  const updates = [
    {
      title: 'Lançamento de Cyber Runner ⚡',
      category: 'NOVO JOGO',
      date: 'Outubro 2026',
      badgeColor: 'text-[#bfff04] bg-[#bfff04]/10 border-[#bfff04]/30',
      description: 'Novo modo turbo desbloqueado com trilhas de neon hipervelozes e rankings semanais.',
    },
    {
      title: 'Nova Camada de Juice e Efeitos 🧃',
      category: 'ATUALIZAÇÃO DE SISTEMA',
      date: 'Recentemente',
      badgeColor: 'text-[#ff5e5b] bg-[#ff5e5b]/10 border-[#ff5e5b]/30',
      description: 'Micro-interações aprimoradas, efeitos de inclinação dinâmica, reflexos suaves nos cards e áudio arcade sintético via Web Audio.',
    },
    {
      title: 'Suporte a Gamepads USB / Bluetooth 🎮',
      category: 'RECURSO',
      date: 'Em breve',
      badgeColor: 'text-[#38bdf8] bg-[#38bdf8]/10 border-[#38bdf8]/30',
      description: 'Conecte qualquer controle compatível para jogar Astro Blitz e Void Breaker com precisão de fliperama.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div
        className="relative w-full max-w-xl rounded-3xl bg-[#0c1026] border border-[#1e254a] p-6 sm:p-8 shadow-2xl text-left overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Glow ambient background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff5e5b]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-start justify-between pb-6 border-b border-[#1e254a]">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-arcade text-[#ff5e5b] tracking-wider">
              <Flame className="w-4 h-4 fill-[#ff5e5b]" />
              FEED DO HUB
            </div>
            <h3 className="font-arcade text-2xl text-white tracking-wide">
              NOVIDADES & ATUALIZAÇÕES
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

        {/* Update List */}
        <div className="py-6 space-y-4 max-h-[60vh] overflow-y-auto pr-1">
          {updates.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-[#0f1430] border border-[#1a2145] hover:border-slate-600 transition-colors space-y-2"
            >
              <div className="flex items-center justify-between gap-2">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${item.badgeColor}`}>
                  {item.category}
                </span>
                <span className="text-xs text-slate-500 font-mono">{item.date}</span>
              </div>
              <h4 className="font-arcade text-base text-white">{item.title}</h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-[#1e254a] flex items-center justify-between text-xs text-slate-400">
          <span>Mais novidades a caminho a cada semana.</span>
          <button
            onClick={handleClose}
            className="px-5 py-2.5 rounded-xl bg-[#ff5e5b] text-white font-arcade text-xs font-bold hover:bg-[#ff726f] transition-colors cursor-pointer"
          >
            ENTENDI!
          </button>
        </div>
      </div>
    </div>
  );
};
