export type Pokemon = {
  name: string;
  url: string;
};

export type PokemonListData = {
  count: number;
  results: Pokemon[];
};

export type PokemonAbility = {
  name: string;
  effect: string;
};
