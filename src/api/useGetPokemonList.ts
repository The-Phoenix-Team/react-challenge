import { useEffect, useState } from 'react';
import { PokemonListData } from 'types/pokemonTypes';
import { fetchPokemonsList } from './apiCalls';

const useGetPokemonList = (offset: number, limit: number) => {
  const [pokemonListData, setPokemonListData] =
    useState<PokemonListData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchPokemonsList(offset, limit);
        setPokemonListData(data);
      } catch (err) {
        setError('Failed to fetch Pokémon list.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [offset, limit]);

  const totalCount = pokemonListData?.count || 0;
  const pokemonList = pokemonListData?.results || [];
  return { pokemonList, totalCount, loading, error };
};

export default useGetPokemonList;
