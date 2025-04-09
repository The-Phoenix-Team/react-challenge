import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import { blue } from '@mui/material/colors';
import CustomTablePaginationActions from './PaginationActions';
import AbilitiesTable from './AbilitiesTable';

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonResponse {
  count: number;
  results: Pokemon[];
}

const PokemonTable = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);
  const rowsPerPage = 5;

  const fetchPokemons = async (offset: number) => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${rowsPerPage}&offset=${offset}`
      );
      const data: PokemonResponse = await response.json();
      setPokemons(data.results);
      setTotalCount(data.count);
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
    return <AbilitiesTable pokemonName={selectedPokemon} onBack={handleBackToList} />;
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label='pokemon table'>
          <TableHead>
            <TableRow sx={{ backgroundColor: blue[100] }}>
              <TableCell>Pokemon Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pokemons.map((pokemon) => (
              <TableRow
                key={pokemon.name}
                hover
                sx={{ cursor: 'pointer' }}
                onClick={() => handlePokemonClick(pokemon.name)}
              >
                <TableCell component='th' scope='row'>
                  {pokemon.name}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CustomTablePaginationActions
        count={totalCount}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
      />
    </Paper>
  );
};

export default PokemonTable;
