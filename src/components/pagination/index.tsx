import {
  FirstPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage
} from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import { TablePaginationActionsProps } from '@mui/material/TablePagination/TablePaginationActions';
import React from 'react';

type PaginationProps = {
  count: number;
  page: number;
  disabled?: boolean;
  onPageChange: (pageNum: number) => void;
};

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
  // return (
  //   <div>
  //     <IconButton
  //       aria-label='first page'
  //       disabled={firstButtonItem.disabled}
  //       onClick={firstButtonItem.onClick}
  //     >
  //       <FirstPage />
  //     </IconButton>
  //     <IconButton
  //       aria-label='previous page'
  //       disabled={prevButtonItem.disabled}
  //       onClick={prevButtonItem.onClick}
  //     >
  //       <KeyboardArrowLeft />
  //     </IconButton>
  //     <Typography component='span' variant='body2'>
  //       Page {page + 1} of {count}
  //     </Typography>
  //     <IconButton
  //       aria-label='next page'
  //       disabled={nextButtonItem.disabled}
  //       onClick={nextButtonItem.onClick}
  //     >
  //       <KeyboardArrowRight />
  //     </IconButton>
  //     <IconButton
  //       aria-label='last page'
  //       disabled={lastButtonItem.disabled}
  //       onClick={lastButtonItem.onClick}
  //     >
  //       <LastPage />
  //     </IconButton>
  //   </div>
  // );
};

export default Pagination;
