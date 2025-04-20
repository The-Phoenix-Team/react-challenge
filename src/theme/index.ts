import { createTheme } from '@mui/material/styles';

// extend MUI theme with custom palette keys for table styling.
declare module '@mui/material/styles' {
  interface Palette {
    table: {
      header: string;
      pagination: string;
      rowOdd: string;
    };
  }
  interface PaletteOptions {
    table?: {
      header?: string;
      pagination?: string;
      rowOdd?: string;
    };
  }
}

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: 16
  },
  palette: {
    // set main theme colors here (if we had them)...
    // primary: { main: '...' },
    // secondary: { main: '...' }

    // table colors
    table: {
      header: '#adcdf7', // background for table headers
      pagination: '#deebfd', // background for pagination bar
      rowOdd: '#f8f8f8' // background for odd rows
    }
  }
});

export default theme;
