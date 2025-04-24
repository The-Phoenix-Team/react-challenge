import { CircularProgress, Alert } from '@mui/material';
import { usePokemonDetailsQuery } from '@/queries/usePokemonDetailsQuery';
import PokemonDetails from './PokemonDetails';

interface Props {
  name: string;
}

const PokemonDetailsContainer = ({ name }: Props): JSX.Element | null => {
  const { abilities, isLoading, error } = usePokemonDetailsQuery(name);

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
        Error loading details for {name}.
      </Alert>
    );
  }

  return <PokemonDetails abilities={abilities} />;
};

export default PokemonDetailsContainer;
