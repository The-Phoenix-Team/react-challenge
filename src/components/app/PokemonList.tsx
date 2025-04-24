import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Box,
  Link as MuiLink
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Pagination from '@/components/ui/Pagination';

type Props = {
  pokemon: { name: string }[];
  count: number;
  limit?: number;
  page: number;
  onPageChange: (page: number) => void;
};

const PokemonList = ({
  pokemon,
  count,
  limit = 5,
  page,
  onPageChange
}: Props): JSX.Element => {
  const totalPages = Math.ceil(count / limit);

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
