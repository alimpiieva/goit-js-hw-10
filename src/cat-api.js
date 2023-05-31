const API_KEY = 'live_9JTE8AfQ3bBwDTDbqxtCkLhZP9mMCJqk8fY2Acf9mz8f6d2C2mceHfbbvo6lWOvr';
const BASE_URL = 'https://api.thecatapi.com/v1';

import Notiflix from 'notiflix';


export function fetchBreeds() {
  return fetch(`${BASE_URL}/breeds?key=${API_KEY}`)
    .then((resp) => {
      if (!resp.ok) {
        throw new Notiflix.Notify.failure('Cats are not found');
      }
      return resp.json();
    });
}

export function fetchCatByBreed(breedId) {
  return fetch(`${BASE_URL}/images/search?breed_ids=${breedId}&api_key=${API_KEY}`)
    .then((resp) => {
      if (!resp.ok) {
        throw new Notiflix.Notify.failure('Breed is not found');
      }
      return resp.json();
    });
}