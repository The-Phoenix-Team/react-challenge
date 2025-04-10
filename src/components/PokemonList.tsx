import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  capitalize
} from '@mui/material';
import { useGetPokemonList } from 'api/useGetPokemonList';
import PaginationActions from './PaginationActions';
import PokemonAbilities from './PokemonAbilities';

const PokemonList = () => {
  const [page, setPage] = useState(0);
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);
  const rowsPerPage = 5;

  const { pokemonList, totalCount, loading, error } = useGetPokemonList(
    page * rowsPerPage,
    rowsPerPage
  );

  const handleChangePage = React.useCallback(
    (newPage: number) => {
      setPage(newPage);
    },
    [setPage]
  );

  const handlePokemonClick = React.useCallback(
    (pokemonName: string) => {
      setSelectedPokemon(pokemonName);
    },
    [setSelectedPokemon]
  );

  const handleBackToList = React.useCallback(() => {
    setSelectedPokemon(null);
  }, [setSelectedPokemon]);

  if (selectedPokemon) {
    return (
      <PokemonAbilities
        pokemonName={selectedPokemon}
        onBack={handleBackToList}
      />
    );
  }

  if (loading) {
    return <div>Loading Pokémon list...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer>
        <Table className='table-header' aria-label='pokemon table'>
          <TableHead>
            <TableRow>
              <TableCell>Pokemon Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pokemonList.map((pokemon, index) => (
              <TableRow
                key={pokemon.name}
                hover
                onClick={() => handlePokemonClick(pokemon.name)}
                sx={{
                  cursor: 'pointer',
                  backgroundColor: index % 2 === 0 ? '#f5f5f5' : '#fff'
                }}
              >
                <TableCell sx={{ border: 0 }}>
                  {capitalize(pokemon.name)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <PaginationActions
        count={totalCount}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
      />
    </Paper>
  );
};

export default PokemonList;
