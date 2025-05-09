import { TableBody, TableCell, TableRow } from '@mui/material';
import Table, { TableHeader } from 'components/table';
import React, { PropsWithChildren } from 'react';
import { Ability } from '../types';

type PokemonDetailTableProps = {
  pokemonDetails: Ability[];
};

const PokemonDetailTable: React.FC<
  PropsWithChildren<PokemonDetailTableProps>
> = ({ pokemonDetails }) => {
  return (
    <Table>
      <TableHeader>
        <TableCell>Ability</TableCell>
        <TableCell>Ability Effect</TableCell>
      </TableHeader>
      <TableBody>
        {pokemonDetails.map((detail) => {
          return (
            <TableRow key={detail.name}>
              <TableCell>{detail.name}</TableCell>
              <TableCell>{detail.description}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default PokemonDetailTable;
