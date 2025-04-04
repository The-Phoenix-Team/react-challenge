import './App.css';
import { useState } from 'react';
import PokemonListView from 'components/PokemonListView';
import PokemonDetailView from 'components/PokemonDetailView';

const App = (): React.ReactNode => {
  const [currentView, setCurrentView] = useState<'LIST' | 'DETAIL'>('LIST');
  const [detailViewUrl, setDetailViewUrl] = useState<string>('');

  const handleDetailViewClick = (url: string) => {
    setDetailViewUrl(url);
    setCurrentView('DETAIL');
  };

  const handleBackToListClick = () => {
    setCurrentView('LIST');
    setDetailViewUrl('');
  };

  if (currentView === 'DETAIL') {
    return (
      <PokemonDetailView
        detailUrl={detailViewUrl}
        onBackToListView={handleBackToListClick}
      />
    );
  }

  return <PokemonListView onListItemClick={handleDetailViewClick} />;
};

export default App;
