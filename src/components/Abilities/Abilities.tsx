import './Abilities.css';

import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { usePokemonStore } from '../../store/usePokemonStore';
import Pokemon from 'models/Pokemon';

export function Abilities() {
  const { pokemonName } = useParams<{ pokemonName: string }>();
  const { pokemons, fetchAbilities } = usePokemonStore();
  const [pokemon, setPokemon] = useState<Pokemon | undefined>();

  useEffect(() => {
    const tempPokemon = pokemons.find(
      (pokemon) => pokemon?.name === pokemonName
    );
    setPokemon(tempPokemon);
  }, [pokemons]);

  useEffect(() => {
    if (!pokemonName) return; //TODO: navigate to home
    const tempPokemon = pokemons.find(
      (pokemon) => pokemon?.name === pokemonName
    );
    if (!tempPokemon?.abilities) {
      fetchAbilities(pokemonName);
    }
  }, []);

  return (
    <div className='container text'>
      <div className='row'>
        <p>Selected Pokemon: {pokemon?.name}</p>
      </div>
      <div className='ability-header row header'>
        <div className='small-wd'>
          <p>Ability</p>
        </div>
        <div>
          <p>Ability Effect</p>
        </div>
      </div>
      {pokemon?.abilities?.map((ability) => {
        return (
          <div key={ability.name} className='ability row'>
            <div className='small-wd'>
              <p>{ability.name}</p>
            </div>
            <div>
              <p>{ability.effect}</p>
            </div>
          </div>
        );
      })}
      <div className='row back'>
        <Link to={'/'}>
          <p className='back-link-text'>Back to list view</p>
        </Link>
      </div>
    </div>
  );
}
