export interface PokemonListResult {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  results: PokemonListResult[];
}

export interface PokemonDetailsResponse {
  abilities: {
    ability: PokemonListResult;
  }[];
}

export interface PokemonAbility {
  name: string;
  effect: string;
}
