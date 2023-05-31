import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const selectBreed = document.querySelector('select.breed-select');
const catInfoDiv = document.querySelector('div.cat-info');
const loader = document.querySelector('p.loader');
const error = document.querySelector('p.error');

const catContainer = document.querySelector('.cat-container');
const catPicture = document.querySelector('.picture');
const breedName = document.querySelector('.breed-name');
const description = document.querySelector('.description');
const temperament = document.querySelector('.temperament');

loader.style.display = 'none';
error.style.display = 'none';
catContainer.style.display = 'none'; // Приховуємо контейнер на початку

const breedsPromise = fetchBreeds();
loader.style.display = 'block';

breedsPromise
  .then((breeds) => {
    for (const breed of breeds) {
      const option = new Option(breed.name, breed.id);
      selectBreed.appendChild(option);
    }
  })
  .catch((err) => {
    console.log(err);
    error.style.display = 'block';
    selectBreed.style.display = 'none';
  })
  .finally(() => {
    loader.style.display = 'none';
  });

selectBreed.addEventListener('change', () => {
  const breedId = selectBreed.value;
  if (breedId) {
    loader.style.display = 'block';
    catInfoDiv.style.display = 'none';
    error.style.display = 'none';

    fetchCatByBreed(breedId)
      .then((data) => {
        const cat = data[0];
        if (cat) {
          catContainer.style.display = 'flex';
          catPicture.src = cat.url;

          breedName.textContent = `Breed: ${cat.breeds[0].name}`;
          description.textContent = `Description: ${cat.breeds[0].description}`;
          temperament.textContent = `Temperament: ${cat.breeds[0].temperament}`;

          error.style.display = 'none';
        } else {
          catContainer.style.display = 'none';
          throw new Error('No cat data available');
        }
      })
      .catch((err) => {
        console.log(err);
        error.textContent = 'Error: Failed to fetch cat data.';
        error.style.display = 'block';
        catInfoDiv.innerHTML = '';
        catInfoDiv.style.display = 'none';
      })
      .finally(() => {
        loader.style.display = 'none';
      });
  } else {
    catContainer.style.display = 'none';
    catPicture.src = '';
  }
});
