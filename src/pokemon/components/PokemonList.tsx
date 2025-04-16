import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MdFirstPage, MdLastPage, MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { PAGE_SIZE } from '../pokemon.constants';
import { useGetPokemonListQuery } from '../store/pokemonApi';


export function PokemonList() {

  const navigate = useNavigate();

  // Update the page when the search params change
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
  useEffect(() => {
    setPage(Number(searchParams.get('page')) || 1);
  }, [searchParams]);

  // Update the offset when the page changes
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    setOffset((page - 1) * PAGE_SIZE);
    setSearchParams({ page: page.toString() });
  }, [page, setSearchParams]);

  const { data: pokemonList, isLoading } = useGetPokemonListQuery({ offset });

  // Calculate the maximum number of pages when the pokemon list is loaded
  const [maxPage, setMaxPage] = useState(0);
  useEffect(() => {
    if (pokemonList?.count) {
      setMaxPage(Math.ceil(pokemonList?.count / PAGE_SIZE) || 0);
    }
  }, [pokemonList]);

  const showDetails = (pokemonName: string) => {
    navigate(`/pokemon/${pokemonName}`);
  }

  const handleFirst = () => {
    setPage(1);
  };

  const handleLast = () => {
    setPage(maxPage);
  };

  const handleNext = () => {
    setPage(page + 1);
  };

  const hasPrevious = () => {
    return page > 1;
  }

  const handlePrevious = () => {
    setPage(page - 1);
  };

  const hasNext = () => {
    return page < maxPage;
  }


  return (
    <div>
      <table className="w-full">
        <thead><tr>
          <th className="p-2 text-left">Pokemon Names</th>
        </tr></thead>
        <tbody>
          {isLoading ?
            <tr><td className="p-2">Loading...</td></tr>
            :
            pokemonList?.results.map((pokemon) => (
              <tr key={pokemon.name} className="cursor-pointer" onClick={() => showDetails(pokemon.name)}>
                <td className="p-2 capitalize">{pokemon.name}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <div className="flex justify-center items-center bg-blue-100">
        <button onClick={handleFirst} disabled={!hasPrevious()} className="btn-icon"> <MdFirstPage size={26} /> </button>
        <button onClick={handlePrevious} disabled={!hasPrevious()} className="btn-icon"> <MdNavigateBefore size={26}/> </button>
        Page {page}  of {maxPage}
        <button onClick={handleNext} disabled={!hasNext()} className="btn-icon"> <MdNavigateNext size={26}/> </button>
        <button onClick={handleLast} disabled={!hasNext()} className="btn-icon"> <MdLastPage size={26} /> </button>
      </div>
    </div>
  );
} 