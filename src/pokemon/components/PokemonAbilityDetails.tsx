import { useGetPokemonAbilityQuery } from "../store/pokemonApi";


export function PokemonAbilityDetails({ id }: { id: string }) {

  const { data: pokemonAbility, isLoading } = useGetPokemonAbilityQuery(id ? id : '', { skip: !id });

  return (
    <span >
      {isLoading ? "Loading..." : pokemonAbility?.effect_entries[0].effect}
    </span>
  );
} 