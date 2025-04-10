import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  capitalize
} from '@mui/material';
import { fetchAbilitiesForPokemon } from 'api/apiCalls';

interface Ability {
  name: string;
  effect: string;
}

interface AbilitiesTableProps {
  pokemonName: string;
  onBack: () => void;
}

const AbilitiesTable = ({ pokemonName, onBack }: AbilitiesTableProps) => {
  const [abilities, setAbilities] = useState<Ability[]>([]);

  useEffect(() => {
    const fetchAbilities = async () => {
      try {
        const abilitiesWithDescription =
          await fetchAbilitiesForPokemon(pokemonName);
        setAbilities(abilitiesWithDescription);
      } catch (error) {
        // for now, send errors to the console; a more complete solution will handle errors in a user-friendly way
        // eslint-disable-next-line no-console
        console.error('Failed to fetch abilities:', error);
      }
    };

    fetchAbilities();
  }, [pokemonName]);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label='abilities table'>
          <TableHead className='table-header'>
            <TableRow>
              <TableCell>Ability</TableCell>
              <TableCell>Effect</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {abilities.map((ability, index) => (
              <TableRow
                key={ability.name}
                sx={{
                  backgroundColor: index % 2 === 0 ? '#f5f5f5' : '#fff'
                }}
              >
                <TableCell sx={{ border: 0 }}>
                  {capitalize(ability.name)}
                </TableCell>
                <TableCell sx={{ border: 0 }}>{ability.effect}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        onClick={onBack}
        sx={{ typography: 'subtitle2' }}
        className='back-to-list'
      >
        Back to list view
      </Box>
    </Paper>
  );
};

export default AbilitiesTable;
