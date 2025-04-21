import { useParams, useSearchParams, Link } from 'react-router-dom';
import { Box, Button, Typography, Alert } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MainLayout from '@/layouts/MainLayout';
import PokemonDetails from '@/components/app/PokemonDetails';

const PokemonDetailsPage = (): JSX.Element => {
  const { name } = useParams<{ name: string }>(); // <-- get the Pokémon name
  const [searchParams] = useSearchParams(); // <-- get ?page=
  const page = parseInt(searchParams.get('page') || '0', 10);

  if (!name) {
    return (
      <MainLayout>
        <Alert severity='warning' sx={{ my: 2 }}>
          No Pokémon selected.
        </Alert>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Typography component='h1' variant='h4' gutterBottom>
        Selected Pokémon: {name.charAt(0).toUpperCase() + name.slice(1)}
      </Typography>

      <PokemonDetails name={name} />

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button
          component={Link}
          to={`/pokemon?page=${page}`}
          startIcon={<ArrowBackIcon />}
          variant='text'
          sx={{
            textTransform: 'none',
            '&:hover': { textDecoration: 'underline' }
          }}
        >
          Back to list (page {page + 1})
        </Button>
      </Box>
    </MainLayout>
  );
};

export default PokemonDetailsPage;
