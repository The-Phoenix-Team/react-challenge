type AbilityEffect = {
  effect: string;
  language: {
    name: string;
    url: string;
  };
  short_effect: string;
};

type Ability = {
  description: string;
  shortDescription: string;
  name: string;
};

type PokemonAbilitiesResponse = {
  effect_entries: AbilityEffect[];
  name: string;
};

type AbilityNamedResource = {
  ability: {
    name: string;
    url: string;
  };
};

type PokemonDetailsResponse = {
  name: string;
  abilities: AbilityNamedResource[];
};

export type {
  Ability,
  AbilityEffect,
  AbilityNamedResource,
  PokemonAbilitiesResponse,
  PokemonDetailsResponse
};
