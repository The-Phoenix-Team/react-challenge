import { TableBody, TableCell, TableRow } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import Table, { TableHeader } from 'components/table';
import { Link, useParams } from 'react-router';
import getPokemonDetails from './api/pokemon-abilities';

const PokemonDetailsApp = () => {
  const { name } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['pokemonDetails', name],
    queryFn: () =>
      name
        ? getPokemonDetails(name)
        : Promise.reject(new Error('Name is required')),
    enabled: !!name
  });

  const { abilities } = data || {};

  return (
    <section>
      <h1>Selected Pokemon: {name}</h1>
      <Table>
        <TableHeader>
          <TableCell>Ability</TableCell>
          <TableCell>Ability Effect</TableCell>
        </TableHeader>
        <TableBody>
          {abilities.map((ability) => {
            return (
              <TableRow key={ability.ability.name}>
                <TableCell>{ability.ability.name}</TableCell>
                <TableCell>Ability flavor text</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Link to='/'>Back to list view</Link>
    </section>
  );
};

export default PokemonDetailsApp;
