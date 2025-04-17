import { describe, it, expect, vi, afterEach } from 'vitest';
import { cleanup, render } from 'vitest-browser-react'
import { PokemonDetails } from './PokemonDetails';
import { useGetPokemonAbilityQuery, useGetPokemonDetailsQuery } from '../store/pokemonApi';
// import { BrowserRouter, MemoryRouter, Route, Router, RouterProvider, Routes } from 'react-router-dom';
// import { createMemoryRouter, MemoryRouter, Route, RouterProvider, Routes } from 'react-router-dom';


// Mock api call
vi.mock('../store/pokemonApi', () => ({
  useGetPokemonDetailsQuery: vi.fn(),
  useGetPokemonAbilityQuery: vi.fn()
}));

//Mock route an params 
vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
  useParams: () => vi.fn()
}));


describe('PokemonDetails', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('should show Loading... while loading', async () => {
    vi.mocked(useGetPokemonDetailsQuery).mockReturnValue({
      isLoading: true,
      data: null,
      refetch:vi.fn()
    });

    const { getByText } = render(<PokemonDetails />)
    await expect.element(getByText('Loading...')).toBeDefined();
  });

  it('should show ability name and efect when loaded ', async () => {

    const mockAbility = {
      effect_entries: [
        {
          effect: 'pokemonAbility003Effect',
          language: { name: 'en' }
        }
      ]
    };

    const mockPokemonDetails = {
      name: "pName003",
      abilities: [{
        ability: {
          name: "abilityName003",
          url: "abilityUrl003",
        }
      }]
    }

    vi.mocked(useGetPokemonAbilityQuery).mockReturnValue({
      data: mockAbility,
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn()
    } );

    vi.mocked(useGetPokemonDetailsQuery).mockReturnValue({
      data: mockPokemonDetails,
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn()
    });

    const { getByText } = render(<PokemonDetails />)
    await expect.element(getByText('abilityName003')).toBeInTheDocument();
    await expect.element(getByText('pokemonAbility003Effect')).toBeInTheDocument();
  });


  it('should skip query id param is not  provided', () => {
    render(<PokemonDetails />);
    expect(useGetPokemonDetailsQuery).toHaveBeenCalledWith('', { skip: true });
  });
});