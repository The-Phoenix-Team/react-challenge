import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import './App.css';
import { Page } from 'components/PokemonTable/Page';
import { Abilities } from 'components/Abilities/Abilities';

const App = (): React.ReactNode => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Page />} />
        <Route path='/pokemon/:pokemonName' element={<Abilities />} />
      </Routes>
    </Router>
  );
};
export default App;
