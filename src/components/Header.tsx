import { Typography } from '@mui/material';

const Header = () => {
  return (
    <Typography
      variant='h4'
      component='h1'
      sx={{
        marginBottom: '24px',
        fontWeight: 'bold',
        color: '#2c3e50'
      }}
    >
      Pokémon Directory
    </Typography>
  );
};

export default Header;
