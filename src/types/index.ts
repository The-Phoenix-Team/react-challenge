export type PokemonListItem = {
  name: string;
  url: string;
};

export type PokemonListDataReturn = {
  count: number;
  results: Array<PokemonListItem>;
};

export type GetPokemonListReturn = {
  data: PokemonListDataReturn | null;
  loading: boolean;
  error: string | null;
};

export type PokemonDetailData = {
  name: string;
  abilities: Array<PokemonDetailDataAbility>;
};

export type PokemonDetailDataAbility = {
  ability: PokemonAbilitySimple;
};

export type PokemonAbilitySimple = {
  name: string;
  url: string;
};

export type PokemonAbilityDetail = {
  name: string;
  effect_entries: Array<PokemonAbilityEffectEntry>;
};

export type PokemonAbilityEffectEntry = {
  effect: string;
  language: { name: string };
};

export type PokemonDetailReturnData = {
  pokemonDetailData: PokemonDetailData | null;
  pokemonAbilitiesData: Array<PokemonAbilityDetail> | null;
  loading: boolean;
  error: string | null;
};
