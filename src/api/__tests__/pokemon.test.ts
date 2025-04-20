import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  fetchPokemonList,
  fetchPokemonDetails,
  fetchAbilityEffect
} from '@/api/pokemon';

describe('pokemon API functions', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('fetchPokemonList returns parsed JSON when response.ok is true', async () => {
    const fake = { count: 1, results: [{ name: 'a', url: 'u' }] };
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({ ok: true, json: () => Promise.resolve(fake) })
      )
    );
    const res = await fetchPokemonList(5, 0);
    expect(res).toEqual(fake);
    expect(fetch).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon?limit=5&offset=0'
    );
  });

  it('fetchPokemonList throws when response.ok is false', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.resolve({ ok: false }))
    );
    await expect(fetchPokemonList(5, 0)).rejects.toThrow(
      'Failed to fetch Pokémon list'
    );
  });

  it('fetchPokemonDetails returns parsed JSON when response.ok is true', async () => {
    const fake = { abilities: [] };
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({ ok: true, json: () => Promise.resolve(fake) })
      )
    );
    const res = await fetchPokemonDetails('pikachu');
    expect(res).toEqual(fake);
    expect(fetch).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon/pikachu'
    );
  });

  it('fetchPokemonDetails throws when response.ok is false', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.resolve({ ok: false }))
    );
    await expect(fetchPokemonDetails('pikachu')).rejects.toThrow(
      'Failed to fetch details for pikachu'
    );
  });

  it('fetchAbilityEffect returns the English effect entry', async () => {
    const apiRes = {
      effect_entries: [
        { effect: 'e1', language: { name: 'jp' } },
        { effect: 'e2', language: { name: 'en' } }
      ]
    };
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({ ok: true, json: () => Promise.resolve(apiRes) })
      )
    );
    const effect = await fetchAbilityEffect('url');
    expect(effect).toBe('e2');
  });

  it('fetchAbilityEffect falls back when no English entry', async () => {
    const apiRes = {
      effect_entries: [{ effect: 'e1', language: { name: 'jp' } }]
    };
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({ ok: true, json: () => Promise.resolve(apiRes) })
      )
    );
    const effect = await fetchAbilityEffect('url');
    expect(effect).toBe('No effect description available.');
  });
});
