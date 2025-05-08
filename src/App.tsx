import PokemonTableApp from 'features/pokemon-list/app';
import './App.css';

const App = (): React.ReactNode => {
  return (
    <div>
      Pokemon
      <PokemonTableApp />
    </div>
  );
};

export default App;
