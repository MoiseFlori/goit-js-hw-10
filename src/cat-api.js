import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_a3WZsDh5BK7FOvKeB9kKnvMXofFZfrQPO5iurRly8HYLSRJQ3I9oTEmq8OnAwQlq";

// Funcția pentru obținerea listei de rase
export async function fetchBreeds() {
  try {
    const response = await axios
      .get("https://api.thecatapi.com/v1/breeds");
    return response.data;
  } catch (error) {
    console.error("Error fetching breeds:", error);
    throw error;
  }
}

// Funcția pentru obținerea informațiilor despre o rasă
export async function fetchCatByBreed(breedId) {
  try {
    const response = await axios
      .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching cat info:", error);
    throw error;
  }
}
