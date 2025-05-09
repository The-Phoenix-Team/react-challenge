import { Link, useParams } from 'react-router';
import PokemonDetailTable from './components/pokemon-detail-table';
import usePokemonAbilities from './hooks/use-pokemon-details';

const PokemonDetailsApp = () => {
  const { name } = useParams();
  const { data } = usePokemonAbilities(name || '');

  const { abilities } = data || {};

  return (
    <section>
      <h1>Selected Pokemon: {name}</h1>
      <PokemonDetailTable pokemonDetails={abilities || []} />
      <Link to='/'>Back to list view</Link>
    </section>
  );
};

export default PokemonDetailsApp;
