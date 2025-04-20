import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PokemonListPage from '@/pages/PokemonListPage';
import PokemonDetailsPage from '@/pages/PokemonDetailsPage';

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Root path should redirect to list page */}
        <Route path='/' element={<Navigate to='/pokemon' replace />} />

        {/* List and detail routes */}
        <Route path='/pokemon' element={<PokemonListPage />} />
        <Route path='/pokemon/:name' element={<PokemonDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
