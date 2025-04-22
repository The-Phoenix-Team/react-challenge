import { create } from 'zustand';
import Pokemon from '../models/Pokemon';
import Ability from 'models/Ability';
import PokemonStore from 'models/PokemonStore';

import { OFFSET } from 'constants/api';

export const usePokemonStore = create<PokemonStore>((set, get) => ({
  pokemons: [],

  fetchPokemons: async (page: number) => {
    const { pokemons } = get();
    const start = page * OFFSET;
    const end = start + OFFSET;

    if (pokemons[start] === undefined) {
      try {
        const url = `https://pokeapi.co/api/v2/pokemon/?limit=5&offset=${page * OFFSET}`;
        const pokemonsRes = await fetch(url);
        const pokemonsJson = await pokemonsRes.json();
        const pokemonsCopy: Pokemon[] = structuredClone(pokemons);
        pokemonsJson.results.forEach((pokemon: any, index: number) => {
          pokemonsCopy[start + index] = pokemon;
        });
        set({ pokemons: pokemonsCopy });
      } catch (error: any) {
        console.error('Error fetching abilities: ' + error);
      }
    }
  },

  fetchAbilities: async (pokemonName: string) => {
    if (!pokemonName) return;

    const { pokemons } = get();
    const pokemonsCopy: Pokemon[] = structuredClone(pokemons);
    const pokemon = pokemonsCopy.find(
      (pokemon) => pokemon?.name == pokemonName
    );

    if (pokemon?.abilities) {
      return pokemon.abilities;
    }
    //fetch pokemon to get pokemon.abilities then fetch ability to get effect
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    const pokemonRes = await fetch(pokemonUrl);
    if (!pokemonRes.ok) {
      throw new Error(
        `Error fetching pokemon: Response status: ${pokemonRes.status}`
      );
    }
    const pokemonJson = await pokemonRes.json();
    let abilities: Ability[] = pokemonJson.abilities.map(
      (abilityWithMetaData: any) => abilityWithMetaData.ability
    );
    for (const ability of abilities) {
      const abilityRes = await fetch(ability.url);
      if (!abilityRes.ok) {
        throw new Error(
          `Error fetching ability: Response status: ${abilityRes.status}`
        );
      }
      const abilityJson = await abilityRes.json();
      ability.effect = abilityJson.effect_entries.find(
        (effect: any) => effect.language.name === 'en'
      ).effect;
    }

    if (pokemon) pokemon.abilities = abilities;

    set({ pokemons: pokemonsCopy });
  }
}));
