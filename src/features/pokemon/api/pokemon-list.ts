import { Pokemon } from 'features/pokemon/types';
import POKEMON_TABLE_PAGE_SIZE from '../constants';

type PokemonListResponse = {
  results: Pokemon[];
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
const getPokemonList = async (
  offset: number = 0
): Promise<PokemonListResponse> => {
  const resp = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${POKEMON_TABLE_PAGE_SIZE}`
  );

  if (!resp.ok) {
    throw new Error('An error occurred while fetching the Pokemon list');
  }

  const data = await resp.json();
  return data;
};

export default getPokemonList;
