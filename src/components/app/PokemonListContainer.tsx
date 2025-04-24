import { usePokemonListQuery } from '@/queries/usePokemonListQuery';
import { CircularProgress, Alert } from '@mui/material';
import PokemonList from './PokemonList';

type Props = {
  limit?: number;
  page: number;
  onPageChange: (page: number) => void;
};

const PokemonListContainer = ({
  limit = 5,
  page,
  onPageChange
}: Props): JSX.Element => {
  const offset = page * limit;
  const { pokemon, count, isLoading, error } = usePokemonListQuery(
    limit,
    offset
  );

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '16px' }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <Alert severity='error' style={{ margin: '16px 0' }}>
        Error loading Pokémon list.
      </Alert>
    );
  }

  return (
    <PokemonList
      pokemon={pokemon}
      count={count}
      limit={limit}
      page={page}
      onPageChange={onPageChange}
    />
  );
};

export default PokemonListContainer;
