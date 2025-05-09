import { Skeleton, TableBody, TableCell, TableRow } from '@mui/material';
import Table, { TableHeader } from 'components/table';
import { Pokemon } from 'features/pokemon-table/types';
import React from 'react';
import { useNavigate } from 'react-router';
import { v4 as uuid } from 'uuid';
import POKEMON_TABLE_PAGE_SIZE from '../constants';

type PokemonTableProps = {
  pokemons?: Pokemon[];
  showLoading: boolean;
};

const PokemonTable: React.FC<PokemonTableProps> = ({
  pokemons = [],
  showLoading
}) => {
  const navigate = useNavigate();

  return (
    <Table>
      <TableHeader>
        <TableCell>Pokemon</TableCell>
      </TableHeader>
      <TableBody>
        {showLoading
          ? Array.from({ length: POKEMON_TABLE_PAGE_SIZE }).map(() => {
              return (
                <TableRow key={uuid()}>
                  <TableCell>
                    <Skeleton variant='text' />
                  </TableCell>
                </TableRow>
              );
            })
          : pokemons.map((pokemon: Pokemon) => (
              <TableRow
                key={pokemon.name}
                tabIndex={0}
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
                    navigate(`/pokemon-details/${pokemon.name}`);
                  }
                }}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/pokemon-details/${pokemon.name}`);
                }}
              >
                <TableCell>{pokemon.name}</TableCell>
              </TableRow>
            ))}
      </TableBody>
    </Table>
  );
};

export default PokemonTable;
