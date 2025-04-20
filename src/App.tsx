import './App.css';
import { Routes, Route } from 'react-router-dom';
import PokemonPage from 'pages/PokemonPage';

const App = (): React.ReactNode => {
  return (
    <Routes>
      <Route path='/' element={<PokemonPage />} />
      <Route path='/pokemon/:pokemonName' element={<PokemonPage />} />
    </Routes>
  );
};

export default App;
