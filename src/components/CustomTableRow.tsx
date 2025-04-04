import { styled, TableRow } from '@mui/material';

const CustomTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#f8f8f8'
  },
  '&:nth-of-type(even)': {
    backgroundColor: 'white'
  }
}));

export default CustomTableRow;
