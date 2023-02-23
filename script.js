const getPokemonUrl = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`;

const generatePokemonPromises = () =>
  Array(151)
    .fill()
    .map((_, index) =>
      fetch(getPokemonUrl(index + 1)).then((response) => response.json())
    );

const generateHTML = (pokemons) =>
  pokemons.reduce((accumulator, pokemon) => {
    const types = pokemon.types.map((typeInfo) => typeInfo.type.name);

    accumulator += `
          <li class="entry  ${types[0]}">
          <img class="entry-image" alt="${
            pokemon.name
          }" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
      pokemon.id
    }.png" />
          <h2 class="entry-name">${pokemon.id}. ${pokemon.name}</h2>
          <p class="entry-type">${types.join(" | ")}</p>
          </li>
      `;
    return accumulator;
  }, "");

const insertPokemonIntoPage = (pokemons) => {
  const ul = document.querySelector('[data-js="pokedex"]');
  ul.innerHTML = pokemons;
};

const pokemonPromises = generatePokemonPromises();

Promise.all(pokemonPromises).then(generateHTML).then(insertPokemonIntoPage);
