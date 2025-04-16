import { Provider } from 'react-redux';
import { store } from '../store';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PokemonList } from '../pokemon/components/PokemonList';
import { PokemonDetails } from '../pokemon/components/PokemonDetails';
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="container mx-auto p-5">
          <Routes>
            <Route path="/" element={<Navigate to="/pokemon" replace />} />
            <Route path="/pokemon" element={<PokemonList />} />
            <Route path="/pokemon/:id" element={<PokemonDetails />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider >
  );
}

export default App; 