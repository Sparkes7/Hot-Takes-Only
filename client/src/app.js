import { getMovie, getRandomMovie } from "./fetchapi";

const emotes = ["😡", "😍", "👀", "🥺", "🤯", "🤡", "💘", "💀", "🤢", "👺"];
// const movieData = await getMovie(13);
const movieData = await getRandomMovie();
console.log(movieData.trailer);

async function SetRandomMovie() {
  const movieID = document.getElementById("movie-id");
  movieID.value = movieData.id;

  const movieTitle = document.getElementById("movie-title");
  movieTitle.textContent = movieData.title;

  const posterImage = document.getElementById("movie-poster");
  posterImage.src = movieData.poster;

  const movieTrailer = document.createElement("iframe");
  const iframeFormContainer = document.getElementById("iframe-form-container");
  if (movieData.trailer !== "https://www.youtube.com/embed/undefined") {
    movieTrailer.src = movieData.trailer;
    iframeFormContainer.prepend(movieTrailer);
  }
}

async function getHotTakes() {
  // const movieData = await getMovie(122);
  const response = await fetch(
    "https://hot-takes-only.onrender.com/user-reviews"
  );

  const hotTakes = await response.json();
  console.log(hotTakes);

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
      hotTake.textContent = `${emotes[take.rating - 1]} ${take.hot_takes} ${
        emotes[take.rating - 1]
      }`;
      hotTakeContainer.appendChild(hotTake);
    }
  }
}
SetRandomMovie();

const userForms = document.getElementById("user-forms");
userForms.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  const submitButton = document.getElementById("submit-button");
  submitButton.setAttribute("disabled", true);
  submitButton.textContent = "Submitted!";
  event.preventDefault();
  const submitSound = document.getElementById("submitSound");
  submitSound.volume = 0.15;

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

  setTimeout(getHotTakes, 500);
  submitSound.play();
}
