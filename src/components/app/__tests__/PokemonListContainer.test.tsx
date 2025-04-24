import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/theme';
import { usePokemonListQuery } from '@/queries/usePokemonListQuery';
import PokemonListContainer from '../PokemonListContainer';

vi.mock('@/queries/usePokemonListQuery');
const mockUsePokemonListQuery = vi.mocked(usePokemonListQuery);

describe('PokemonListContainer component', () => {
  const renderContainer = (page: number, onPageChange = vi.fn()) =>
    render(
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <PokemonListContainer
            limit={5}
            page={page}
            onPageChange={onPageChange}
          />
        </MemoryRouter>
      </ThemeProvider>
    );

  it('shows a loading spinner when loading', () => {
    mockUsePokemonListQuery.mockReturnValue({
      pokemon: [],
      count: 0,
      isLoading: true,
      error: null
    });
    renderContainer(0);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('shows an error alert on error', () => {
    mockUsePokemonListQuery.mockReturnValue({
      pokemon: [],
      count: 0,
      isLoading: false,
      error: new Error('fail')
    });
    renderContainer(0);
    expect(screen.getByText(/Error loading Pokémon/i)).toBeInTheDocument();
  });

  it('renders table rows and pagination', () => {
    mockUsePokemonListQuery.mockReturnValue({
      pokemon: [
        { name: 'bulbasaur', url: '/pokemon/bulbasaur' },
        { name: 'ivysaur', url: '/pokemon/ivysaur' }
      ],
      count: 2,
      isLoading: false,
      error: null
    });
    renderContainer(0);
    expect(screen.getByText('Pokémon Name')).toBeInTheDocument();
    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('Ivysaur')).toBeInTheDocument();
  });
});
