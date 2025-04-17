import { describe, it, expect } from 'vitest';
import { store } from './index';
import { pokemonApi } from '../pokemon/store/pokemonApi';


describe('Redux Store Configuration', () => {
  it('pokemonApi slice of state should be there', () => {
    const state = store.getState();
    expect(state).toBeDefined();
    expect(state[pokemonApi.reducerPath]).toBeDefined();
  });
}); 