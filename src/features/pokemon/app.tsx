import { Alert, Box } from '@mui/material';
import TablePagination from 'components/pagination';
import PokemonTable from './components/pokemon-table';
import POKEMON_TABLE_PAGE_SIZE from './constants';
import usePokemons from './hooks/use-pokemons';

const PokemonApp = () => {
  // The pokemonCount is used to persist the count of pokemon
  // during page changes when data is not available.
  const { pokemonCount, offset, setOffset, isError, pokemons, showLoading } =
    usePokemons();

  return (
    // Static height to help avoid layout shift during table
    // transitions between states.
    <Box sx={{ height: '500px' }}>
      {isError && (
        <Alert severity='error' data-testid='error-alert-pokemons'>
          There was an error loading pokemon data!
        </Alert>
      )}
      {pokemons?.length === 0 && !showLoading && (
        <Alert severity='info' data-testid='info-no-pokemon'>
          No Pokemon found!
        </Alert>
      )}
      <PokemonTable
        pokemons={pokemons}
        showLoading={showLoading}
        renderPagination={() => (
          <TablePagination
            disabled={showLoading}
            count={pokemonCount || 0}
            rowsPerPage={5}
            page={offset / POKEMON_TABLE_PAGE_SIZE}
            onPageChange={(_, pageNum) => {
              setOffset(pageNum * POKEMON_TABLE_PAGE_SIZE);
            }}
          />
        )}
      />
    </Box>
  );
};

export default PokemonApp;
