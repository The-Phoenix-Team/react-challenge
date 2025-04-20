import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PokemonPage from 'pages/PokemonPage';

const App = (): React.ReactNode => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<PokemonPage />} />
        <Route path='/pokemon/:pokemonName' element={<PokemonPage />} />
      </Routes>
    </Router>
  );
};

export default App;
