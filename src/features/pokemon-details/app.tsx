import { Alert, Box } from '@mui/material';
import { Link, useLocation, useParams } from 'react-router';
import PokemonDetailTable from './components/pokemon-detail-table';
import usePokemonAbilities from './hooks/use-pokemon-abilities';

const PokemonDetailsApp = () => {
  const location = useLocation();

  const { name } = useParams();
  const { data, isLoading, isError } = usePokemonAbilities(name || '');

  const { abilities } = data || {};
  const showLoadingState = isLoading || isError;
  const prevOffset = location.state?.prevLocation?.queryParams.offset;

  return (
    <section>
      <h1>Selected Pokemon: {name}</h1>
      {isError && (
        <Alert severity='error' data-testid='error-alert-pokemons'>
          There was an error fetching ability details!
        </Alert>
      )}
      {abilities?.length === 0 && !showLoadingState && (
        <Alert severity='info' data-testid='no-ability-details'>
          No ability details found for this Pokemon!
        </Alert>
      )}
      <PokemonDetailTable
        pokemonDetails={abilities || []}
        showLoading={!!showLoadingState}
      />
      <Box
        sx={{
          float: 'right'
        }}
      >
        <Link
          to={{
            pathname: '/',
            search: prevOffset ? `?offset=${prevOffset}` : undefined
          }}
        >
          Back to list view
        </Link>
      </Box>
    </section>
  );
};

export default PokemonDetailsApp;
