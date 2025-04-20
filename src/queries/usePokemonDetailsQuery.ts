import useSWR from 'swr';
import { fetchPokemonDetails, fetchAbilityEffect } from '@/api/pokemon';

export function usePokemonDetailsQuery(name: string) {
  const { data, error, isLoading } = useSWR(
    ['pokemon-details', name],
    async () => {
      const details = await fetchPokemonDetails(name);
      const abilities = await Promise.all(
        details.abilities.map(async ({ ability }) => ({
          name: ability.name,
          effect: await fetchAbilityEffect(ability.url)
        }))
      );
      return { abilities };
    }
  );

  return {
    abilities: data?.abilities ?? [],
    isLoading,
    error
  };
}
