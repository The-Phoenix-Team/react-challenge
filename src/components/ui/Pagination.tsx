import { Stack, IconButton, Typography } from '@mui/material';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

type Props = {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
};

// generic pagination control
const Pagination = ({ page, totalPages, onPageChange }: Props): JSX.Element => {
  return (
    <nav
      aria-label='Pagination'
      style={{
        padding: '0',
        textAlign: 'center'
      }}
    >
      <Stack
        direction='row'
        spacing={1}
        justifyContent='center'
        alignItems='center'
      >
        <IconButton
          aria-label='First page'
          onClick={() => onPageChange(0)}
          disabled={page === 0}
        >
          <FirstPageIcon />
        </IconButton>

        <IconButton
          aria-label='Previous page'
          onClick={() => onPageChange(page - 1)}
          disabled={page === 0}
        >
          <NavigateBeforeIcon />
        </IconButton>

        <Typography component='span' variant='body2' aria-live='polite'>
          Page {page + 1} of {totalPages}
        </Typography>

        <IconButton
          aria-label='Next page'
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages - 1}
        >
          <NavigateNextIcon />
        </IconButton>

        <IconButton
          aria-label='Last page'
          onClick={() => onPageChange(totalPages - 1)}
          disabled={page >= totalPages - 1}
        >
          <LastPageIcon />
        </IconButton>
      </Stack>
    </nav>
  );
};

export default Pagination;
