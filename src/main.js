const API_BASE_URL = "https://pokeapi.co/api/v2/pokemon";
const $pokemonContainer = document.querySelector('#pokemon-container');
const $loadingMessage = document.querySelector('#loading-message');
const LIMIT = 20;
let pokemonData = [];
let offset = 0;
let isFetching = false;

function fetchPokemons() {
    if (isFetching) return;
    isFetching = true;
    showLoadingMessage(true);

    const API_URL = `${API_BASE_URL}?limit=${LIMIT}&offset=${offset}`;
    fetch(API_URL)
        .then(res => res.json())
        .then(resJSON => {
            const newPokemonData = resJSON.results.map(pokemon => ({ url: pokemon.url }));
            return fetchPokemonDetails(newPokemonData);
        })
        .then(newPokemonData => {
            pokemonData = [...pokemonData, ...newPokemonData];
            createPokemonCards(newPokemonData);
            offset += LIMIT;
            isFetching = false;
            showLoadingMessage(false);
        })
        .catch(error => {
            console.error('Error fetching Pokémon:', error);
            isFetching = false;
            showLoadingMessage(false);
        });
}

function fetchPokemonDetails(pokemonData) {
    const fetchPromises = pokemonData.map((pokemon, i) =>
        fetch(pokemon.url)
            .then(res => res.json())
            .then(resJSON => ({
                id: resJSON.id,
                name: resJSON.name.replace('-', ' '),
                weight: resJSON.weight,
                height: resJSON.height,
                types: resJSON.types.map(typeInfo => typeInfo.type.name).join(', '),
                img_url: resJSON.sprites.front_default
            }))
            .catch(error => {
                console.error('Error fetching Pokémon details:', error);
                return null;
            })
    );

    return Promise.all(fetchPromises).then(results => results.filter(Boolean));
}

function createPokemonCards(pokemonData) {
    pokemonData.forEach(pokemon => {
        const heightInFeet = (pokemon.height / 10) * 3.28;
        const feet = Math.floor(heightInFeet);
        const inches = Math.round((heightInFeet - feet) * 12);

        const cardHTML = `
            <div class="bg-white shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl">
                <div class="bg-gray-100 p-4 flex items-center justify-center">
                    <img src="${pokemon.img_url}" alt="${pokemon.name} image" class="w-32 h-32 object-contain" />
                </div>
                <div class="p-4">
                    <h2 class="text-lg font-bold text-gray-800 capitalize mb-2">
                        ${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} #${pokemon.id}
                    </h2>
                    <p class="text-sm text-gray-600 mb-1">
                        <strong>Height:</strong> ${pokemon.height / 10} mts / ${feet}ft ${inches}in
                    </p>
                    <p class="text-sm text-gray-600 mb-1">
                        <strong>Weight:</strong> ${(pokemon.weight / 10).toFixed(1)} kg / ${((pokemon.weight / 10) * 2.20).toFixed(1)} lbs 
                    </p>
                    <p class="text-sm text-gray-600">
                        <strong>Type(s):</strong> ${pokemon.types}
                    </p>
                </div>
            </div>`;
        $pokemonContainer.insertAdjacentHTML('beforeend', cardHTML);
    });
}


function showLoadingMessage(isVisible) {
    $loadingMessage.classList.toggle('hidden', !isVisible);
}

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !isFetching) {
        fetchPokemons();
    }
});

fetchPokemons();
