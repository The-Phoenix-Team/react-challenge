import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/theme';
import { usePokemonDetailsQuery } from '@/queries/usePokemonDetailsQuery';
import PokemonDetailsContainer from '../PokemonDetailsContainer';

// Mock the data‑fetching hook
vi.mock('@/queries/usePokemonDetailsQuery');
const mockUsePokemonDetailsQuery = vi.mocked(usePokemonDetailsQuery);

describe('PokemonDetailsContainer component', () => {
  // Helper to render the component with theme
  const renderDetails = (name: string) =>
    render(
      <ThemeProvider theme={theme}>
        <PokemonDetailsContainer name={name} />
      </ThemeProvider>
    );

  it('shows a loading spinner', () => {
    mockUsePokemonDetailsQuery.mockReturnValue({
      abilities: [],
      isLoading: true,
      error: null
    });
    renderDetails('bulbasaur');
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('shows an error message on fetch failure', () => {
    mockUsePokemonDetailsQuery.mockReturnValue({
      abilities: [],
      isLoading: false,
      error: new Error('fetch failed')
    });
    renderDetails('bulbasaur');
    expect(
      screen.getByText(/Error loading details for bulbasaur/i)
    ).toBeInTheDocument();
  });

  it('renders abilities table when data is available', () => {
    mockUsePokemonDetailsQuery.mockReturnValue({
      abilities: [
        { name: 'overgrow', effect: 'Boosts grass moves at low HP.' },
        { name: 'chlorophyll', effect: 'Doubles speed in sunlight.' }
      ],
      isLoading: false,
      error: null
    });
    renderDetails('bulbasaur');

    // Verify table headers
    expect(screen.getByText('Ability')).toBeInTheDocument();
    expect(screen.getByText('Ability Effect')).toBeInTheDocument();

    // Verify ability rows
    expect(
      screen.getByText((content) => content.toLowerCase() === 'overgrow')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Boosts grass moves at low HP.')
    ).toBeInTheDocument();
    expect(
      screen.getByText((content) => content.toLowerCase() === 'chlorophyll')
    ).toBeInTheDocument();
    expect(screen.getByText('Doubles speed in sunlight.')).toBeInTheDocument();
  });
});
