// src/components/app/__tests__/PokemonList.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/theme';
import { usePokemonListQuery } from '@/queries/usePokemonListQuery';
import PokemonList from '../PokemonList';

vi.mock('@/queries/usePokemonListQuery');
const mockUsePokemonListQuery = vi.mocked(usePokemonListQuery);

describe('PokemonList component', () => {
  const renderList = (page: number, onPageChange = vi.fn()) =>
    render(
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <PokemonList limit={5} page={page} onPageChange={onPageChange} />
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
    renderList(0);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('shows an error alert on error', () => {
    mockUsePokemonListQuery.mockReturnValue({
      pokemon: [],
      count: 0,
      isLoading: false,
      error: new Error('fail')
    });
    renderList(0);
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
    renderList(0);
    expect(screen.getByText('Pokémon Name')).toBeInTheDocument();
    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('Ivysaur')).toBeInTheDocument();
    expect(screen.getByText(/Page 1 of 1/i)).toBeInTheDocument();
  });

  it('calls onPageChange when Next is clicked', () => {
    mockUsePokemonListQuery.mockReturnValue({
      pokemon: [{ name: 'bulbasaur', url: '/pokemon/bulbasaur' }],
      count: 6,
      isLoading: false,
      error: null
    });
    const onPageChange = vi.fn();
    renderList(0, onPageChange);
    fireEvent.click(screen.getByLabelText(/Next page/i));
    expect(onPageChange).toHaveBeenCalledWith(1);
  });
});
