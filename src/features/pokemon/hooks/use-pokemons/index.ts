import { useQuery } from '@tanstack/react-query';
import getPokemonList from 'features/pokemon/api/pokemon-list';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

const usePokemons = () => {
  const [pokemonCount, setPokemonCount] = useState(0);

  const [searchParams, setSearchParams] = useSearchParams({
    offset: '0'
  });
  const offset = Number(searchParams.get('offset'));
  const setOffset = useCallback(
    (newOffset: number) => {
      setSearchParams({
        offset: `${newOffset}`
      });
    },
    [setSearchParams]
  );

  const { data, isError, isLoading } = useQuery({
    queryKey: ['pokemonlist', offset],
    queryFn: () => getPokemonList(offset)
  });

  const { results: pokemons, count } = data || {};
  const showLoading = isLoading || isError;

  useEffect(() => {
    if (count) {
      setPokemonCount(count);
    }
  }, [count]);

  return {
    pokemonCount,
    setPokemonCount,
    searchParams,
    setSearchParams,
    offset,
    setOffset,
    data,
    isError,
    isLoading,
    showLoading,
    pokemons,
    count
  };
};

export default usePokemons;
