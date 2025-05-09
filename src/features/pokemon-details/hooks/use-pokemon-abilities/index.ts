import { useQueries, useQuery } from '@tanstack/react-query';
import getPokemonAbility from 'features/pokemon-details/api/pokemon-abilities';
import getPokemonDetails from 'features/pokemon-details/api/pokemon-details';
import flattenAbilities from './utils';

const usePokemonAbilities = (name: string) => {
  if (!name) {
    return {};
  }

  const {
    data: pokemonDetails,
    isLoading,
    isError,
    isSuccess
  } = useQuery({
    queryKey: ['pokemonDetails', name],
    queryFn: () => getPokemonDetails(name)
  });

  const { abilities = [] } = pokemonDetails || {};

  const {
    data,
    isLoading: isLoadingAbilities,
    isError: isErrorAbilities
  } = useQueries({
    queries: abilities?.map(({ ability }) => ({
      queryKey: ['abilityDetails', ability.name],
      queryFn: () => getPokemonAbility(ability.name),
      enabled: isSuccess
    })),
    combine: (results) => ({
      data: results
        .map((result) => result.data)
        .filter((result) => result !== undefined),
      isLoading: results.some((result) => result.isLoading),
      isError: results.some((result) => result.isError)
    })
  });

  const flatAbilities = data ? flattenAbilities(data) : [];

  return {
    isLoading: isLoading || isLoadingAbilities,
    isError: isError || isErrorAbilities,
    data: { abilities: flatAbilities }
  };
};

export default usePokemonAbilities;
