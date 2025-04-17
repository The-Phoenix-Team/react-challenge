import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from 'vitest-browser-react'
import { useGetPokemonListQuery } from '../store/pokemonApi';
import { PokemonList } from './PokemonList';
import { MemoryRouter } from 'react-router-dom';



// Mock api call
vi.mock('../store/pokemonApi', () => ({
  useGetPokemonDetailsQuery: vi.fn(),
  useGetPokemonAbilityQuery: vi.fn(),
  useGetPokemonListQuery: vi.fn(),
}));

//router
const mockSetSearchParams = vi.fn();
let mockSearchParams = new URLSearchParams('page=1');
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
    useSearchParams: () => {
      // return [{ get: vi.fn()}, vi.fn()];
      return [mockSearchParams, mockSetSearchParams];
    }
  };
});


describe('PokemonList', () => {

  beforeEach(() => {
    vi.clearAllMocks();
    mockSearchParams = new URLSearchParams('page=1');
    mockSetSearchParams.mockClear();
    // Setup fake timers
    vi.useFakeTimers();
  });

  it('should show Loading... while loading', async () => {

    vi.mocked(useGetPokemonListQuery).mockReturnValue({
      isLoading: true,
      data: null,
      refetch: vi.fn()
    });

    const { getByText } = render(<MemoryRouter> <PokemonList /></MemoryRouter>)
    await expect.element(getByText('Loading...')).toBeDefined();
  });

  it('should show ability name and efect when loaded ', async () => {

    vi.mocked(useGetPokemonListQuery).mockReturnValue({
      isLoading: false,
      data: {
        count: 40,
        results: [
          { name: "pokemonName006" }, { name: "pokemonName007" }
        ]
      },
      refetch: vi.fn()
    });

    const { getByText } = render(<MemoryRouter> <PokemonList /></MemoryRouter>)
    await expect.element(getByText('pokemonName006')).toBeInTheDocument();
    await expect.element(getByText('pokemonName007')).toBeInTheDocument();
  });


  it('should handle pagination correctly', async () => {
    vi.mocked(useGetPokemonListQuery).mockReturnValue({
      data: {
        count: 12, // This will give us 3 pages with PAGE_SIZE = 5
        results: [
          { name: 'pokemonName005' }
        ]
      },
      isLoading: false,
      error: undefined,
      refetch: vi.fn()
    });

    const { getByText, getByTestId } = render(
      <MemoryRouter>
        <PokemonList />
      </MemoryRouter>
    );

    const firstPageButton = getByTestId('first-page-button');
    const previousPageButton = getByTestId('previous-page-button');

    await expect.element(getByText('Page 1 of 3')).toBeInTheDocument();
    await expect.element(firstPageButton).toBeDisabled()
    await expect.element(previousPageButton).toBeDisabled()

  });
});