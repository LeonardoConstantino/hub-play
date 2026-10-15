import { Game } from '../types/game';

export interface GameVisualTheme {
  fromColor: string;
  toColor: string;
  gradientStyle: string;
  accentColor: string;
  glowShadow: string;
  badgeBg: string;
  badgeText: string;
}

// Curated retro-arcade gradient pairs for each game
export function getGameVisualTheme(game: Game, index: number = 0): GameVisualTheme {
  const title = (game.title || '').toLowerCase();
  const genero = (game.genero || '').toLowerCase();

  // Aftershot: Minimalist ballistic precision & archery neon
  if (title.includes('aftershot')) {
    return {
      fromColor: '#F43F5E',
      toColor: '#BFFF04',
      gradientStyle: 'from-[#F43F5E]/25 via-[#BFFF04]/20 to-[#080B18]',
      accentColor: '#FB7185',
      glowShadow: 'rgba(244, 63, 94, 0.4)',
      badgeBg: 'rgba(244, 63, 94, 0.15)',
      badgeText: '#FECDD3'
    };
  }

  // 1. BomberWeb: Fiery explosive arcade
  if (title.includes('bomber')) {
    return {
      fromColor: '#FF5E5B',
      toColor: '#F59E0B',
      gradientStyle: 'from-[#FF5E5B]/25 via-[#F59E0B]/20 to-[#080B18]',
      accentColor: '#FF7A59',
      glowShadow: 'rgba(255, 94, 91, 0.4)',
      badgeBg: 'rgba(255, 94, 91, 0.15)',
      badgeText: '#FFAAA8'
    };
  }

  // 2. Synth Online: Cyber neon synthwave & drum machine
  if (title.includes('synth')) {
    return {
      fromColor: '#D946EF',
      toColor: '#06B6D4',
      gradientStyle: 'from-[#D946EF]/25 via-[#06B6D4]/20 to-[#080B18]',
      accentColor: '#E879F9',
      glowShadow: 'rgba(217, 70, 239, 0.4)',
      badgeBg: 'rgba(217, 70, 239, 0.15)',
      badgeText: '#F5D0FE'
    };
  }

  // 3. Ring Sync: Reactor Core: High-energy electric reactor
  if (title.includes('ring sync') || title.includes('reactor')) {
    return {
      fromColor: '#BFFF04',
      toColor: '#06B6D4',
      gradientStyle: 'from-[#BFFF04]/25 via-[#06B6D4]/20 to-[#080B18]',
      accentColor: '#BFFF04',
      glowShadow: 'rgba(191, 255, 4, 0.4)',
      badgeBg: 'rgba(191, 255, 4, 0.15)',
      badgeText: '#E4FFA0'
    };
  }

  // 4. Crossroads: Traffic signal amber & emerald
  if (title.includes('crossroads')) {
    return {
      fromColor: '#F59E0B',
      toColor: '#10B981',
      gradientStyle: 'from-[#F59E0B]/25 via-[#10B981]/20 to-[#080B18]',
      accentColor: '#FBBF24',
      glowShadow: 'rgba(245, 158, 11, 0.4)',
      badgeBg: 'rgba(245, 158, 11, 0.15)',
      badgeText: '#FDE68A'
    };
  }

  // 5. Parking Simulator 2D: Racing caution yellow & slate
  if (title.includes('parking')) {
    return {
      fromColor: '#FACC15',
      toColor: '#38BDF8',
      gradientStyle: 'from-[#FACC15]/25 via-[#38BDF8]/20 to-[#080B18]',
      accentColor: '#FDE047',
      glowShadow: 'rgba(250, 204, 21, 0.4)',
      badgeBg: 'rgba(250, 204, 21, 0.15)',
      badgeText: '#FEF08A'
    };
  }

  // 6. Breakout Infinito: 80s arcade neon magenta & violet
  if (title.includes('breakout')) {
    return {
      fromColor: '#A855F7',
      toColor: '#EC4899',
      gradientStyle: 'from-[#A855F7]/25 via-[#EC4899]/20 to-[#080B18]',
      accentColor: '#F472B6',
      glowShadow: 'rgba(236, 72, 153, 0.4)',
      badgeBg: 'rgba(236, 72, 153, 0.15)',
      badgeText: '#FBCFE8'
    };
  }

  // 7. Void Crawler: Glitch cyberpunk matrix lime & purple
  if (title.includes('void crawler')) {
    return {
      fromColor: '#22C55E',
      toColor: '#8B5CF6',
      gradientStyle: 'from-[#22C55E]/25 via-[#8B5CF6]/20 to-[#080B18]',
      accentColor: '#4ADE80',
      glowShadow: 'rgba(34, 197, 94, 0.4)',
      badgeBg: 'rgba(34, 197, 94, 0.15)',
      badgeText: '#BBF7D0'
    };
  }

  // 8. Circuito Vivo: Biopunk electric blue & RNA crimson
  if (title.includes('circuito')) {
    return {
      fromColor: '#06B6D4',
      toColor: '#EF4444',
      gradientStyle: 'from-[#06B6D4]/25 via-[#EF4444]/20 to-[#080B18]',
      accentColor: '#22D3EE',
      glowShadow: 'rgba(6, 182, 212, 0.4)',
      badgeBg: 'rgba(6, 182, 212, 0.15)',
      badgeText: '#A5F3FC'
    };
  }

  // 9. Rope Tangle Puzzle: Warm handcrafted zen wood & amber
  if (title.includes('rope')) {
    return {
      fromColor: '#F59E0B',
      toColor: '#D97706',
      gradientStyle: 'from-[#F59E0B]/25 via-[#D97706]/20 to-[#080B18]',
      accentColor: '#FBBF24',
      glowShadow: 'rgba(245, 158, 11, 0.4)',
      badgeBg: 'rgba(245, 158, 11, 0.15)',
      badgeText: '#FDE68A'
    };
  }

  // 10. Toque de Guerra: 2004 Nokia phone green & nostalgia
  if (title.includes('toque')) {
    return {
      fromColor: '#84CC16',
      toColor: '#10B981',
      gradientStyle: 'from-[#84CC16]/25 via-[#10B981]/20 to-[#080B18]',
      accentColor: '#A3E635',
      glowShadow: 'rgba(132, 204, 22, 0.4)',
      badgeBg: 'rgba(132, 204, 22, 0.15)',
      badgeText: '#D9F99D'
    };
  }

  // 11. Ragdoll Sandbox: Playful physical chaos coral & cyan
  if (title.includes('ragdoll')) {
    return {
      fromColor: '#FB7185',
      toColor: '#38BDF8',
      gradientStyle: 'from-[#FB7185]/25 via-[#38BDF8]/20 to-[#080B18]',
      accentColor: '#FDA4AF',
      glowShadow: 'rgba(251, 113, 133, 0.4)',
      badgeBg: 'rgba(251, 113, 133, 0.15)',
      badgeText: '#FECDD3'
    };
  }

  // 12. O Que Você Esqueceu: Atmospheric charcoal & moody crimson-violet
  if (title.includes('esqueceu')) {
    return {
      fromColor: '#818CF8',
      toColor: '#F43F5E',
      gradientStyle: 'from-[#818CF8]/25 via-[#F43F5E]/20 to-[#080B18]',
      accentColor: '#A5B4FC',
      glowShadow: 'rgba(129, 140, 248, 0.4)',
      badgeBg: 'rgba(129, 140, 248, 0.15)',
      badgeText: '#C7D2FE'
    };
  }

  // 13. Jogo de Pesca: Shimmering deep ocean azure & golden lure
  if (title.includes('pesca')) {
    return {
      fromColor: '#0EA5E9',
      toColor: '#F59E0B',
      gradientStyle: 'from-[#0EA5E9]/25 via-[#F59E0B]/20 to-[#080B18]',
      accentColor: '#38BDF8',
      glowShadow: 'rgba(14, 165, 233, 0.4)',
      badgeBg: 'rgba(14, 165, 233, 0.15)',
      badgeText: '#BAE6FD'
    };
  }

  // 14. ECO: Minimalist sensory rhythm cyan & pure electric white
  if (title.includes('eco')) {
    return {
      fromColor: '#38BDF8',
      toColor: '#818CF8',
      gradientStyle: 'from-[#38BDF8]/25 via-[#818CF8]/20 to-[#080B18]',
      accentColor: '#7DD3FC',
      glowShadow: 'rgba(56, 189, 248, 0.4)',
      badgeBg: 'rgba(56, 189, 248, 0.15)',
      badgeText: '#E0F2FE'
    };
  }

  // 15. Sinuca Master Class: Luxury billiard emerald & warm gold
  if (title.includes('sinuca')) {
    return {
      fromColor: '#10B981',
      toColor: '#D97706',
      gradientStyle: 'from-[#10B981]/25 via-[#D97706]/20 to-[#080B18]',
      accentColor: '#34D399',
      glowShadow: 'rgba(16, 185, 129, 0.4)',
      badgeBg: 'rgba(16, 185, 129, 0.15)',
      badgeText: '#A7F3D0'
    };
  }

  // Genre based fallback
  if (genero.includes('ação')) {
    return {
      fromColor: '#FF5E5B',
      toColor: '#F59E0B',
      gradientStyle: 'from-[#FF5E5B]/25 via-[#F59E0B]/20 to-[#080B18]',
      accentColor: '#FF7A59',
      glowShadow: 'rgba(255, 94, 91, 0.4)',
      badgeBg: 'rgba(255, 94, 91, 0.15)',
      badgeText: '#FFAAA8'
    };
  }

  if (genero.includes('música') || genero.includes('ritmo')) {
    return {
      fromColor: '#D946EF',
      toColor: '#06B6D4',
      gradientStyle: 'from-[#D946EF]/25 via-[#06B6D4]/20 to-[#080B18]',
      accentColor: '#E879F9',
      glowShadow: 'rgba(217, 70, 239, 0.4)',
      badgeBg: 'rgba(217, 70, 239, 0.15)',
      badgeText: '#F5D0FE'
    };
  }

  // General fallback
  const fallbacks: GameVisualTheme[] = [
    {
      fromColor: '#BFFF04',
      toColor: '#059669',
      gradientStyle: 'from-[#BFFF04]/25 via-[#10B981]/20 to-[#080B18]',
      accentColor: '#BFFF04',
      glowShadow: 'rgba(191, 255, 4, 0.4)',
      badgeBg: 'rgba(191, 255, 4, 0.15)',
      badgeText: '#E4FFA0'
    },
    {
      fromColor: '#38BDF8',
      toColor: '#818CF8',
      gradientStyle: 'from-[#38BDF8]/25 via-[#818CF8]/20 to-[#080B18]',
      accentColor: '#38BDF8',
      glowShadow: 'rgba(56, 189, 248, 0.4)',
      badgeBg: 'rgba(56, 189, 248, 0.15)',
      badgeText: '#BAE6FD'
    }
  ];

  return fallbacks[index % fallbacks.length];
}
