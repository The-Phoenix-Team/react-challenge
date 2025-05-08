import {
  Table as MUITable,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import React, { PropsWithChildren } from 'react';

const TableHeader: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <TableHead>
      <TableRow sx={{ backgroundColor: 'lightblue' }}>{children}</TableRow>
    </TableHead>
  );
};

const Table: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <TableContainer>
      <MUITable
        sx={{
          '& tbody tr:nth-of-type(odd)': {
            backgroundColor: 'grey.100'
          }
        }}
      >
        {children}
      </MUITable>
    </TableContainer>
  );
};

export { TableHeader };
export default Table;
