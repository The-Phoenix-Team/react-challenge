import { Pokemon } from 'features/pokemon-table/types';
import POKEMON_LIST_LIMIT from '../constants';

type PokemonListParams = {
  offset?: number;
};

type PokemonListResponse = {
  results: Array<Pokemon>;
  count: number;
  next: string | null;
  previous: string | null;
};

// For more info, visit: https://pokeapi.co/docs/v2#pokemon
// This API returns a list of Pokemon with pagination
/**
 *
 * @param options - options to pass to the API
 * @param options.offset - The number of items to skip before starting to collect the result set
 * @returns
 */
const getPokemonList = async ({
  offset = 0
}: PokemonListParams): Promise<PokemonListResponse> => {
  const resp = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${POKEMON_LIST_LIMIT}`
  );

  if (!resp.ok) {
    throw new Error('An error occurred while fetching the Pokemon list');
  }

  const data = await resp.json();
  return data;
};

export default getPokemonList;
