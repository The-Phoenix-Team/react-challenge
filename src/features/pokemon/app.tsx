import { Alert, Box, Paper, TablePagination } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import getPokemonList from './api/pokemon-list';
import PokemonTable from './components/pokemon-table';
import POKEMON_TABLE_PAGE_SIZE from './constants';

const PokemonApp = () => {
  const [pokemonCount, setPokemonCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams({
    offset: '0'
  });
  const offset = Number(searchParams.get('offset'));

  const { data, isError, isLoading } = useQuery({
    queryKey: ['pokemonlist', offset],
    queryFn: () => getPokemonList(offset)
  });

  const { results: pokemons, count } = data || {};
  const showLoading = isLoading || isError;

  useEffect(() => {
    if (count) {
      setPokemonCount(count);
    }
  }, [count]);

  return (
    <Box sx={{ height: '500px' }}>
      {isError && (
        <Alert severity='error'>There was an error loading pokemon data!</Alert>
      )}
      {pokemons?.length === 0 && !showLoading && (
        <Alert severity='info'>No Pokemon found!</Alert>
      )}
      <PokemonTable pokemons={pokemons} showLoading={showLoading} />
      <Paper>
        <TablePagination
          component='div'
          disabled={showLoading}
          count={pokemonCount || 0}
          rowsPerPage={5}
          rowsPerPageOptions={[]}
          page={offset / POKEMON_TABLE_PAGE_SIZE}
          onPageChange={(_, pageNum) => {
            setSearchParams({
              offset: `${pageNum * POKEMON_TABLE_PAGE_SIZE}`
            });
          }}
          showFirstButton
          showLastButton
        />
      </Paper>
    </Box>
  );
};

export default PokemonApp;
