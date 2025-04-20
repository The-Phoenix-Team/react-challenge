import { useState, useEffect } from 'react';
import { PokemonAbility } from 'types/pokemonTypes';
import { fetchAbilitiesForPokemon } from './apiCalls';

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
