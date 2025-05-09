import {
  FirstPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage
} from '@mui/icons-material';
import {
  Box,
  IconButton,
  TablePagination as MUITablePagination,
  Typography
} from '@mui/material';
import { TablePaginationActionsProps } from '@mui/material/TablePagination/TablePaginationActions';
import React from 'react';

const Pagination: React.FC<TablePaginationActionsProps> = ({
  count,
  page,
  disabled,
  onPageChange,
  rowsPerPage
}) => {
  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  const isLastPage = page >= Math.ceil(count / rowsPerPage) - 1;

  return (
    <Box
      component='div'
      sx={{
        display: 'flex'
      }}
    >
      <IconButton
        aria-label='first page'
        disabled={page === 0 || disabled}
        onClick={handleFirstPageButtonClick}
      >
        <FirstPage />
      </IconButton>
      <IconButton
        aria-label='previous page'
        disabled={page === 0 || disabled}
        onClick={handleBackButtonClick}
      >
        <KeyboardArrowLeft />
      </IconButton>
      <Typography
        component='div'
        variant='body2'
        sx={{
          whiteSpace: 'nowrap',
          alignContent: 'center'
        }}
      >
        Page {page + 1} of {Math.ceil(count / rowsPerPage)}
      </Typography>
      <IconButton
        aria-label='next page'
        disabled={isLastPage}
        onClick={handleNextButtonClick}
      >
        <KeyboardArrowRight />
      </IconButton>
      <IconButton
        aria-label='last page'
        disabled={isLastPage}
        onClick={handleLastPageButtonClick}
      >
        <LastPage />
      </IconButton>
    </Box>
  );
};

type TablePaginationProps = {
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => void;
  page: number;
  disabled?: boolean;
  count: number;
  rowsPerPage: number;
};

const TablePagination: React.FC<TablePaginationProps> = ({
  onPageChange,
  page,
  disabled,
  count,
  rowsPerPage
}) => {
  return (
    <MUITablePagination
      ActionsComponent={Pagination}
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        placeSelf: 'center'
      }}
      component='div'
      disabled={disabled}
      count={count}
      // A way to remove the default labeling
      labelDisplayedRows={() => ''}
      rowsPerPage={rowsPerPage}
      rowsPerPageOptions={[]}
      page={page}
      onPageChange={onPageChange}
      showFirstButton
      showLastButton
    />
  );
};

export default TablePagination;
