import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface AbilityResponse {
  effect_entries: Array<{
    effect: string;
    language: {
      name: string;
    };
  }>;
}

interface PokemonResponse {
  abilities: Array<{
    ability: {
      name: string;
      url: string;
    };
  }>;
}

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  keepUnusedDataFor: 3600, // 1 hour in seconds
  endpoints: (builder) => ({
    getPokemonList: builder.query({
      query: ({ offset, limit }) => `pokemon?offset=${offset}&limit=${limit}`,
      transformResponse: (response: { results: any[]; count: number }) => ({
        pokemonList: response.results,
        totalCount: response.count
      }),
      // Add proper error handling
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          console.error('Failed to fetch Pokemon list:', error);
        }
      }
    }),
    getPokemonAbilities: builder.query({
      query: (pokemonName: string) => `pokemon/${pokemonName}`,
      transformResponse: (response: PokemonResponse) => {
        return response.abilities.map((ability) => ({
          name: ability.ability.name,
          url: ability.ability.url
        }));
      },
      // Add proper error handling
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          console.error(`Failed to fetch abilities for ${arg}:`, error);
        }
      }
    }),
    getAbilityDetails: builder.query({
      query: (url: string) => url.replace('https://pokeapi.co/api/v2/', ''),
      transformResponse: (response: AbilityResponse): string => {
        return (
          response.effect_entries.find((entry) => entry.language.name === 'en')
            ?.effect || 'No effect available'
        );
      },
      // Add proper error handling
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          console.error(`Failed to fetch ability details for ${arg}:`, error);
        }
      }
    })
  })
});

export const {
  useGetPokemonListQuery,
  useGetPokemonAbilitiesQuery,
  useGetAbilityDetailsQuery
} = pokemonApi;
