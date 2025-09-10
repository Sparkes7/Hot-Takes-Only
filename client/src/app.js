import { getMovie, getRandomMovie } from "./fetchapi";

const emotes = ["🤬", "🤮", "3", "4", "5", "6", "7", "8", "9", "10"];
// const movieData = await getMovie(13);
const movieData = await getRandomMovie();

async function SetRandomMovie() {
  const movieID = document.getElementById("movie-id");
  movieID.value = movieData.id;

  const movieTitle = document.getElementById("movie-title");
  movieTitle.textContent = movieData.title;

  const posterImage = document.getElementById("movie-poster");
  posterImage.src = movieData.poster;
}

async function getHotTakes() {
  // const movieData = await getMovie(122);
  const response = await fetch(
    "https://hot-takes-only.onrender.com/user-reviews"
  );

  const hotTakes = await response.json();
  console.log(hotTakes);

  const submitButton = document.getElementById("submit-button");

  submitButton.addEventListener("click", function () {
    const hotTakeContainer = document.querySelector(".hot-take-container");
    const genHotTakeText = document.createElement("h1");
    hotTakeContainer.innerHTML = "";
    genHotTakeText.textContent = "🔥 Your Hot Takes 🔥";
    genHotTakeText.classList = "hot-take-text-header";
    hotTakeContainer.appendChild(genHotTakeText);

    for (let take of hotTakes) {
      if (take.movie_id === movieData.id) {
        const hotTake = document.createElement("p");
        hotTake.classList.add("hot-take-text");
        hotTake.textContent = ` ${emotes[take.rating]} ${take.hot_takes}`;
        hotTakeContainer.appendChild(hotTake);
      }
    }
  });
}

SetRandomMovie();
getHotTakes();

const userForms = document.getElementById("user-forms");
userForms.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const formData = new FormData(userForms);
  const formValues = Object.fromEntries(formData);
  console.log(formValues);

  //URL will be localhost for now - will update this once we have render URL
  fetch("https://hot-takes-only.onrender.com/add-user-reviews", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ formValues }),
  });
}
