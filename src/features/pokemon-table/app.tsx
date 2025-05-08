import { Alert, Box, Paper, TablePagination } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import getPokemonList from './api/pokemon';
import PokemonTable from './components/pokemon-table';

const PokemonTableApp = () => {
  const [offset, setOffset] = React.useState(0);
  const [pokemonCount, setPokemonCount] = React.useState(0);

  const { data, isError, isLoading } = useQuery({
    queryKey: ['pokemonlist', offset],
    queryFn: () => getPokemonList({ offset })
  });

  const { results: pokemons } = data || {};
  const showLoadingState = isLoading || isError;

  useEffect(() => {
    if (data) {
      setPokemonCount(data.count);
    }
  }, [data]);

  return (
    <Box sx={{ height: '500px' }}>
      {isError && (
        <Alert severity='error'>There was an error loading pokemon data!</Alert>
      )}
      {pokemons?.length === 0 && !showLoadingState && (
        <Alert severity='info'>No Pokemon found!</Alert>
      )}
      <PokemonTable pokemons={pokemons} showLoading={showLoadingState} />
      <Paper>
        <TablePagination
          component='div'
          disabled={showLoadingState}
          count={pokemonCount || 0}
          rowsPerPage={5}
          rowsPerPageOptions={[]}
          page={offset}
          onPageChange={(_, pageNum) => {
            setOffset(pageNum);
          }}
          showFirstButton
          showLastButton
        />
      </Paper>
    </Box>
  );
};

export default PokemonTableApp;
