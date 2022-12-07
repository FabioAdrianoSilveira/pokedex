const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`;

const generatePokemonPromises = () => Array(151).fill().map((_, index) => 
fetch(getPokemonUrl(index + 1)).then(response => response.json()))

const generateHTML = pokemons => pokemons.reduce((accumulator, pokemon) => {
        const types = pokemon.types.map(typeInfo => typeInfo.type.name)

accumulator += `
    <li class="card ${types[0]}">
        <img class="card-image" alt="${pokemon.name}" src="https://raw.githubusercontent.com/RafaelSilva2k22/PokemonImages/main/images/${pokemon.id}.png" />
        <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
        <p class=card-subtitle>${pokemon.types.map(typeInfo => typeInfo.type.name).join(' | ')}</p>
    </li>
`
return accumulator;
    }, '')


const insertPokemonsIntoPage = pokemons => {
    const ul = document.querySelector('[data-js="pokedex"]');
    ul.innerHTML = pokemons;
 }

const pokemonPromises = generatePokemonPromises();

Promise.all(pokemonPromises).then(generateHTML).then(insertPokemonsIntoPage);