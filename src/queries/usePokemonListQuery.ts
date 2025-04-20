import useSWR from 'swr';
import { fetchPokemonList } from '@/api/pokemon';

export function usePokemonListQuery(limit: number, offset: number) {
  const { data, error, isLoading } = useSWR(
    ['pokemon-list', limit, offset],
    () => fetchPokemonList(limit, offset)
  );

  return {
    pokemon: data?.results ?? [],
    count: data?.count ?? 0,
    isLoading,
    error
  };
}
