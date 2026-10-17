import React, { useState, useMemo } from 'react';
import { Search, X, Sparkles, Filter, AlertCircle, RefreshCw } from 'lucide-react';
import { Game } from '../types/game';
import { GameCard } from './GameCard';
import { arcadeSound } from '../utils/sound';
import { organizeGames } from '../utils/gameOrder';

interface GameCatalogProps {
  games: Game[];
}

export const GameCatalog: React.FC<GameCatalogProps> = ({ games }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('Todos');

  // As abas são geradas sozinhas a partir da primeira parte de genero: "Ação / Arena" -> "Ação"
  const genreTabs = useMemo(() => {
    const genreSet = new Set<string>();
    games.forEach((game) => {
      if (game.genero) {
        const primary = game.genero.split('/')[0].trim();
        if (primary) {
          genreSet.add(primary);
        }
      }
    });
    return ['Todos', ...Array.from(genreSet).sort()];
  }, [games]);

  // Organize catalog: featured first, then 3 newest from the end of the array, then others
  const { sortedGames, latestGames } = useMemo(() => organizeGames(games), [games]);
  const latestTitleSet = useMemo(() => new Set(latestGames.map((g) => g.title)), [latestGames]);

  // Filter games based on search query (title, subtitle, or tags) and selected genre
  const filteredGames = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return sortedGames.filter((game) => {
      // Genre filter
      const primaryGenre = game.genero.split('/')[0].trim();
      const matchesGenre = selectedGenre === 'Todos' || primaryGenre === selectedGenre;
      if (!matchesGenre) return false;

      // Search filter: title, subtitle, or tags
      if (!query) return true;

      const matchesTitle = game.title.toLowerCase().includes(query);
      const matchesSubtitle = game.subtitle.toLowerCase().includes(query);
      const matchesTag = game.tags.some((tag) => tag.toLowerCase().includes(query));

      return matchesTitle || matchesSubtitle || matchesTag;
    });
  }, [sortedGames, searchQuery, selectedGenre]);

  const handleTabClick = (genre: string) => {
    arcadeSound.playSwitch();
    setSelectedGenre(genre);
  };

  const handleClearSearch = () => {
    arcadeSound.playClick();
    setSearchQuery('');
    setSelectedGenre('Todos');
  };

  return (
    <section id="catalogo" className="py-16 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#1e254a]/80">
          <div>
            <div className="flex items-center gap-2 text-xs font-arcade text-[#bfff04] tracking-widest uppercase mb-2">
              <Sparkles className="w-4 h-4 fill-[#bfff04]" />
              CATÁLOGO COMPLETO
            </div>
            <h2 className="font-arcade text-3xl sm:text-4xl text-white tracking-wide">
              ESCOLHA SEU JOGO
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-1">
              Todos os títulos rodam 100% no navegador, sem instalação.
            </p>
          </div>

          {/* Search Box */}
          <div className="w-full md:w-80 relative">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por nome, subtítulo ou tag..."
                className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-[#0e1329] border border-[#1e254a] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#bfff04] focus:ring-1 focus:ring-[#bfff04] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 text-slate-400 hover:text-white p-0.5 cursor-pointer"
                  title="Limpar busca"
                  aria-label="Limpar busca"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Genre Filter Tabs */}
        <div className="py-6 flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none">
          <div className="flex items-center gap-2 p-1 bg-[#0b0f24] rounded-2xl border border-[#1a2144] w-max">
            {genreTabs.map((genre) => {
              const isActive = selectedGenre === genre;
              const count =
                genre === 'Todos'
                  ? games.length
                  : games.filter((g) => g.genero.split('/')[0].trim() === genre).length;

              return (
                <button
                  key={genre}
                  onClick={() => handleTabClick(genre)}
                  onMouseEnter={() => arcadeSound.playHover()}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium tracking-wide transition-all duration-200 cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                    isActive
                      ? 'bg-[#bfff04] text-black font-bold shadow-md shadow-[#bfff04]/25'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-[#141b3d]'
                  }`}
                >
                  <span>{genre}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isActive ? 'bg-black/20 text-black' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Filters Info */}
        <div className="flex items-center justify-between text-xs text-slate-400 mb-6 px-1">
          <span>
            Mostrando <strong className="text-white">{filteredGames.length}</strong> de{' '}
            <strong className="text-slate-300">{games.length}</strong> jogos disponíveis
          </span>
          {(searchQuery || selectedGenre !== 'Todos') && (
            <button
              onClick={handleClearSearch}
              className="text-[#ff5e5b] hover:text-[#ff7875] flex items-center gap-1 font-medium transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Resetar filtros
            </button>
          )}
        </div>

        {/* Cards Grid or Empty State */}
        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredGames.map((game, index) => (
              <GameCard
                key={game.title + index}
                game={game}
                index={index}
                isLatest={latestTitleSet.has(game.title)}
              />
            ))}
          </div>
        ) : (
          /* Empty Search Message */
          <div className="py-20 px-4 text-center rounded-3xl bg-[#0b0e22] border-2 border-dashed border-[#1e254a] max-w-xl mx-auto flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-[#141a38] flex items-center justify-center text-[#ff5e5b] mb-4 shadow-inner">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h3 className="font-arcade text-xl text-white tracking-wider mb-2">
              NENHUM JOGO ENCONTRADO
            </h3>
            <p className="text-slate-400 text-sm max-w-md mb-6 leading-relaxed">
              Não encontramos nenhum título correspondente a{' '}
              {searchQuery ? `"${searchQuery}"` : 'essa combinação de filtros'}. Tente pesquisar por
              outros termos ou selecione outra categoria.
            </p>
            <button
              onClick={handleClearSearch}
              onMouseEnter={() => arcadeSound.playHover()}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#bfff04] to-[#a3e635] text-black font-arcade text-xs font-bold tracking-wider hover:shadow-lg hover:shadow-[#bfff04]/30 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
            >
              LIMPAR BUSCA E VER TODOS
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
