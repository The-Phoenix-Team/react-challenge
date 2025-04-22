import { useState } from 'react';
import { useEffect } from 'react';
import FirstPageOutlinedIcon from '@mui/icons-material/FirstPageOutlined';
import LastPageIcon from '@mui/icons-material/LastPage';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { Link } from 'react-router-dom';

import './Page.css';
import { usePokemonStore } from '../../store/usePokemonStore';
import { OFFSET } from '../../constants/api';

export function Page() {
  const [page, setPage] = useState(0);
  const { pokemons, fetchPokemons } = usePokemonStore();
  const start = page * OFFSET;
  const end = page * OFFSET + OFFSET;

  useEffect(() => {
    fetchPokemons(0);
  }, []);

  useEffect(() => {
    fetchPokemons(page);
  }, [page]);

  return (
    <div className='container'>
      <div className='header row text'>Pokemon Name</div>
      {pokemons.slice(start, end).map((pokemon: any) => {
        return (
          <div className='row pokemon' key={pokemon.name}>
            <Link to={`/pokemon/${pokemon.name}`}>
              <p className='text'>{pokemon.name}</p>
            </Link>
          </div>
        );
      })}
      <div className='pagination row'>
        <div className='pagination-buttons'>
          <button disabled={page === 0} onClick={() => setPage(0)}>
            <FirstPageOutlinedIcon fontSize='large'></FirstPageOutlinedIcon>
          </button>
          <button disabled={page === 0} onClick={() => setPage(page - 1)}>
            <NavigateBeforeIcon fontSize='large'></NavigateBeforeIcon>
          </button>
          <p className='page-number'>Page {page + 1} of 50</p>
          <button disabled={page === 49} onClick={() => setPage(page + 1)}>
            <NavigateNextIcon fontSize='large'></NavigateNextIcon>
          </button>
          <button disabled={page === 49} onClick={() => setPage(49)}>
            <LastPageIcon fontSize='large'></LastPageIcon>
          </button>
        </div>
      </div>
    </div>
  );
}
