import Pokemon from './Pokemon';

export default interface PokemonStore {
  pokemons: Pokemon[];
  fetchPokemons: (page: number) => void;
  fetchAbilities: (pokemonName: string) => void;
}
