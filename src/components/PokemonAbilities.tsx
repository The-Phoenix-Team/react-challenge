import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  capitalize,
  CircularProgress
} from '@mui/material';
import { useGetPokemonAbilitiesQuery } from 'store/pokemonApiSlice';
import PokemonAbilityDetailRow from './PokemonAbilityDetailRow';

interface PokemonAbilitiesProps {
  pokemonName: string;
  onBack: () => void;
}

const PokemonAbilities = ({ pokemonName, onBack }: PokemonAbilitiesProps) => {
  const {
    data: abilities,
    isLoading,
    error,
    isFetching
  } = useGetPokemonAbilitiesQuery(pokemonName, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    refetchOnFocus: false
  });

  if (isLoading) {
    return (
      <Box display='flex' justifyContent='center' p={2}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box color='error.main' p={2}>
        Error: {error.toString()}
      </Box>
    );
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', position: 'relative' }}>
      {isFetching && (
        <Box position='absolute' top={0} right={0} p={2} zIndex={1}>
          <CircularProgress size={24} />
        </Box>
      )}
      <Box sx={{ typography: 'body1', padding: 2 }}>
        Abilities for {capitalize(pokemonName)}
      </Box>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label='abilities table'>
          <TableHead className='table-header'>
            <TableRow>
              <TableCell>Ability</TableCell>
              <TableCell>Effect</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {abilities?.map((ability, index) => (
              <PokemonAbilityDetailRow
                name={ability.name}
                url={ability.url}
                index={index}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        onClick={onBack}
        sx={{
          typography: 'subtitle2',
          cursor: 'pointer',
          opacity: isFetching ? 0.7 : 1,
          pointerEvents: isFetching ? 'none' : 'auto'
        }}
        className='back-to-list'
      >
        Back to list view
      </Box>
    </Paper>
  );
};

export default PokemonAbilities;
