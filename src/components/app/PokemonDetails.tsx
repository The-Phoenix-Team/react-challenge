import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper
} from '@mui/material';
import { PokemonAbility } from '@/types/pokemon';

interface Props {
  abilities: PokemonAbility[];
}

const PokemonDetails = ({ abilities }: Props): JSX.Element => {
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
