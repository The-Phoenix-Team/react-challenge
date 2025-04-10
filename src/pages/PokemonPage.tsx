import { Box } from '@mui/material';
import Header from '../components/Header';
import PokemonList from '../components/PokemonList';

const PokemonPage = () => {
  return (
    <Box sx={{ padding: '20px' }}>
      <Header />
      <PokemonList />
    </Box>
  );
};

export default PokemonPage;
