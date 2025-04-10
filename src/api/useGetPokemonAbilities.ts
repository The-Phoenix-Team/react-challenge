import { POKEMON_API_URL } from 'api/apiConstants';
import { useState, useEffect } from 'react';
import { PokemonAbility } from 'types/pokemonTypes';

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

const useGetPokemonAbilities = (pokemonName: string) => {
  const [abilities, setAbilities] = useState<PokemonAbility[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchAbilitiesForPokemon(pokemonName);
        setAbilities(data);
      } catch (err) {
        setError('Failed to fetch abilities');
      } finally {
        setLoading(false);
      }
    };

    if (pokemonName) {
      fetchData();
    }
  }, [pokemonName]);

  return { abilities, loading, error };
};

export default useGetPokemonAbilities;
