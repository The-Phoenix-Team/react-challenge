import { useGetPokemonDetailsQuery } from '../store/pokemonApi';
import { useNavigate, useParams } from 'react-router-dom';
import { PokemonAbilityDetails } from './PokemonAbilityDetails';

export function PokemonDetails() {

  const navigate = useNavigate();
  const { id } = useParams();
  const { data: pokemonData, isLoading } = useGetPokemonDetailsQuery( id ? id : '', { skip: !id });

  return (<div>
    <div className="mb-3">Selected Pokemon: <span className="capitalize">{pokemonData?.name}</span></div>
    <table className="w-full border-collapse">
      <thead><tr>
        <th className=" p-2 text-left">Ability</th>
        <th className=" p-2 text-left">Abillity Effect</th>
      </tr></thead>
      <tbody>
        {isLoading ?
          <tr><td className="p-2">Loading...</td><td></td></tr>
          :
          pokemonData && pokemonData.abilities.map((ability) => (
            <tr key={ability.ability.name}>
              <td className=" p-2 capitalize">{ability.ability.name}</td>
              <td className=" p-2"> <PokemonAbilityDetails id={ability.ability.name} /> </td>
            </tr>
          ))}
      </tbody>
    </table>
    <div onClick={() => navigate(-1)} className="text-blue-400 cursor-pointer hover:text-blue-600 text-right" > Back to list view</div>
  </div>);
} 