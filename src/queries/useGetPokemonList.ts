import axios from 'axios';
import { useEffect, useState } from 'react';
import { GetPokemonListReturn, PokemonListDataReturn } from 'types';
import { DEFAULT_ROWS_PER_PAGE } from 'utils/Constants';

const useGetPokemonList = (
  limit = DEFAULT_ROWS_PER_PAGE,
  currentPage = 0
): GetPokemonListReturn => {
  const [data, setData] = useState<PokemonListDataReturn | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?offset=${currentPage * limit}&limit=${limit}`
        );
        setData(response.data);
      } catch (err) {
        setError('Error getting the data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [limit, currentPage]);

  return {
    data,
    error,
    loading
  };
};

export default useGetPokemonList;
