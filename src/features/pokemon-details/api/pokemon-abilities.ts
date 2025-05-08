const getPokemonDetails = async (name: string) => {
  const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

  if (!resp.ok) {
    throw new Error('An error occurred while fetching the Pokemon details');
  }

  const data = await resp.json();
  return data;
};

export default getPokemonDetails;
