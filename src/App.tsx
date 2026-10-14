import { useState, useEffect } from 'react';
import { Game, GameList } from './types/game';
import { Navbar } from './components/Navbar';
import { HeroFeatured } from './components/HeroFeatured';
import { TickerMarquee } from './components/TickerMarquee';
import { GameCatalog } from './components/GameCatalog';
import { Footer } from './components/Footer';
import { ModalNovidades } from './components/ModalNovidades';
import { ModalSobre } from './components/ModalSobre';
import fallbackGames from '../data/games.json';
import { Loader2, Gamepad2, RefreshCw } from 'lucide-react';

export default function App() {
  const [games, setGames] = useState<GameList>(fallbackGames as GameList);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [isNovidadesOpen, setIsNovidadesOpen] = useState<boolean>(false);
  const [isSobreOpen, setIsSobreOpen] = useState<boolean>(false);

  // Dynamic loading from 'data/games.json' as requested
  const fetchGamesData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Attempt fetching from runtime web server
      const response = await fetch('/data/games.json', {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Status ${response.status}: Falha ao ler data/games.json`);
      }

      const data: GameList = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        setGames(data);
      } else {
        setGames(fallbackGames as GameList);
      }
    } catch (err) {
      console.warn('Carregando catálogo padrão integrado:', err);
      // Graceful fallback to guaranteed local schema
      setGames(fallbackGames as GameList);
    } finally {
      // Small intentional delay so the arcade UI transitions smoothly
      setTimeout(() => {
        setLoading(false);
      }, 350);
    }
  };

  useEffect(() => {
    fetchGamesData();
  }, []);

  const scrollToCatalog = () => {
    const catalogElement = document.getElementById('catalogo');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#080b18] text-slate-100 selection:bg-[#bfff04] selection:text-black">
      {/* 1. Cabeçalho */}
      <Navbar
        onOpenNovidades={() => setIsNovidadesOpen(true)}
        onOpenSobre={() => setIsSobreOpen(true)}
        onScrollToCatalog={scrollToCatalog}
      />

      {/* Main Content */}
      <main className="flex-grow">
        {loading && games.length === 0 ? (
          <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-[#13193a] flex items-center justify-center text-[#bfff04] shadow-lg shadow-[#bfff04]/20 animate-pulse">
                <Gamepad2 className="w-8 h-8" />
              </div>
              <Loader2 className="w-6 h-6 text-[#bfff04] animate-spin absolute -bottom-2 -right-2" />
            </div>
            <div className="font-arcade text-xl text-white tracking-wider">
              CARREGANDO HUB.PLAY...
            </div>
            <p className="text-xs text-slate-400">
              Sincronizando biblioteca de jogos em <code>data/games.json</code>
            </p>
          </div>
        ) : error ? (
          <div className="max-w-md mx-auto my-20 p-8 rounded-3xl bg-[#0e1329] border border-red-500/40 text-center space-y-4">
            <h3 className="font-arcade text-lg text-red-400">ERRO AO CARREGAR JOGOS</h3>
            <p className="text-xs text-slate-300">{error}</p>
            <button
              onClick={fetchGamesData}
              className="px-4 py-2 rounded-xl bg-[#bfff04] text-black font-arcade text-xs font-bold inline-flex items-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              TENTAR NOVAMENTE
            </button>
          </div>
        ) : (
          <>
            {/* 2. Hero de destaque alimentado pelos jogos com destaque: true */}
            <HeroFeatured games={games} />

            {/* 3. Faixa de letreiro verde-limão, inclinada e em movimento contínuo */}
            <TickerMarquee />

            {/* 4. & 5. Catálogo "Escolha seu jogo" com busca, abas de gênero e cards com Juice */}
            <GameCatalog games={games} />
          </>
        )}
      </main>

      {/* 6. Rodapé simples */}
      <Footer
        onOpenNovidades={() => setIsNovidadesOpen(true)}
        onOpenSobre={() => setIsSobreOpen(true)}
        onScrollToCatalog={scrollToCatalog}
      />

      {/* Interactive Modals */}
      <ModalNovidades
        isOpen={isNovidadesOpen}
        onClose={() => setIsNovidadesOpen(false)}
      />
      <ModalSobre
        isOpen={isSobreOpen}
        onClose={() => setIsSobreOpen(false)}
      />
    </div>
  );
}
