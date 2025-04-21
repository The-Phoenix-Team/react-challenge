import { TableRow, TableCell, capitalize } from '@mui/material';
import { useGetAbilityDetailsQuery } from 'store/pokemonApiSlice';

interface AbilityDetailProps {
  name: string;
  url: string;
  index: number;
}

const PokemonAbilityDetailRow = ({ name, url, index }: AbilityDetailProps) => {
  const { data: effect, isLoading: isLoadingEffect } =
    useGetAbilityDetailsQuery(url, {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
      refetchOnFocus: false
    });

  return (
    <TableRow
      sx={{
        backgroundColor: index % 2 === 0 ? '#f8f8f8' : '#fff'
      }}
    >
      <TableCell sx={{ border: 0 }}>{capitalize(name)}</TableCell>
      <TableCell sx={{ border: 0 }}>
        {isLoadingEffect ? 'Loading...' : effect}
      </TableCell>
    </TableRow>
  );
};

export default PokemonAbilityDetailRow;
