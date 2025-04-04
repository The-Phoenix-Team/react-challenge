import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  PokemonDetailReturnData,
  PokemonDetailData,
  PokemonAbilityDetail,
  PokemonDetailDataAbility
} from 'types';

const useGetPokemonDetail = (detailUrl: string): PokemonDetailReturnData => {
  const [pokemonDetailData, setPokemonDetailData] =
    useState<PokemonDetailData | null>(null);
  const [pokemonAbilitiesData, setPokemonAbilitiesData] = useState<
    PokemonAbilityDetail[] | null
  >(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDetailData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(detailUrl);
        // abilities in pokemon data are basic only, need to retrieve details
        // for each via an aditional api call
        const abilitiesReponses = await Promise.all(
          response.data.abilities.map(
            async (ability: PokemonDetailDataAbility) => {
              const abilityRepsonse = await axios.get(ability.ability.url);
              return abilityRepsonse.data;
            }
          )
        );
        setPokemonDetailData(response.data);
        setPokemonAbilitiesData(abilitiesReponses);
      } catch (err) {
        setError('Error loading pokemon detail data');
      } finally {
        setLoading(false);
      }
    };

    loadDetailData();
  }, [detailUrl]);

  return { pokemonDetailData, pokemonAbilitiesData, loading, error };
};

export default useGetPokemonDetail;
