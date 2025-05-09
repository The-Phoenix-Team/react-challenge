import {
  Ability,
  PokemonAbilitiesResponse
} from 'features/pokemon-details/types';

const flattenAbilities = (abilities: PokemonAbilitiesResponse[]): Ability[] => {
  const flattenedAbilities = abilities.map((ability) => {
    const { effect_entries: effectEntries, name } = ability;
    const effectEnglish = effectEntries.find((effect) => {
      return effect.language.name === 'en';
    });

    return {
      name,
      description: effectEnglish?.effect || '',
      shortDescription: effectEnglish?.short_effect || ''
    };
  });

  return flattenedAbilities;
};

export default flattenAbilities;
