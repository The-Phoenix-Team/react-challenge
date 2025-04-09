import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';

interface Ability {
  name: string;
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
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        const data = await response.json();
        setAbilities(data.abilities.map((ability: any) => ability.ability));
      } catch (error) {
        console.error('Failed to fetch abilities:', error);
      }
    };

    fetchAbilities();
  }, [pokemonName]);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Button onClick={onBack} variant="contained" color="primary" sx={{ margin: 2 }}>
        Back to List
      </Button>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="abilities table">
          <TableHead>
            <TableRow>
              <TableCell>Ability Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {abilities.map((ability) => (
              <TableRow key={ability.name}>
                <TableCell>{ability.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default AbilitiesTable;