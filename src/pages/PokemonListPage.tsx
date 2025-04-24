import { useSearchParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import MainLayout from '@/layouts/MainLayout';
import PokemonListContainer from '@/components/app/PokemonListContainer';

const PokemonListPage = (): JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams();
  // read ?page=, default to 0
  const page = parseInt(searchParams.get('page') || '0', 10);

  const handlePageChange = (newPage: number) => {
    // update URL ?page=
    searchParams.set('page', String(newPage));
    setSearchParams(searchParams);
  };

  return (
    <MainLayout>
      <Typography component='h1' variant='h4' gutterBottom>
        Pokémon List
      </Typography>
      <PokemonListContainer
        limit={5}
        page={page}
        onPageChange={handlePageChange}
      />
    </MainLayout>
  );
};

export default PokemonListPage;
