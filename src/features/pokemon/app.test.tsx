import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { expect, it, Mock, vi } from 'vitest';
import PokemonApp from './app';
import usePokemons from './hooks/use-pokemons';

vi.mock('./hooks/use-pokemons', () => ({
  __esModule: true,
  default: vi.fn(() => ({
    pokemons: [],
    isLoading: false,
    isError: false
  }))
}));

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

beforeEach(() => {
  vi.resetModules();
  vi.clearAllMocks();
});

it('displays a message when there are no pokemons', () => {
  (usePokemons as Mock).mockReturnValue({
    pokemons: [],
    isLoading: false,
    isError: false
  });

  const { getByTestId } = render(<PokemonApp />, {
    wrapper: Wrapper
  });

  expect(getByTestId('info-no-pokemon')).toBeInTheDocument();
});

it('displays an error message when there is an error fetching pokemon data', () => {
  (usePokemons as Mock).mockReturnValue({
    pokemons: [],
    isLoading: false,
    isError: true
  });

  const { getByTestId } = render(<PokemonApp />, {
    wrapper: Wrapper
  });

  expect(getByTestId('error-alert-pokemons')).toBeInTheDocument();
});
