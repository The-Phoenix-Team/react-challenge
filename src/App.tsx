import PokemonTableApp from 'features/pokemon-table/app';
import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css';

const App = (): React.ReactNode => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PokemonTableApp />} />
        <Route
          path='/pokemon-details/:name'
          element={<div>Pokemon Details</div>}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
