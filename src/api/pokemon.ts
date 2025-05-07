const getPokemonList = async (offset: number = 0, limit: number = 5) => {
  return fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
  );
};

export default getPokemonList;
