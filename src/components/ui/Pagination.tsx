import { Stack, IconButton, Tooltip, Typography } from '@mui/material';
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
        <Tooltip title='First page'>
          <IconButton
            aria-label='First page'
            onClick={() => onPageChange(0)}
            disabled={page === 0}
          >
            <FirstPageIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title='Previous page'>
          <IconButton
            aria-label='Previous page'
            onClick={() => onPageChange(page - 1)}
            disabled={page === 0}
          >
            <NavigateBeforeIcon />
          </IconButton>
        </Tooltip>

        <Typography component='span' variant='body2' aria-live='polite'>
          Page {page + 1} of {totalPages}
        </Typography>

        <Tooltip title='Next page'>
          <IconButton
            aria-label='Next page'
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages - 1}
          >
            <NavigateNextIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title='Last page'>
          <IconButton
            aria-label='Last page'
            onClick={() => onPageChange(totalPages - 1)}
            disabled={page >= totalPages - 1}
          >
            <LastPageIcon />
          </IconButton>
        </Tooltip>
      </Stack>
    </nav>
  );
};

export default Pagination;
