import Ability from './Ability';

export default interface Pokemon {
  name: string;
  abilities?: Ability[];
  url: string;
}
