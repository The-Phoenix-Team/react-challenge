import { Alert, Box, Paper, TablePagination } from '@mui/material';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router';
import getPokemonList from './api/pokemon';
import PokemonTable from './components/pokemon-table';

const PokemonTableApp = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    offset: '0'
  });

  const offset = Number(searchParams.get('offset'));

  const { data, isError, isLoading } = useQuery({
    queryKey: ['pokemonlist', offset],
    queryFn: () => getPokemonList({ offset }),
    placeholderData: keepPreviousData
  });

  const { results: pokemons, count } = data || {};
  const showLoadingState = isLoading || isError;

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
          count={count || 0}
          rowsPerPage={5}
          rowsPerPageOptions={[]}
          page={offset}
          onPageChange={(_, pageNum) => {
            setSearchParams({ offset: `${pageNum}` });
          }}
          showFirstButton
          showLastButton
        />
      </Paper>
    </Box>
  );
};

export default PokemonTableApp;
