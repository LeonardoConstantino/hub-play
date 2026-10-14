export interface Game {
  /** Nome do jogo, geralmente acompanhado de um emoji temático. */
  title: string;

  /** Frase curta que resume o gênero ou a proposta do jogo. */
  subtitle: string;

  /** Texto descritivo voltado ao jogador, sem jargões técnicos. */
  description: string;

  /** URL para jogar o jogo diretamente no navegador. */
  link: string;

  /** URL da imagem de capa (hero) do jogo. */
  image: string;

  /** Categoria principal do jogo (ex.: "Ação / Arena", "Puzzle / Relaxante"). */
  genero: string;

  /** Palavras-chave para busca, filtros e agrupamento no hub. */
  tags: string[];

  /** Indica se o jogo deve aparecer em seção de destaque na home do hub. */
  destaque: boolean;
}

/** Lista completa de jogos do hub. */
export type GameList = Game[];

export interface GameThemeColors {
  primary: string;
  secondary: string;
  gradientClass: string;
  accentBorder: string;
  badgeBg: string;
  glowColor: string;
}
