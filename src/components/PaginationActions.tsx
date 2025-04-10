import {
  FirstPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage
} from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';

export interface PaginationActionsProps {
  page: number;
  count: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
}

const PaginationActions = ({
  page,
  count,
  rowsPerPage,
  onPageChange
}: PaginationActionsProps) => {
  const handleFirstPageButtonClick = () => {
    onPageChange(0);
  };

  const handleLastPageButtonClick = () => {
    onPageChange(Math.max(0, Math.ceil(count / rowsPerPage) - 1));
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
        onClick={() => onPageChange(page - 1)}
        disabled={page === 0}
        aria-label='previous page'
      >
        <KeyboardArrowLeft />
      </IconButton>
      Page {page + 1} of {Math.ceil(count / rowsPerPage)}
      <IconButton
        onClick={() => onPageChange(page + 1)}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='next page'
      >
        <KeyboardArrowRight />
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='last page'
      >
        <LastPage />
      </IconButton>
    </Box>
  );
};

export default PaginationActions;
