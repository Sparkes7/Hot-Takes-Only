const pageRand = Math.ceil(Math.random() * 2);
const apiToken = import.meta.env.VITE_API_TOKEN;

const url = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${pageRand}`;
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${apiToken}`,
  },
};

export async function getRandomMovie() {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
  const randIndex = Math.floor(Math.random() * data.results.length);

  const posterPath = data.results[randIndex].poster_path;
  const posterBase = "https://image.tmdb.org/t/p/w342";

  const videoresponse = await fetch(
    `https://api.themoviedb.org/3/movie/${data.results[randIndex].id}/videos`,
    options
  );
  const videodata = await videoresponse.json();
  console.log(videodata);
  const word = "Trailer";

  let trailerKey;
  for (let video of videodata.results) {
    if (video.name.includes(word)) {
      trailerKey = video.key;
    }
  }

  const movieData = {
    id: data.results[randIndex].id,
    title: data.results[randIndex].title,
    poster: posterBase + posterPath,
    trailer: `https://www.youtube.com/embed/${trailerKey}`,
  };
  return movieData;
}

export async function getMovie(id) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}`,
    options
  );
  const data = await response.json();
  const posterBase = "https://image.tmdb.org/t/p/w342";
  const movieId = data.id;
  const movieTitle = data.original_title;
  const poster = posterBase + data.poster_path;
  const movieData = {
    id: movieId,
    title: movieTitle,
    poster: poster,
  };
  console.log(movieData);
  return movieData;
}
