import './App.css';
import { PokemonClient } from 'pokenode-ts';

const App = (): React.ReactNode => {
  const client = new PokemonClient();

  const pokemon = client.listPokemons(0, 10)
  console.log({ pokemon })
  return <div>Pokemon</div>;
};

export default App;
