import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { expect, it } from 'vitest';
import PokemonTable from '.';

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

it('should render a skeleton loader when loading', () => {
  const { getAllByTestId } = render(
    <PokemonTable
      pokemons={[]}
      showLoading
      renderPagination={() => <div>Pagination</div>}
    />,
    {
      wrapper: Wrapper
    }
  );
  expect(getAllByTestId('table-skeleton-loader-row')).toBeTruthy();
});

it('displays pokemon names', () => {
  const pokemons = [
    { name: 'bulbasaur' },
    { name: 'ivysaur' },
    { name: 'venusaur' }
  ];

  const { getByText } = render(
    <PokemonTable
      pokemons={pokemons}
      showLoading={false}
      renderPagination={() => <div>Pagination</div>}
    />,
    {
      wrapper: Wrapper
    }
  );

  pokemons.forEach((pokemon) => {
    expect(getByText(pokemon.name)).toBeTruthy();
  });
});

it('should render a custom pagination component', () => {
  const { getByText } = render(
    <PokemonTable
      pokemons={[]}
      showLoading={false}
      renderPagination={() => <div>Pagination</div>}
    />,
    {
      wrapper: Wrapper
    }
  );
  expect(getByText('Pagination')).toBeTruthy();
});
