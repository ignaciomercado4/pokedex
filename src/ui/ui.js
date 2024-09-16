import { fetchPokemons } from "../services/services.js";

const $loadingMessage = document.querySelector('#loading-message');
const $pokemonContainer = document.querySelector('#pokemon-container');
const $searchBar = document.querySelector('#search-bar');
let isFetching = false;

export function showLoadingMessage(isVisible) {
    $loadingMessage.classList.toggle('hidden', !isVisible);
}

export function createPokemonCards(pokemonData) {
    pokemonData.forEach(pokemon => {
        const heightInFeet = (pokemon.height / 10) * 3.28;
        const feet = Math.floor(heightInFeet);
        const inches = Math.round((heightInFeet - feet) * 12);

        const cardHTML = `
            <div class="bg-white shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl pokemon-card">
                <div class="bg-gray-100 p-4 flex items-center justify-center">
                    <img src="${pokemon.img_url}" alt="${pokemon.name} image" class="w-32 h-32 object-contain" />
                </div>
                <div class="p-4">
                    <h2 class="text-lg font-bold text-gray-800 capitalize mb-2 pokemon-name-and-id">
                        ${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} #${pokemon.id}
                    </h2>
                    <p class="text-sm text-gray-600 mb-1 pokemon-height">
                        <strong>Height:</strong> ${pokemon.height / 10} mts / ${feet}ft ${inches}in
                    </p>
                    <p class="text-sm text-gray-600 mb-1 pokemon-weight">
                        <strong>Weight:</strong> ${(pokemon.weight / 10).toFixed(1)} kg / ${((pokemon.weight / 10) * 2.20).toFixed(1)} lbs 
                    </p>
                    <p class="text-sm text-gray-600 pokemon-type">
                        <strong>Type(s):</strong> ${pokemon.types[0].toUpperCase() + pokemon.types.substring(1)}
                    </p>
                </div>
            </div>`;
        $pokemonContainer.insertAdjacentHTML('beforeend', cardHTML);
    });
}

export function addEvents() {
    addInifiniteScrollEvent();
    addSearchBarEvent();
}

function addInifiniteScrollEvent() {

    window.addEventListener('scroll', () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !isFetching) {
            fetchPokemons();
        }
    });
}

function addSearchBarEvent() {
    $searchBar.addEventListener('input', (event) => {
        let $pokemonNames = document.querySelectorAll('.pokemon-name-and-id');

        $pokemonNames.forEach((pokemonName) => {
            let pokemonNameValue = pokemonName.textContent.toLowerCase();
            let pokemonCard = pokemonName.parentElement.parentElement;

            if (!pokemonNameValue.includes($searchBar.value.toLowerCase())) {
                pokemonCard.style.display = 'none';
            } else {
                pokemonCard.style.display = 'block';
            }
        });
    });
}
