import {
    showLoadingMessage,
    createPokemonCards
} from '../ui/ui.js'

let pokemonData = [];
let offset = 0;
let isFetching = false;
const LIMIT = 20;
const API_BASE_URL = "https://pokeapi.co/api/v2/pokemon";

export function fetchPokemons() {
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

    return Promise.all(fetchPromises)
        .then(results => results.filter(Boolean));
}