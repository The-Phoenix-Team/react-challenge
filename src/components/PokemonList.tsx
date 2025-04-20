import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  capitalize,
  CircularProgress,
  Box
} from '@mui/material';
import { useGetPokemonListQuery } from 'store/pokemonApiSlice';
import PaginationActions from './PaginationActions';
import PokemonAbilities from './PokemonAbilities';

interface PokemonListProps {
  defaultSelectedPokemon?: string;
}

const PokemonList = ({ defaultSelectedPokemon }: PokemonListProps) => {
  const [page, setPage] = useState(0);
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(
    defaultSelectedPokemon || null
  );
  const navigate = useNavigate();
  const rowsPerPage = 5;

  useEffect(() => {
    if (defaultSelectedPokemon) {
      setSelectedPokemon(defaultSelectedPokemon);
    }
  }, [defaultSelectedPokemon]);

  const { data, error, isLoading, isFetching } = useGetPokemonListQuery(
    {
      offset: page * rowsPerPage,
      limit: rowsPerPage
    },
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
      refetchOnFocus: false
    }
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
      navigate(`/pokemon/${pokemonName}`);
    },
    [navigate]
  );

  const handleBackToList = React.useCallback(() => {
    setSelectedPokemon(null);
    navigate('/');
  }, [navigate]);

  if (selectedPokemon) {
    return (
      <PokemonAbilities
        pokemonName={selectedPokemon}
        onBack={handleBackToList}
      />
    );
  }

  if (isLoading) {
    return (
      <Box display='flex' justifyContent='center' p={2}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box color='error.main' p={2}>
        Error: {error.toString()}
      </Box>
    );
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', position: 'relative' }}>
      {isFetching && (
        <Box position='absolute' top={0} right={0} p={2} zIndex={1}>
          <CircularProgress size={24} />
        </Box>
      )}
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
                  backgroundColor: index % 2 === 0 ? '#f8f8f8' : '#fff',
                  opacity: isFetching ? 0.7 : 1
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
        disabled={isFetching}
      />
    </Paper>
  );
};

export default PokemonList;
