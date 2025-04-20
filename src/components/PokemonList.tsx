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
import { useGetPokemonListQuery } from 'store/pokemonApiSlice';
import PaginationActions from './PaginationActions';
import PokemonAbilities from './PokemonAbilities';

const PokemonList = () => {
  const [page, setPage] = useState(0);
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);
  const rowsPerPage = 5;

  const { data, error, isLoading } = useGetPokemonListQuery({
    offset: page * rowsPerPage,
    limit: rowsPerPage
  });

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

  if (isLoading) {
    return <div>Loading Pokémon list...</div>;
  }

  if (error) {
    return <div>Error: {error.toString()}</div>;
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer>
        <Table className='table-header' aria-label='pokemon table'>
          <TableHead>
            <TableRow>
              <TableCell>Pokémon Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.pokemonList.map((pokemon, index) => (
              <TableRow
                key={pokemon.name}
                hover
                onClick={() => handlePokemonClick(pokemon.name)}
                sx={{
                  cursor: 'pointer',
                  backgroundColor: index % 2 === 0 ? '#f8f8f8' : '#fff'
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
        totalPages={Math.ceil((data?.totalCount || 0) / rowsPerPage)}
        currentPage={page}
        onPageChange={handleChangePage}
      />
    </Paper>
  );
};

export default PokemonList;
