import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";
// SlimSelect
import SlimSelect from "slim-select";
import "slim-select/dist/slimselect.css";

// Notiflix
import Notiflix from "notiflix";


// Elemente HTML
const loader = document.querySelector(".loader");
const error = document.querySelector(".error");
const breedSelect = document.querySelector(".breed-select");
const catInfo = document.querySelector(".cat-info");

// Afișarea/ascunderea elementelor
function showLoader() {
  loader.style.display = "block";
}
function hideLoader() {
  loader.style.display = "none";
}
function showError() {
  Notiflix.Notify.failure("Something went wrong! Please try again.");
}
function hideError() {
  error.style.display = "none";
}
function clearCatInfo() {
  catInfo.innerHTML = "";
}

// Încarcă lista de rase
function loadBreeds() {
  showLoader();
  hideError();



  fetchBreeds()
    .then((breeds) => {
      breedSelect.innerHTML = breeds
        .map((breed) => `<option value="${breed.id}">${breed.name}</option>`)
        .join("");
       new SlimSelect({ select: ".breed-select" });
   
      
    })
    .catch(() => {
      showError();
  })
    .finally(() => {
      hideLoader();
    });
}

// Încarcă informațiile despre o pisică
function loadCatInfo(breedId) {
  showLoader();
  hideError();
  clearCatInfo();

  fetchCatByBreed(breedId)
    .then((cats) => {
      if (cats.length > 0) {
        const cat = cats[0];
        const { name, description, temperament } = cat.breeds[0];
        const catHTML = `
          <img src="${cat.url}" alt="${name}" style="max-width: 100%; border-radius: 8px;" />
          <h2>${name}</h2>
          <p>${description}</p>
          <p><strong>Temperament:</strong> ${temperament}</p>
        `;
        catInfo.innerHTML = catHTML;
      }
    })
    .catch(() => {
      showError();
    })
    .finally(() => {
      hideLoader();
    });
}

// Event Listener pentru select
breedSelect.addEventListener("change", (event) => {
  const breedId = event.target.value;
  if (breedId) {
    loadCatInfo(breedId);
  }
});

// Inițializează aplicația
loadBreeds();
