import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";

import SlimSelect from "slim-select";
import "slim-select/dist/slimselect.css";

import Notiflix from "notiflix";



const loader = document.querySelector(".loader");
const error = document.querySelector(".error");
const breedSelect = document.querySelector(".breed-select");
const catInfo = document.querySelector(".cat-info");


function showLoader() {
  loader.style.display = "block";
  catInfo.style.display = "none"; 
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
  catInfo.style.display = "none"; 
}


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
        catInfo.style.display = "flex";
      }
    })
    .catch(() => {
      showError();
    })
    .finally(() => {
      hideLoader();
    });
}


breedSelect.addEventListener("change", (event) => {
  const breedId = event.target.value;
  if (breedId) {
    loadCatInfo(breedId);
  }
});


loadBreeds();
