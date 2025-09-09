import { getMovie, getRandomMovie } from "./fetchapi";

async function Main() {
  const movieData = await getRandomMovie();
  // const movieData = await getMovie(122);
  console.log(movieData);

  const movieID = document.getElementById("movie-id");
  movieID.value = movieData.id;

  const posterImage = document.getElementById("movie-poster");
  posterImage.src = movieData.poster;
}

async function getHotTakes() {
  //const movieData = await getMovie(122);
  const response = await fetch("http://localhost:8080/user-reviews");

  const hotTakes = await response.json();
  console.log(hotTakes);

  const hotTakeContainer = document.querySelector(".hot-take-container");
  for (let take of hotTakes) {
    const hotTake = document.createElement("p");
    hotTake.textContent = take.hot_takes;
    hotTakeContainer.appendChild(hotTake);
  }
}

Main();
getHotTakes();

const userForms = document.getElementById("user-forms");
userForms.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const formData = new FormData(userForms);
  const formValues = Object.fromEntries(formData);
  console.log(formValues);

  //URL will be localhost for now - will update this once we have render URL 
  fetch("http://localhost:8080/add-user-reviews", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ formValues }),
  });
};
