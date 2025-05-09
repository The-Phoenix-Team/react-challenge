import { TableBody, TableCell, TableRow } from '@mui/material';
import Table, { TableHeader, TableSkeletonLoader } from 'components/table';
import React, { PropsWithChildren } from 'react';
import { Ability } from '../../types';

type PokemonDetailTableProps = {
  pokemonDetails: Ability[];
  showLoading: boolean;
};

const PokemonDetailTable: React.FC<
  PropsWithChildren<PokemonDetailTableProps>
> = ({ pokemonDetails, showLoading }) => {
  return (
    <Table>
      <TableHeader>
        <TableCell>Ability</TableCell>
        <TableCell>Ability Effect</TableCell>
      </TableHeader>
      <TableBody>
        {showLoading ? (
          <TableSkeletonLoader numRows={4} numCells={2} />
        ) : (
          pokemonDetails.map((detail) => {
            return (
              <TableRow key={detail.name}>
                <TableCell width={200}>{detail.name}</TableCell>
                <TableCell>{detail.description}</TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
};

export default PokemonDetailTable;
