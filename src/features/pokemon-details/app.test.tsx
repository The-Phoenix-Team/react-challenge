import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { expect, it, Mock, vi } from 'vitest';
import PokemonDetailsApp from './app';
import usePokemonAbilities from './hooks/use-pokemon-abilities';

vi.mock('./hooks/use-pokemon-abilities', () => ({
  __esModule: true,
  default: vi.fn(() => ({
    data: [],
    isLoading: false,
    isError: true
  }))
}));

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <MemoryRouter
    initialEntries={[
      {
        pathname: '/pokemon-details',
        state: { prevLocation: { queryParams: { offset: 0 } } }
      }
    ]}
  >
    {children}
  </MemoryRouter>
);

beforeEach(() => {
  vi.resetModules();
  vi.clearAllMocks();
});

it('shows an error message when there is an error fetching ability details', () => {
  (usePokemonAbilities as Mock).mockReturnValue({
    data: [],
    isLoading: false,
    isError: true
  });

  const { getByTestId } = render(<PokemonDetailsApp />, {
    wrapper: Wrapper
  });

  // getByTestId wasn't working here for some reason
  expect(getByTestId('error-alert-pokemons')).toBeInTheDocument();
});

it('shows a message when there are no ability details', () => {
  (usePokemonAbilities as Mock).mockReturnValue({
    data: { abilities: [] },
    isLoading: false,
    isError: false
  });

  const { getByTestId } = render(<PokemonDetailsApp />, {
    wrapper: Wrapper
  });

  expect(getByTestId('no-ability-details')).toBeInTheDocument();
});

it('renders a list of pokemon abilities', () => {
  (usePokemonAbilities as Mock).mockReturnValue({
    data: {
      abilities: [
        {
          name: 'Overgrow',
          description:
            "Powers up Grass-type moves when the Pokémon's HP is low."
        },
        {
          name: 'Chlorophyll',
          description: "Boosts the Pokémon's Speed stat in harsh sunlight."
        }
      ]
    },
    isLoading: false,
    isError: false
  });

  const { getByText } = render(<PokemonDetailsApp />, {
    wrapper: Wrapper
  });

  expect(getByText('Overgrow')).toBeInTheDocument();
  expect(
    getByText("Powers up Grass-type moves when the Pokémon's HP is low.")
  ).toBeInTheDocument();
});
