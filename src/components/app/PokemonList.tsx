import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  CircularProgress,
  Alert,
  Box
} from '@mui/material';
import { Link } from 'react-router-dom';
import Pagination from '@/components/ui/Pagination';
import { usePokemonListQuery } from '@/queries/usePokemonListQuery';

type Props = {
  limit?: number;
  page: number;
  onPageChange: (page: number) => void;
};

// paginated list of pokemon names
const PokemonList = ({ limit = 5, page, onPageChange }: Props): JSX.Element => {
  const offset = page * limit;
  const { pokemon, count, isLoading, error } = usePokemonListQuery(
    limit,
    offset
  );
  const totalPages = Math.ceil(count / limit);

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
        Error loading Pokémon.
      </Alert>
    );
  }

  return (
    <>
      <TableContainer
        component={Paper}
        square
        elevation={0}
        sx={{ boxShadow: 'none', borderRadius: 0 }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: 'table.header' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', borderBottom: 'none' }}>
                Pokémon Name
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pokemon.map((p) => (
              <TableRow
                key={p.name}
                hover
                component={Link}
                // carry the current page into the detail URL
                to={`/pokemon/${p.name}?page=${page}`}
                sx={{
                  textDecoration: 'none',
                  '&:nth-of-type(odd)': {
                    backgroundColor: 'table.rowOdd'
                  }
                }}
              >
                <TableCell sx={{ py: 1, borderBottom: 'none' }}>
                  {p.name.charAt(0).toUpperCase() + p.name.slice(1)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        component='nav'
        aria-label='Pagination'
        sx={{
          bgcolor: 'table.pagination',
          p: '0.5rem'
        }}
      >
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </Box>
    </>
  );
};

export default PokemonList;
