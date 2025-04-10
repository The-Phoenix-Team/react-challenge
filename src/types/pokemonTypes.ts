export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonResponse {
  count: number;
  results: Pokemon[];
}
