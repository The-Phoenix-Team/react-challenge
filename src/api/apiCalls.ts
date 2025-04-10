import { PokemonResponse } from 'types/pokemonTypes';

const API_URL = 'https://pokeapi.co/api/v2';

export const fetchPokemonsList = async (offset: number, limit: number) => {
  const response = await fetch(
    `${API_URL}/pokemon?limit=${limit}&offset=${offset}`
  );
  const data: PokemonResponse = await response.json();
  return data;
};

export const fetchAbilitiesForPokemon = async (pokemonName: string) => {
  const response = await fetch(`${API_URL}/pokemon/${pokemonName}`);
  const data = await response.json();
  const abilitiesWithDescription = await Promise.all(
    data.abilities.map(async (ability: any) => {
      const abilityResponse = await fetch(ability.ability.url);
      const abilityData = await abilityResponse.json();
      return {
        name: ability.ability.name,
        effect:
          abilityData.effect_entries.find(
            (entry: any) => entry.language.name === 'en'
          )?.effect || 'No effect available'
      };
    })
  );
  return abilitiesWithDescription;
};
