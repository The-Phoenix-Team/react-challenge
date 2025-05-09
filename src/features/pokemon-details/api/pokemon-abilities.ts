import { PokemonAbilitiesResponse } from '../types';

const getPokemonAbility = async (
  name: string
): Promise<PokemonAbilitiesResponse> => {
  const resp = await fetch(`https://pokeapi.co/api/v2/ability/${name}`);

  if (!resp.ok) {
    throw new Error('An error occurred while fetching the Pokemon ability');
  }
  const data = await resp.json();
  return data;
};

export default getPokemonAbility;
