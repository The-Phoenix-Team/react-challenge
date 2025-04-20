import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  capitalize
} from '@mui/material';
import { useGetPokemonAbilitiesQuery } from 'store/pokemonApiSlice';
import AbilityDetail from './AbilityDetail';

interface PokemonAbilitiesProps {
  pokemonName: string;
  onBack: () => void;
}

const PokemonAbilities = ({ pokemonName, onBack }: PokemonAbilitiesProps) => {
  const {
    data: abilities,
    isLoading,
    error
  } = useGetPokemonAbilitiesQuery(pokemonName);

  if (isLoading) {
    return <div>Loading abilities...</div>;
  }

  if (error) {
    return <div>Error: {error.toString()}</div>;
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
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
              <TableRow
                key={ability.name}
                sx={{
                  backgroundColor: index % 2 === 0 ? '#f8f8f8' : '#fff'
                }}
              >
                <TableCell sx={{ border: 0 }}>
                  <AbilityDetail
                    name={ability.name}
                    url={ability.url}
                    index={index}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        onClick={onBack}
        sx={{ typography: 'subtitle2' }}
        className='back-to-list'
      >
        Back to list view
      </Box>
    </Paper>
  );
};

export default PokemonAbilities;
