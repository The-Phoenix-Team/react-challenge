import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import React from 'react';
import { Pokemon } from 'types';

type PokemonTableProps = {
  pokemons?: Array<Pokemon>;
};

const PokemonTable: React.FC<PokemonTableProps> = ({ pokemons = [] }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <caption>A table that lists pokemon that also has pagination</caption>
        <TableHead>
          <TableRow>
            <TableCell>Pokemon</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pokemons.map((pokemon: any) => (
            <TableRow key={pokemon.name}>
              <TableCell>{pokemon.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PokemonTable;
