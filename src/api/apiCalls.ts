import { DEFAULT_API_LIMIT, POKEMON_API_URL } from 'api/apiConstants';
import { PokemonListData } from 'types/pokemonTypes';

export const fetchPokemonsList = async (
  offset: number,
  limit: number = DEFAULT_API_LIMIT
) => {
  const response = await fetch(
    `${POKEMON_API_URL}/pokemon?limit=${limit}&offset=${offset}`
  );
  const data: PokemonListData = await response.json();
  return data;
};

export const fetchAbilitiesForPokemon = async (pokemonName: string) => {
  const response = await fetch(`${POKEMON_API_URL}/pokemon/${pokemonName}`);
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
