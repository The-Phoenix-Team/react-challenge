import { PokemonListResponse } from '@/types/pokemon';
import { POKEAPI_BASE } from '@/config/api';

export async function fetchPokemonList(
  limit = 5,
  offset = 0
): Promise<PokemonListResponse> {
  const res = await fetch(
    `${POKEAPI_BASE}/pokemon?limit=${limit}&offset=${offset}`
  );
  if (!res.ok) {
    throw new Error('Failed to fetch Pokémon list');
  }
  return res.json();
}

interface AbilitySummary {
  ability: {
    name: string;
    url: string;
  };
}

interface PokemonDetailsResponse {
  abilities: AbilitySummary[];
}

export async function fetchPokemonDetails(
  name: string
): Promise<PokemonDetailsResponse> {
  const res = await fetch(`${POKEAPI_BASE}/pokemon/${name}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch details for ${name}`);
  }
  return res.json();
}

interface AbilityEffectEntry {
  effect: string;
  language: {
    name: string;
  };
}

interface AbilityDetailsResponse {
  effect_entries: AbilityEffectEntry[];
}

export async function fetchAbilityEffect(url: string): Promise<string> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch ability effect');
  }

  const data: AbilityDetailsResponse = await res.json();
  const englishEntry = data.effect_entries.find(
    (entry) => entry.language.name === 'en'
  );
  return englishEntry?.effect ?? 'No effect description available.';
}
