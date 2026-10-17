import { Game } from '../types/game';

export interface GameOrderResult {
  sortedGames: Game[];
  featuredGames: Game[];
  latestGames: Game[];
  otherGames: Game[];
}

/**
 * Organizes games according to the hub's priority rules:
 * 1. Games marked as destaque (destaque === true)
 * 2. The next 3 games from the end of the games array (newest additions)
 * 3. All remaining games in the catalog
 */
export function organizeGames(games: Game[]): GameOrderResult {
  if (!games || games.length === 0) {
    return {
      sortedGames: [],
      featuredGames: [],
      latestGames: [],
      otherGames: [],
    };
  }

  // 1. Featured games
  const featuredGames = games.filter((g) => g.destaque);
  const featuredTitleSet = new Set(featuredGames.map((g) => g.title));

  // 2. Latest 3 games from the end of the array (not already in featured)
  const nonFeaturedFromEnd = [...games]
    .reverse()
    .filter((g) => !featuredTitleSet.has(g.title));

  const latestGames = nonFeaturedFromEnd.slice(0, 3);
  const latestTitleSet = new Set(latestGames.map((g) => g.title));

  // 3. Other remaining games
  const otherGames = games.filter(
    (g) => !featuredTitleSet.has(g.title) && !latestTitleSet.has(g.title)
  );

  const sortedGames = [...featuredGames, ...latestGames, ...otherGames];

  return {
    sortedGames,
    featuredGames,
    latestGames,
    otherGames,
  };
}
