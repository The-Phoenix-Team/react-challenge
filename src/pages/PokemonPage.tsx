import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import PokemonList from '../components/PokemonList';

const PokemonPage = () => {
  const { pokemonName } = useParams<{ pokemonName: string }>();

  return (
    <Box sx={{ padding: '20px' }}>
      <Header />
      <PokemonList defaultSelectedPokemon={pokemonName} />
    </Box>
  );
};

export default PokemonPage;
