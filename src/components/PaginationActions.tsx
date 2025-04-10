import {
  FirstPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage
} from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';

export interface PaginationActionsProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  totalPages: number;
}

const PaginationActions = ({
  currentPage: page,
  onPageChange,
  totalPages
}: PaginationActionsProps) => {
  const handleFirstPageButtonClick = () => {
    onPageChange(0);
  };

  const handleBackPageButtonClick = () => {
    onPageChange(page - 1);
  };

  const handleNextPageButtonClick = () => {
    onPageChange(page + 1);
  };

  const handleLastPageButtonClick = () => {
    onPageChange(Math.max(0, totalPages - 1));
  };

  return (
    <Box sx={{ typography: 'body1' }} className='table-navigation'>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label='first page'
      >
        <FirstPage />
      </IconButton>
      <IconButton
        onClick={handleBackPageButtonClick}
        disabled={page < 1}
        aria-label='previous page'
      >
        <KeyboardArrowLeft />
      </IconButton>
      Page {page + 1} of {totalPages}
      <IconButton
        onClick={handleNextPageButtonClick}
        disabled={page >= totalPages - 1}
        aria-label='next page'
      >
        <KeyboardArrowRight />
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= totalPages - 1}
        aria-label='last page'
      >
        <LastPage />
      </IconButton>
    </Box>
  );
};

export default PaginationActions;
