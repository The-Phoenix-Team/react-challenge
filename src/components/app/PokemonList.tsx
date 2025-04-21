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
  Box,
  Link as MuiLink
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
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
                sx={{
                  '&:nth-of-type(odd)': {
                    backgroundColor: 'table.rowOdd'
                  }
                }}
              >
                <TableCell sx={{ p: 0, borderBottom: 'none' }}>
                  <MuiLink
                    component={RouterLink}
                    to={`/pokemon/${p.name}?page=${page}`}
                    sx={{
                      display: 'block',
                      textDecoration: 'none',
                      color: 'inherit',
                      p: 2,
                      '&:hover': {
                        backgroundColor: 'action.hover'
                      }
                    }}
                  >
                    {p.name.charAt(0).toUpperCase() + p.name.slice(1)}
                  </MuiLink>
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
