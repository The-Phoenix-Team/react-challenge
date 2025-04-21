import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  CircularProgress,
  Alert
} from '@mui/material';
import { usePokemonDetailsQuery } from '@/queries/usePokemonDetailsQuery';
import { PokemonAbility } from '@/types/pokemon';

interface Props {
  name: string;
}

const PokemonDetails = ({ name }: Props): JSX.Element | null => {
  const { abilities, isLoading, error } = usePokemonDetailsQuery(name);

  if (isLoading) {
    return (
      <Paper square elevation={0} sx={{ p: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Paper>
    );
  }

  if (error) {
    return (
      <Alert severity='error' sx={{ my: 2 }}>
        Error loading details for {name}.
      </Alert>
    );
  }

  return (
    <TableContainer
      component={Paper}
      square
      elevation={0}
      sx={{ boxShadow: 'none', borderRadius: 0, my: 2 }}
    >
      <Table>
        <TableHead sx={{ backgroundColor: 'table.header' }}>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold', borderBottom: 'none' }}>
              Ability
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold', borderBottom: 'none' }}>
              Ability Effect
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {abilities.map((ability: PokemonAbility) => (
            <TableRow
              key={ability.name}
              sx={{
                borderBottom: 'none',
                '&:nth-of-type(odd)': {
                  backgroundColor: 'table.rowOdd'
                }
              }}
            >
              <TableCell sx={{ py: 1 }}>
                {ability.name.charAt(0).toUpperCase() + ability.name.slice(1)}
              </TableCell>
              <TableCell sx={{ py: 1 }}>{ability.effect}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PokemonDetails;
