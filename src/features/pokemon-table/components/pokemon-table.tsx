import {
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { Pokemon } from 'features/pokemon-table/types';
import React from 'react';
import { useNavigate } from 'react-router';
import { v4 as uuid } from 'uuid';
import POKEMON_LIST_LIMIT from '../constants';

type PokemonTableProps = {
  pokemons?: Array<Pokemon>;
  showLoading: boolean;
};

const PokemonTable: React.FC<PokemonTableProps> = ({
  pokemons = [],
  showLoading
}) => {
  const navigate = useNavigate();

  return (
    <TableContainer>
      <Table
        sx={{ '& tbody tr:nth-of-type(odd)': { backgroundColor: 'grey.100' } }}
      >
        <TableHead>
          <TableRow sx={{ backgroundColor: 'lightblue' }}>
            <TableCell>Pokemon</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {showLoading
            ? Array.from({ length: POKEMON_LIST_LIMIT }).map(() => {
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
                  onClick={() => {
                    navigate(`/pokemon-details/${pokemon.name}`);
                  }}
                >
                  <TableCell>{pokemon.name}</TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PokemonTable;
