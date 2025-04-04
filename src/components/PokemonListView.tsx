import { useState } from 'react';
import {
  Container,
  Table,
  TableBody,
  TableContainer,
  TableFooter,
  TableRow
} from '@mui/material';
import useGetPokemonList from 'queries/useGetPokemonList';
import { PokemonListItem } from 'types';
import { DEFAULT_ROWS_PER_PAGE } from 'utils/Constants';
import TablePagination from './TablePagination';
import CustomTableHeader from './CustomTableHeader';
import CustomTableRow from './CustomTableRow';
import CustomTableCell from './CustomTableCell';

interface PokemonListViewProps {
  onListItemClick: (url: string) => void;
}

const PokemonListView = ({ onListItemClick }: PokemonListViewProps) => {
  const [tablePage, setTablePage] = useState(0);
  const { data, error, loading } = useGetPokemonList(
    DEFAULT_ROWS_PER_PAGE,
    tablePage
  );

  const handlePageChange = (newPage: number) => {
    setTablePage(newPage);
  };

  if (loading) {
    return <div>loading data...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!data) {
    return <div>No Pokemon List Data</div>;
  }

  return (
    <TableContainer component={Container}>
      <Table>
        <CustomTableHeader>
          <TableRow>
            <CustomTableCell>Pokemon Name</CustomTableCell>
          </TableRow>
        </CustomTableHeader>
        <TableBody>
          {data.results.map((rowData: PokemonListItem) => (
            <CustomTableRow key={rowData.name}>
              <CustomTableCell onClick={() => onListItemClick(rowData.url)}>
                {rowData.name}
              </CustomTableCell>
            </CustomTableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <CustomTableCell sx={{ padding: 0 }}>
              <TablePagination
                count={data.count}
                rowsPerPage={DEFAULT_ROWS_PER_PAGE}
                onPageChange={handlePageChange}
                page={tablePage}
              />
            </CustomTableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default PokemonListView;
