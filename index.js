import * as Carousel from "./Carousel.js";
import { API_KEY } from "./keys.js";

// import axios from "axios";
// The breed selection input element.
const breedSelect = document.getElementById("breedSelect");
// The information section div element.
const infoDump = document.getElementById("infoDump");
// The progress bar div element.
const progressBar = document.getElementById("progressBar");
// The get favourites button element.
const getFavouritesBtn = document.getElementById("getFavouritesBtn");
// Step 0: Store your API key in the keys.js file.
/**
 * 1. Create an async function "initialLoad" that does the following:
 * - Retrieve a list of breeds from the cat API using fetch().
 * - Create new <options> for each of these breeds, and append them to breedSelect.
 *  - Each option should have a value attribute equal to the id of the breed.
 *  - Each option should display text equal to the name of the breed.
 * This function should execute immediately.
 * 
 */
async function initialLoad() {
  try {
    const response = await fetch("https://api.thecatapi.com/v1/breeds",
      {
        headers: {
          "x-api-key": API_KEY,
        },
      }
    );
    const breeds = await response.json();
    breeds.forEach((breed) => {
      const option = document.createElement("option");
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });
    //await getBreed(breeds[0].id);
  }
  catch (error) {
    console.error("unable to fetch breeds:", error);
  }
}
initialLoad();
/**
 * 2. Create an event handler for breedSelect that does the following:
 * - Retrieve information on the selected breed from the cat API using fetch().
 *  - Make sure your request is receiving multiple array items!
 *  - Check the API documentation if you're only getting a single object.
 * - For each object in the response array, create a new element for the carousel.
 *  - Append each of these new elements to the carousel.
 * - Use the other data you have been given to create an informational section within the infoDump element.
 *  - Be creative with how you create DOM elements and HTML.
 *  - Feel free to edit index.html and styles.css to suit your needs, but be careful!
 *  - Remember that functionality comes first, but user experience and design are important.
 * - Each new selection should clear, re-populate, and restart the Carousel.
 * - Add a call to this function to the end of your initialLoad function above to create the initial carousel.
 */
//Event-handler  for breedSelect
async function fetchBreed(e) {
  let breedId = e.target.value;
  let request = await fetch(`https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=${breedId}&api_key=${API_KEY}`)
  const data = await request.json();
  return data;
}

breedSelect.addEventListener("change", async (e) => {
  Carousel.clear();
  const breed = await fetchBreed(e);
  console.log(breed)
  breed.forEach((element) => {
    const breedItem = Carousel.createCarouselItem(
      element.url,
      breed[0].alt_names,
      element.id,
    );
    Carousel.appendCarousel(breedItem);
  });
  Carousel.start();
});