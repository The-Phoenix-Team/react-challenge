// src/components/app/__tests__/PokemonList.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/theme';
import PokemonList from '../PokemonList';

describe('PokemonList component', () => {
  const renderList = (props: any) =>
    render(
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <PokemonList {...props} />
        </MemoryRouter>
      </ThemeProvider>
    );

  it('renders table rows and pagination', () => {
    renderList({
      isLoading: false,
      pokemon: [{ name: 'bulbasaur' }, { name: 'ivysaur' }],
      count: 2,
      error: null,
      page: 0,
      onPageChange: () => {}
    });
    expect(screen.getByText('Pokémon Name')).toBeInTheDocument();
    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('Ivysaur')).toBeInTheDocument();
  });
});
