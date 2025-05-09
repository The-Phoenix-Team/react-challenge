import { Paper, TableBody, TableCell, TableRow } from '@mui/material';
import Table, { TableHeader, TableSkeletonLoader } from 'components/table';
import { Pokemon } from 'features/pokemon/types';
import React from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import POKEMON_TABLE_PAGE_SIZE from '../../constants';

type PokemonTableProps = {
  pokemons?: Pokemon[];
  showLoading: boolean;
  renderPagination?: () => React.ReactNode;
};

const PokemonTable: React.FC<PokemonTableProps> = ({
  pokemons = [],
  showLoading,
  renderPagination
}) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleNavigate = (name: string) => {
    navigate(`/pokemon-details/${name}`, {
      state: {
        prevLocation: {
          queryParams: Object.fromEntries(searchParams.entries())
        }
      }
    });
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableCell>Pokemon Name</TableCell>
        </TableHeader>
        <TableBody>
          {showLoading ? (
            <TableSkeletonLoader numRows={POKEMON_TABLE_PAGE_SIZE} />
          ) : (
            pokemons.map((pokemon: Pokemon) => (
              <TableRow
                key={pokemon.name}
                tabIndex={0}
                aria-label={`View details for ${pokemon.name}`}
                sx={{
                  cursor: 'pointer',
                  ':focus': {
                    backgroundColor: 'grey.200',
                    filter: 'brightness(0.9)'
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleNavigate(pokemon.name);
                  }
                }}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigate(pokemon.name);
                }}
              >
                <TableCell>{pokemon.name}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      {renderPagination && (
        <Paper
          sx={{
            backgroundColor: '#deebfd'
          }}
        >
          {renderPagination()}
        </Paper>
      )}
    </>
  );
};

export default PokemonTable;
