import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PokemonAbility, PokemonDetails, PokemonListResponse } from '../pokmon.types';
import { PAGE_SIZE } from '../pokemon.constants';

export const pokemonApi = createApi({
  keepUnusedDataFor: 3600, //60*60  assume this is static data and cahsing for an hour is ok 
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemonList: builder.query<PokemonListResponse, { offset: number }>({
      query: ({ offset }) => `pokemon?limit=${PAGE_SIZE}&offset=${offset}`,
    }),
    getPokemonDetails: builder.query<PokemonDetails, string>({
      query: (name) => `pokemon/${name}`,
    }),
    getPokemonAbility: builder.query<PokemonAbility, string>({
      query: (name) => `ability/${name}`,
      transformResponse: (response: PokemonAbility) => ({
        ...response,
        effect_entries: response.effect_entries.filter(entry => entry.language.name === 'en')
      }),
    }),
  }),
});

export const {
  useGetPokemonListQuery,
  useGetPokemonDetailsQuery, 
  useGetPokemonAbilityQuery } = pokemonApi; 