import {
  FirstPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage
} from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { blue } from '@mui/material/colors';

export interface CustomTablePaginationActionsProps {
  page: number;
  count: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
}

const CustomTablePaginationActions = ({
  page,
  count,
  rowsPerPage,
  onPageChange
}: CustomTablePaginationActionsProps) => {
  const handleFirstPageButtonClick = () => {
    onPageChange(0);
  };

  const handleLastPageButtonClick = () => {
    onPageChange(Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };
  return (
    <Box
      sx={{
        backgroundColor: blue[50],
        textAlign: 'center',
        width: '100%',
        typography: 'body1'
      }}
    >
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

export default CustomTablePaginationActions;
