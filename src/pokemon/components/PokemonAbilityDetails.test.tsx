import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-react'
import { PokemonAbilityDetails } from './PokemonAbilityDetails';
import { useGetPokemonAbilityQuery } from '../store/pokemonApi';

// Mock api call
vi.mock('../store/pokemonApi', () => ({
  useGetPokemonAbilityQuery: vi.fn()
}));

describe('PokemonAbilityDetails', () => {
  it('should show Loading... while loading data', async () => {
    vi.mocked(useGetPokemonAbilityQuery).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
      refetch: vi.fn()
    });

    const { getByText } = render(<PokemonAbilityDetails id="pAbility001" />)
    await expect.element(getByText('Loading...')).toBeInTheDocument();
  });

  it('should display ability effect when not loading and not error', async () => {
    const mockAbility = {
      effect_entries: [
        {
          effect: 'pokemonAbility002Effect',
          language: { name: 'en' }
        }
      ]
    };

    vi.mocked(useGetPokemonAbilityQuery).mockReturnValue({
      data: mockAbility,
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn()
    });
    const { getByText } = render(<PokemonAbilityDetails id="pAbility002" />)

    await expect.element(getByText('pokemonAbility002Effect')).toBeInTheDocument();

  });

  it('should skip query when id is empty', () => {
    render(<PokemonAbilityDetails id="" />);
    expect(useGetPokemonAbilityQuery).toHaveBeenCalledWith('', { skip: true });
  });

  it('should make query when id is provided', () => {
    render(<PokemonAbilityDetails id="1" />);
    expect(useGetPokemonAbilityQuery).toHaveBeenCalledWith('1', { skip: false });
  });
});