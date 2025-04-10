import { useState, useEffect } from 'react';
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
import { Pokemon, PokemonResponse } from 'types/pokemonTypes';
import { fetchPokemonsList } from 'api/apiCalls';
import PaginationActions from './PaginationActions';
import AbilitiesTable from './AbilitiesTable';

const PokemonList = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);
  const rowsPerPage = 5;

  const fetchPokemons = async (offset: number) => {
    try {
      const pokemonList: PokemonResponse = await fetchPokemonsList(
        offset,
        rowsPerPage
      );
      setPokemons(pokemonList.results);
      setTotalCount(pokemonList.count);
    } catch (error) {
      // for now, send errors to the console; a more complete solution will handle errors in a user-friendly way
      // eslint-disable-next-line no-console
      console.error('Failed to fetch pokemons:', error);
    }
  };

  useEffect(() => {
    fetchPokemons(page * rowsPerPage);
  }, [page]);

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handlePokemonClick = (pokemonName: string) => {
    setSelectedPokemon(pokemonName);
  };

  const handleBackToList = () => {
    setSelectedPokemon(null);
  };

  if (selectedPokemon) {
    return (
      <AbilitiesTable pokemonName={selectedPokemon} onBack={handleBackToList} />
    );
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
            {pokemons.map((pokemon, index) => (
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
