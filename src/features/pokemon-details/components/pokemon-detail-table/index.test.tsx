import { render } from '@testing-library/react';
import { expect, it } from 'vitest';
import PokgemonDetailTable from './index';

it('should render a skeleton loader when loading', () => {
  const { getAllByTestId } = render(
    <PokgemonDetailTable pokemonDetails={[]} showLoading />
  );
  expect(getAllByTestId('table-skeleton-loader-row')).toBeTruthy();
});

it('should render a table with pokemon details', () => {
  const abilities = [
    {
      name: 'overgrow',
      description: "Powers up Grass-type moves when the Pokémon's HP is low.",
      shortDescription: 'Powers up Grass-type moves in a pinch.'
    },
    {
      name: 'chlorophyll',
      description: "Boosts the Pokémon's Speed stat in harsh sunlight.",
      shortDescription: 'Boosts Speed in sunlight.'
    }
  ];

  const { getByText } = render(
    <PokgemonDetailTable pokemonDetails={abilities} showLoading={false} />
  );

  abilities.forEach((ability) => {
    expect(getByText(ability.name)).toBeTruthy();
    expect(getByText(ability.description)).toBeTruthy();
  });
});
