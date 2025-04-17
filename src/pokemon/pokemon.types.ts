export interface PokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: {
      name: string;
      url: string;
    }[];
  }
  
 export interface PokemonDetails {
    name: string;
    abilities: {
      ability: {
        name: string;
        url: string;
      };
    }[];
  }
  
 export  interface PokemonAbility {
    effect_entries: {
      effect: string;
      language: {
        name: string;
      };
    }[];
  }