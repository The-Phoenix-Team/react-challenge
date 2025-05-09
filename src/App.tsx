import PokemonDetailsApp from 'features/pokemon-details/app';
import PokemonApp from 'features/pokemon/app';
import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css';

const App = (): React.ReactNode => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PokemonApp />} />
        <Route path='/pokemon-details/:name' element={<PokemonDetailsApp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
