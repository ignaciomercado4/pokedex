const API_URL = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";
const POKEMON_CARD = `<!--pokemon card-->
                <div class="bg-white shadow-md rounded-lg overflow-hidden">
                    <img src=".img." alt="Card Image" class="w-full h-48 object-cover" />
                    <div class="p-4">
                        <h2 class="text-xl font-semibold mb-2">
                        .title.
                        </h2>
                        <p class="text-gray-600">
                            .description.
                        </p>
                    </div>
                </div>`;
const $pokemonContainer = document.querySelector('#pokemon-container');
let pokemonData = [];
let currentlyLoadedPokemons = 0;


function fetchPokemons() {
    fetch(API_URL)
        .then(res => res.json())
        .then(resJSON => {
            resJSON.results.forEach(pokemon => {
                pokemonData.push({
                    "url": pokemon.url
                });
            });

            fetchPokemonDetails(pokemonData);
            console.log(pokemonData)
        })
        .catch(error => console.log(error));
}

function fetchPokemonDetails(pokemonData) {
    pokemonData.forEach((pokemon, i) => {
        fetch(pokemon.url)
            .then(res => res.json())
            .then(resJSON => {
                pokemonData[i].id = resJSON.id;
                pokemonData[i].weight = resJSON.weight;
                pokemonData[i].height = resJSON.height;
                pokemonData[i].types = resJSON.types;
                pokemonData[i].img_url = resJSON.sprites.front_default;
            })
            .catch(error => console.log(error));
    });
};

function createPokemonCards() { }

fetchPokemons();
