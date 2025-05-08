import { CircularProgress, TablePagination } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import getPokemonList from './api/pokemon';
import PokemonTable from './components/pokemon-table';

const PokemonTableApp = () => {
  const [offset, setOffset] = React.useState(0);

  const { data, isError, isLoading } = useQuery({
    queryKey: ['pokemonlist', offset],
    queryFn: () => getPokemonList({ offset })
  });

  const { results: pokemons } = data || {};

  if (isLoading) {
    return (
      <div>
        <CircularProgress />
        <p>Loading...</p>
      </div>
    );
  }

  if (isError) {
    return <div>Error loading Pokemon data!</div>;
  }

  if (pokemons?.length === 0) {
    return <div>No Pokemon found!</div>;
  }

  return (
    <>
      <PokemonTable pokemons={data?.results} />
      <TablePagination
        disabled={isLoading || isError}
        count={data?.count || 0}
        rowsPerPage={5}
        rowsPerPageOptions={[]}
        page={offset}
        onPageChange={(_, pageNum) => {
          setOffset(pageNum);
        }}
        showFirstButton
        showLastButton
      />
    </>
  );
};

export default PokemonTableApp;
