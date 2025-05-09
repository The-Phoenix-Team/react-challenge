import {
  Table as MUITable,
  Skeleton,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import React, { PropsWithChildren } from 'react';
import { v4 as uuid } from 'uuid';

type TableSkeletonLoaderProps = {
  numRows?: number;
  numCells?: number;
};

const TableSkeletonLoader: React.FC<TableSkeletonLoaderProps> = ({
  numRows = 5,
  numCells = 1
}) =>
  Array.from({ length: numRows }).map(() => {
    return (
      <TableRow key={uuid()} data-testid='table-skeleton-loader-row'>
        {Array.from({ length: numCells }).map(() => {
          return (
            <TableCell key={uuid()}>
              <Skeleton variant='text' width='100%' />
            </TableCell>
          );
        })}
      </TableRow>
    );
  });

const TableHeader: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <TableHead>
      <TableRow sx={{ backgroundColor: '#adcdf7' }}>{children}</TableRow>
    </TableHead>
  );
};

const Table: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <TableContainer>
      <MUITable
        sx={{
          '& tbody tr:nth-of-type(odd)': {
            backgroundColor: '#f8f8f8'
          }
        }}
      >
        {children}
      </MUITable>
    </TableContainer>
  );
};

export { TableHeader, TableSkeletonLoader };
export default Table;
