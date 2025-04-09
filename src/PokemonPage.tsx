import { Box } from '@mui/material';
import Header from './components/Header';
import PokemonTable from './components/PokemonTable';

const PokemonPage = () => {
  return (
    <Box sx={{ padding: '20px' }}>
      <Header />
      <PokemonTable />
    </Box>
  );
};

export default PokemonPage;
