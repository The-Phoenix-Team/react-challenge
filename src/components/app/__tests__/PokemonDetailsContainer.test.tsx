import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { usePokemonDetailsQuery } from '@/queries/usePokemonDetailsQuery';
import PokemonDetailsContainer from '../PokemonDetailsContainer';

vi.mock('@/queries/usePokemonDetailsQuery');

const mockUsePokemonDetailsQuery = vi.mocked(usePokemonDetailsQuery);

describe('PokemonDetailsContainer', () => {
  const name = 'pikachu';

  it('renders loading state', () => {
    mockUsePokemonDetailsQuery.mockReturnValue({
      abilities: [],
      isLoading: true,
      error: null
    });

    render(<PokemonDetailsContainer name={name} />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders error state', () => {
    mockUsePokemonDetailsQuery.mockReturnValue({
      abilities: [],
      isLoading: false,
      error: new Error('Failed to fetch')
    });

    render(<PokemonDetailsContainer name={name} />);

    expect(
      screen.getByText(/Error loading details for pikachu/i)
    ).toBeInTheDocument();
  });

  it('renders abilities', () => {
    mockUsePokemonDetailsQuery.mockReturnValue({
      abilities: [
        { name: 'static', effect: 'Paralyzes on contact' },
        { name: 'lightning-rod', effect: 'Draws in all Electric-type moves' }
      ],
      isLoading: false,
      error: null
    });

    render(<PokemonDetailsContainer name={name} />);

    expect(screen.getByText(/static/i)).toBeInTheDocument();
    expect(screen.getByText(/Paralyzes on contact/i)).toBeInTheDocument();
    expect(screen.getByText(/lightning-rod/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Draws in all Electric-type moves/i)
    ).toBeInTheDocument();
  });
});
